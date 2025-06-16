package main

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/websocket/v2"
)

// 消息类型常量
const (
	MessageTypeHeartbeat         = "heartbeat"
	MessageTypeOnlineStatus      = "online_status"
	MessageTypeHeartbeatResponse = "heartbeat_response"
	MessageTypeOnlineCount       = "online_count"
)

// WebSocket消息结构体
type BaseMessage struct {
	Type      string `json:"type"`
	UserID    string `json:"userId,omitempty"`
	Timestamp string `json:"timestamp"`
}

type HeartbeatMessage struct {
	BaseMessage
}

type OnlineStatusMessage struct {
	BaseMessage
	Status string `json:"status"` // "online" or "offline"
}

type HeartbeatResponseMessage struct {
	BaseMessage
}

type OnlineCountMessage struct {
	Type      string `json:"type"`
	Count     int    `json:"count"`
	Timestamp string `json:"timestamp"`
}

// 客户端连接结构体
type Client struct {
	ID              string
	Conn            *websocket.Conn
	Send            chan []byte
	LastHeartbeat   time.Time
	IsOnline        bool
	HeartbeatTicker *time.Ticker
}

// WebSocket服务器结构体
type WebSocketServer struct {
	clients    map[string]*Client
	register   chan *Client
	unregister chan *Client
	broadcast  chan []byte
	mutex      sync.RWMutex
}

// 创建新的WebSocket服务器
func NewWebSocketServer() *WebSocketServer {
	return &WebSocketServer{
		clients:    make(map[string]*Client),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan []byte),
	}
}

// 服务器主循环
func (server *WebSocketServer) Run() {
	for {
		select {
		case message := <-server.broadcast:
			server.broadcastMessage(message)
		}
	}
}

// 注册新客户端
func (server *WebSocketServer) registerClient(client *Client) {
	server.mutex.Lock()
	defer server.mutex.Unlock()

	server.clients[client.ID] = client
	client.IsOnline = true
	client.LastHeartbeat = time.Now()

	log.Printf("客户端 %s 已连接，当前在线人数: %d", client.ID, len(server.clients))

	// 启动客户端的消息处理协程
	go client.writePump()
	go client.readPump(server)

	// 延迟发送在线人数，等待协程完全启动
	go func() {
		time.Sleep(500 * time.Millisecond) // 增加等待时间到500毫秒
		server.sendOnlineCountToClient(client)
	}()
}

// 给单个客户端发送在线人数
func (server *WebSocketServer) sendOnlineCountToClient(client *Client) {
	server.mutex.RLock()
	// 检查客户端是否仍然在客户端列表中
	_, exists := server.clients[client.ID]
	if !exists {
		server.mutex.RUnlock()
		log.Printf("客户端 %s 已不在线，跳过发送在线人数", client.ID)
		return
	}
	
	count := len(server.clients)
	server.mutex.RUnlock()
	
	message := OnlineCountMessage{
		Type:      MessageTypeOnlineCount,
		Count:     count,
		Timestamp: time.Now().Format(time.RFC3339),
	}

	data, _ := json.Marshal(message)
	
	// 使用defer和recover来防止panic
	defer func() {
		if r := recover(); r != nil {
			log.Printf("向客户端 %s 发送在线人数时发生panic，已恢复: %v", client.ID, r)
		}
	}()
	
	select {
	case client.Send <- data:
		log.Printf("向新客户端 %s 发送在线人数: %d", client.ID, count)
	default:
		log.Printf("向客户端 %s 发送在线人数失败，通道可能已关闭", client.ID)
	}
}

// 注销客户端
func (server *WebSocketServer) unregisterClient(client *Client) {
	server.mutex.Lock()
	defer server.mutex.Unlock()

	if _, exists := server.clients[client.ID]; exists {
		delete(server.clients, client.ID)
		
		// 安全关闭通道
		select {
		case <-client.Send:
		default:
		}
		close(client.Send)

		if client.HeartbeatTicker != nil {
			client.HeartbeatTicker.Stop()
		}

		log.Printf("客户端 %s 已断开连接，当前在线人数: %d", client.ID, len(server.clients))
	}
}

// 广播消息给所有在线客户端
func (server *WebSocketServer) broadcastMessage(message []byte) {
	server.mutex.RLock()
	clientsToRemove := make([]string, 0)
	
	for id, client := range server.clients {
		select {
		case client.Send <- message:
			// 发送成功
		default:
			// 发送失败，标记为需要移除
			clientsToRemove = append(clientsToRemove, id)
		}
	}
	server.mutex.RUnlock()
	
	// 移除发送失败的客户端
	if len(clientsToRemove) > 0 {
		server.mutex.Lock()
		for _, id := range clientsToRemove {
			if client, exists := server.clients[id]; exists {
				delete(server.clients, id)
				close(client.Send)
				log.Printf("移除发送失败的客户端: %s", id)
			}
		}
		server.mutex.Unlock()
	}
}

// 广播在线人数
func (server *WebSocketServer) broadcastOnlineCount() {
	message := OnlineCountMessage{
		Type:      MessageTypeOnlineCount,
		Count:     len(server.clients),
		Timestamp: time.Now().Format(time.RFC3339),
	}

	data, _ := json.Marshal(message)
	go func() {
		server.broadcast <- data
	}()
}

// 获取在线客户端数量
func (server *WebSocketServer) GetOnlineCount() int {
	server.mutex.RLock()
	defer server.mutex.RUnlock()
	return len(server.clients)
}

// 客户端写入数据协程
func (client *Client) writePump() {
	ticker := time.NewTicker(54 * time.Second)
	defer func() {
		ticker.Stop()
		if r := recover(); r != nil {
			log.Printf("writePump panic recovered: %v", r)
		}
		// 不再在这里关闭连接，在 handleClientConnection 中统一处理
	}()

	log.Printf("客户端 %s 的writePump协程已启动", client.ID)

	for {
		select {
		case message, ok := <-client.Send:
			if !ok {
				// 通道已关闭，退出
				return
			}

			// 添加连接检查
			if client.Conn == nil {
				log.Printf("客户端 %s 连接为空，退出writePump", client.ID)
				return
			}

			client.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			
			if err := client.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
				log.Printf("写入消息失败，客户端 %s: %v", client.ID, err)
				return
			}
			
			log.Printf("成功发送消息给客户端 %s: %s", client.ID, string(message))
			
		case <-ticker.C:
			// 添加连接检查
			if client.Conn == nil {
				log.Printf("客户端 %s 连接为空，停止发送ping", client.ID)
				return
			}

			client.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := client.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				log.Printf("发送ping消息失败，客户端 %s: %v", client.ID, err)
				return
			}
			log.Printf("向客户端 %s 发送ping消息", client.ID)
		}
	}
}

// 客户端读取数据协程
func (client *Client) readPump(server *WebSocketServer) {
	defer func() {
		if r := recover(); r != nil {
			log.Printf("readPump panic recovered: %v", r)
		}
		// 不再调用 server.unregister，在 handleClientConnection 中统一处理
	}()

	client.Conn.SetReadLimit(512)
	
	// 设置读取超时时间
	client.Conn.SetReadDeadline(time.Now().Add(120 * time.Second))
	
	// 设置ping处理器
	client.Conn.SetPingHandler(func(appData string) error {
		log.Printf("收到客户端 %s 的ping消息", client.ID)
		client.Conn.SetReadDeadline(time.Now().Add(120 * time.Second))
		return client.Conn.WriteMessage(websocket.PongMessage, []byte(appData))
	})
	
	client.Conn.SetPongHandler(func(string) error {
		log.Printf("收到客户端 %s 的pong消息", client.ID)
		client.Conn.SetReadDeadline(time.Now().Add(120 * time.Second))
		return nil
	})

	log.Printf("客户端 %s 的readPump协程已启动", client.ID)

	for {
		// 添加连接检查
		if client.Conn == nil {
			log.Printf("客户端 %s 连接为空，退出readPump", client.ID)
			break
		}

		messageType, messageData, err := client.Conn.ReadMessage()
		if err != nil {
			log.Printf("客户端 %s 读取消息错误: %v", client.ID, err)
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("客户端 %s WebSocket意外关闭: %v", client.ID, err)
			}
			break
		}

		// 更新心跳时间
		client.LastHeartbeat = time.Now()
		client.Conn.SetReadDeadline(time.Now().Add(120 * time.Second))

		// 只处理文本消息
		if messageType == websocket.TextMessage {
			client.handleMessage(server, messageData)
		} else {
			log.Printf("客户端 %s 发送了非文本消息，类型: %d", client.ID, messageType)
		}
	}
}

// 处理客户端消息
func (client *Client) handleMessage(server *WebSocketServer, messageData []byte) {
	var baseMsg BaseMessage
	if err := json.Unmarshal(messageData, &baseMsg); err != nil {
		log.Printf("解析消息失败: %v", err)
		return
	}

	log.Printf("收到客户端 %s 的消息: %s", client.ID, baseMsg.Type)

	switch baseMsg.Type {
	case MessageTypeHeartbeat:
		client.handleHeartbeat(server, baseMsg)

	case MessageTypeOnlineStatus:
		client.handleOnlineStatus(server, messageData)

	default:
		log.Printf("未知消息类型: %s", baseMsg.Type)
	}
}

// 处理心跳消息
func (client *Client) handleHeartbeat(server *WebSocketServer, msg BaseMessage) {
	client.LastHeartbeat = time.Now()

	// 发送心跳响应
	response := HeartbeatResponseMessage{
		BaseMessage: BaseMessage{
			Type:      MessageTypeHeartbeatResponse,
			UserID:    msg.UserID,
			Timestamp: time.Now().Format(time.RFC3339),
		},
	}

	responseData, _ := json.Marshal(response)
	select {
	case client.Send <- responseData:
		log.Printf("向客户端 %s 发送心跳响应", client.ID)
	default:
		log.Printf("发送心跳响应失败，客户端 %s 可能已断开", client.ID)
	}
}

// 处理在线状态消息
func (client *Client) handleOnlineStatus(server *WebSocketServer, messageData []byte) {
	var statusMsg OnlineStatusMessage
	if err := json.Unmarshal(messageData, &statusMsg); err != nil {
		log.Printf("解析在线状态消息失败: %v", err)
		return
	}

	log.Printf("客户端 %s 状态更新: %s", client.ID, statusMsg.Status)

	if statusMsg.Status == "online" {
		client.IsOnline = true
	} else if statusMsg.Status == "offline" {
		client.IsOnline = false
		// 客户端主动下线，从服务器移除
		server.unregister <- client
	}

	// 移除广播调用，统一由定时器处理
}

// 启动心跳检测
func (server *WebSocketServer) startHeartbeatChecker() {
	ticker := time.NewTicker(45 * time.Second) // 每45秒检查一次
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			server.checkClientHeartbeats()
		}
	}
}

// 检查客户端心跳状态
func (server *WebSocketServer) checkClientHeartbeats() {
	server.mutex.Lock()
	defer server.mutex.Unlock()

	now := time.Now()
	for id, client := range server.clients {
		// 如果客户端超过90秒没有发送心跳，认为连接已断开
		if now.Sub(client.LastHeartbeat) > 90*time.Second {
			log.Printf("客户端 %s 心跳超时，移除连接", id)
			delete(server.clients, id)
			close(client.Send)
			client.Conn.Close()
		}
	}
}

// 启动定时广播在线人数
func (server *WebSocketServer) startOnlineCountBroadcast() {
	ticker := time.NewTicker(30 * time.Second) // 每30秒广播一次
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			server.broadcastOnlineCount()
		}
	}
}

// WebSocket处理函数 - 修改为Fiber版本
func (server *WebSocketServer) handleWebSocket(c *websocket.Conn) {
	// 从 Locals 中获取预先保存的用户ID
	userID := ""
	if userIDLocal := c.Locals("userID"); userIDLocal != nil {
		userID = userIDLocal.(string)
	}
	
	if userID == "" {
		userID = fmt.Sprintf("user_%d", time.Now().UnixNano())
	}

	log.Printf("开始处理WebSocket连接，用户ID: %s", userID)

	client := &Client{
		ID:            userID,
		Conn:          c,
		Send:          make(chan []byte, 256),
		LastHeartbeat: time.Now(),
		IsOnline:      false,
	}

	// 直接在这里处理客户端连接，而不是通过通道
	server.handleClientConnection(client)
}

// 新增：直接处理客户端连接的函数
func (server *WebSocketServer) handleClientConnection(client *Client) {
	// 注册客户端
	server.mutex.Lock()
	server.clients[client.ID] = client
	client.IsOnline = true
	client.LastHeartbeat = time.Now()
	clientCount := len(server.clients)
	server.mutex.Unlock()

	log.Printf("客户端 %s 已连接，当前在线人数: %d", client.ID, clientCount)

	// 创建一个done通道来协调协程退出
	done := make(chan struct{})
	
	// 启动写入协程
	go func() {
		defer func() {
			if r := recover(); r != nil {
				log.Printf("writePump panic recovered: %v", r)
			}
			done <- struct{}{}
		}()
		client.writePump()
	}()

	// 启动读取协程  
	go func() {
		defer func() {
			if r := recover(); r != nil {
				log.Printf("readPump panic recovered: %v", r)
			}
			done <- struct{}{}
		}()
		client.readPump(server)
	}()

	// 发送初始在线人数
	go func() {
		time.Sleep(100 * time.Millisecond)
		server.sendOnlineCountToClient(client)
	}()

	// 等待任一协程结束
	<-done
	
	// 清理客户端
	server.mutex.Lock()
	if _, exists := server.clients[client.ID]; exists {
		delete(server.clients, client.ID)
		close(client.Send)
		log.Printf("客户端 %s 已断开连接，当前在线人数: %d", client.ID, len(server.clients))
	}
	server.mutex.Unlock()
	
	client.Conn.Close()
}

func main() {
	server := NewWebSocketServer()

	// 启动服务器主循环
	go server.Run()
	go server.startHeartbeatChecker()
	go server.startOnlineCountBroadcast()

	app := fiber.New()
	app.Use(cors.New())

	// 添加调试日志
	log.Println("正在启动WebSocket服务器...")

	app.Use("/ws", func(c *fiber.Ctx) error {
		log.Printf("收到WebSocket升级请求: %s", c.Path())
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			// 在这里获取查询参数并存储到 Locals 中
			userID := c.Query("userId")
			if userID == "" {
				userID = fmt.Sprintf("user_%d", time.Now().UnixNano())
			}
			c.Locals("userID", userID)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		server.handleWebSocket(c)
	}))

	// 修改为监听所有网络接口，而不是只监听localhost
	log.Println("WebSocket服务器启动在端口 8080，监听所有网络接口")
	log.Println("HTTP测试地址: http://192.168.18.122:8080/test")
	log.Fatal(app.Listen("0.0.0.0:8080"))
}
