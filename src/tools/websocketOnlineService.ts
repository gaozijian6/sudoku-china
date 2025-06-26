import { AppState } from 'react-native';

// 消息类型枚举
enum MessageType {
  ONLINE_STATUS = 'online_status',
  ONLINE_COUNT = 'online_count',
}

interface WebSocketConfig {
  serverUrl: string; // WebSocket服务器地址
  userId?: string; // 用户ID
  reconnectInterval?: number; // 重连间隔（毫秒），默认5秒
  maxReconnectAttempts?: number; // 最大重连次数，默认5次
  onOnlineCountUpdate?: (count: number) => void; // 在线人数更新回调
}

interface OnlineStatusMessage {
  type: MessageType.ONLINE_STATUS;
  userId: string;
  status: 'online' | 'offline';
  timestamp: string;
}

interface OnlineCountMessage {
  type: MessageType.ONLINE_COUNT;
  count: number;
  timestamp: string;
}

type WebSocketMessage = OnlineStatusMessage | OnlineCountMessage;

class WebSocketOnlineService {
  private websocket: WebSocket | null = null;
  private config: Required<WebSocketConfig> & { onOnlineCountUpdate?: (count: number) => void };
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private isConnected: boolean = false;
  private isConnecting: boolean = false;
  private appStateSubscription: any = null;
  private shouldReconnect: boolean = true;

  constructor(config: WebSocketConfig) {
    this.config = {
      userId: 'anonymous',
      reconnectInterval: 5000,
      maxReconnectAttempts: 1,
      ...config, // 用传入的配置覆盖默认值
    };
    this.setupAppStateListener();
  }

  /**
   * 连接到WebSocket服务器
   */
  public connect(): void {
    if (this.isConnected || this.isConnecting) {
      console.log('WebSocket已连接或正在连接中');
      return;
    }

    this.isConnecting = true;

    // 构建包含userId的WebSocket URL
    const wsUrl = `${this.config.serverUrl}?userId=${this.config.userId}`;
    console.log(`正在连接到WebSocket服务器: ${wsUrl}`);

    this.websocket = new WebSocket(wsUrl);

    this.websocket.onopen = () => {
      console.log('WebSocket连接成功');
      this.isConnected = true;
      this.isConnecting = false;
      this.reconnectAttempts = 0;

      // 延迟发送上线状态，给服务器多一点时间准备
      setTimeout(() => {
        if (this.isConnected) {
          this.sendOnlineStatus('online');
        }
      }, 500);
    };

    this.websocket.onmessage = event => {
      this.handleMessage(event.data);
    };

    this.websocket.onclose = event => {
      console.log(`WebSocket连接关闭: ${event.code} - ${event.reason}`);
      this.isConnected = false;
      this.isConnecting = false;

      // 自动重连
      if (this.shouldReconnect) {
        this.attemptReconnect();
      }
    };

    this.websocket.onerror = error => {
      console.log('WebSocket连接错误:', error);
      this.isConnecting = false;
    };
  }

  /**
   * 断开WebSocket连接
   */
  public disconnect(): void {
    this.shouldReconnect = false;

    if (this.isConnected && this.websocket) {
      // 发送下线状态
      this.sendOnlineStatus('offline');
    }

    this.stopReconnectTimer();

    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }

    this.isConnected = false;
    console.log('WebSocket已断开');
  }

  /**
   * 发送在线状态
   */
  private sendOnlineStatus(status: 'online' | 'offline'): void {
    const message: OnlineStatusMessage = {
      type: MessageType.ONLINE_STATUS,
      userId: this.config.userId,
      status: status,
      timestamp: new Date().toISOString(),
    };

    this.sendMessage(message);
  }

  /**
   * 发送消息到服务器
   */
  private sendMessage(message: WebSocketMessage): void {
    if (this.isConnected && this.websocket) {
      this.websocket.send(JSON.stringify(message));
      console.log(`发送消息: ${message.type}`);
    } else {
      console.log('WebSocket未连接，无法发送消息');
    }
  }

  /**
   * 处理接收到的消息
   */
  private handleMessage(data: string): void {
    try {
      const message = JSON.parse(data);

      switch (message.type) {
        case MessageType.ONLINE_COUNT:
          // 通过回调通知外部更新在线人数
          if (this.config.onOnlineCountUpdate) {
            this.config.onOnlineCountUpdate(message.count);
          }
          break;

        default:
          console.log('未知消息类型:', message.type);
          break;
      }
    } catch (error) {
      console.error('解析服务器消息失败:', error, '原始数据:', data);
    }
  }

  /**
   * 尝试重连
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log('达到最大重连次数，停止重连');
      return;
    }

    this.reconnectAttempts++;
    console.log(
      `第${this.reconnectAttempts}次重连尝试，${this.config.reconnectInterval / 1000}秒后开始`
    );

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, this.config.reconnectInterval);
  }

  /**
   * 停止重连定时器
   */
  private stopReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * 设置应用状态监听器
   */
  private setupAppStateListener(): void {
    this.appStateSubscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // 应用变为活跃状态
        console.log('应用进入前台，恢复WebSocket连接');
        this.shouldReconnect = true;
        if (!this.isConnected) {
          this.connect();
        }
      } else if (nextAppState === 'background') {
        // 应用进入后台
        console.log('应用进入后台，断开WebSocket连接');
        this.disconnect();
      }
    });
  }

  /**
   * 获取连接状态
   */
  public getConnectionStatus(): {
    isConnected: boolean;
    isConnecting: boolean;
    reconnectAttempts: number;
  } {
    return {
      isConnected: this.isConnected,
      isConnecting: this.isConnecting,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  /**
   * 清理资源
   */
  public cleanup(): void {
    this.disconnect();
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
    }
  }
}

// 导出单例实例
let websocketServiceInstance: WebSocketOnlineService | null = null;

export const createWebSocketService = (config: WebSocketConfig): WebSocketOnlineService => {
  if (websocketServiceInstance) {
    websocketServiceInstance.cleanup();
  }
  websocketServiceInstance = new WebSocketOnlineService(config);
  return websocketServiceInstance;
};

export const getWebSocketService = (): WebSocketOnlineService | null => {
  return websocketServiceInstance;
};

export { WebSocketOnlineService, MessageType };
export type { WebSocketConfig, WebSocketMessage };
