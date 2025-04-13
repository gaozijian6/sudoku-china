import GameKit
import Foundation
import React

enum LeaderboardType: String, CaseIterable {
    case entryPassCounts = "entryPassCounts2"
    case easyPassCounts = "easyPassCounts2"
    case mediumPassCounts = "mediumPassCounts2"
    case hardPassCounts = "hardPassCounts2"
    case extremePassCounts = "extremePassCounts2"
    case totalPassCounts = "totalPassCounts2"
    
    var leaderboardId: String {
        switch self {
        case .entryPassCounts:
            return "grp.entryPassCounts2"
        case .easyPassCounts:
            return "grp.easyPassCounts2"
        case .mediumPassCounts:
            return "grp.mediumPassCounts2"
        case .hardPassCounts:
            return "grp.hardPassCounts2"
        case .extremePassCounts:
            return "grp.extremePassCounts2"
        case .totalPassCounts:
            return "grp.totalPassCounts2"
        }
    }
}

@objc(LeaderboardManager)
class LeaderboardManager: NSObject {
    
    // 单例
    @objc static let shared = LeaderboardManager()
    // 将认证状态改为静态属性，确保在整个应用生命周期内共享
    private static var isAuthenticated: Bool = false
    
    // 这里添加自定义初始化方法，确保可以被JS调用
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    // MARK: - 初始化
    @objc func initialize(_ resolve: @escaping RCTPromiseResolveBlock,
                          reject: @escaping RCTPromiseRejectBlock) {
        print("开始初始化 GameCenter")
        
        DispatchQueue.main.async {
            self.authenticatePlayer { success, error in
                if let error = error {
                    print("初始化失败: \(error.localizedDescription)")
                    reject("ERROR", "初始化失败: \(error.localizedDescription)", error)
                    return
                }
                
                if success {
                    print("初始化成功，用户已认证")
                    // 更新静态认证状态
                    LeaderboardManager.isAuthenticated = true
                    let result: [String: Any] = [
                        "isAuthenticated": true,
                        "leaderboards": LeaderboardType.allCases.map { type in
                            return [
                                "type": type.rawValue,
                                "id": type.leaderboardId
                            ]
                        }
                    ]
                    resolve(result)
                } else {
                    print("初始化失败，用户未认证")
                    // 确保未认证状态也被正确设置
                    LeaderboardManager.isAuthenticated = false
                    reject("ERROR", "GameCenter 认证失败", nil)
                }
            }
        }
    }
    
    // MARK: - 提交分数
    @objc func submitScore(_ score: Int,
                          type: String,
                          resolver resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
        // 检查静态认证状态
        guard LeaderboardManager.isAuthenticated else {
            print("提交分数失败：GameCenter 未认证")
            reject("ERROR", "GameCenter 未认证", nil)
            return
        }
        
        guard let leaderboardType = LeaderboardType(rawValue: type) else {
            print("提交分数失败：无效的排行榜类型: \(type)")
            reject("ERROR", "无效的排行榜类型: \(type)", nil)
            return
        }
        
        print("提交分数到排行榜: \(leaderboardType.leaderboardId), 分数: \(score)")
        let scoreReporter = GKScore(leaderboardIdentifier: leaderboardType.leaderboardId)
        scoreReporter.value = Int64(score)
        
        GKScore.report([scoreReporter]) { error in
            if let error = error {
                print("提交分数失败: \(error.localizedDescription)")
                reject("ERROR", error.localizedDescription, error)
            } else {
                print("提交分数成功")
                resolve([
                    "success": true,
                    "type": type,
                    "score": score
                ])
            }
        }
    }
    
    // MARK: - 显示排行榜
    @objc func showLeaderboard(_ type: String,
                              resolver resolve: @escaping RCTPromiseResolveBlock,
                              rejecter reject: @escaping RCTPromiseRejectBlock) {
        print("开始显示排行榜: \(type), 当前认证状态: \(LeaderboardManager.isAuthenticated)")
        
        // 如果未认证，先进行认证
        if !LeaderboardManager.isAuthenticated {
            print("用户未认证，尝试进行认证")
            
            DispatchQueue.main.async {
                self.authenticatePlayer { success, error in
                    if let error = error {
                        print("认证失败: \(error.localizedDescription)")
                        reject("ERROR", "Game Center 认证失败: \(error.localizedDescription)", error)
                        return
                    }
                    
                    if success {
                        print("认证成功")
                        LeaderboardManager.isAuthenticated = true
                        // 认证成功后继续显示排行榜
                        self.displayLeaderboard(type, resolve: resolve, reject: reject)
                    } else {
                        print("认证未成功")
                        LeaderboardManager.isAuthenticated = false
                        reject("ERROR", "Game Center 认证失败", nil)
                    }
                }
            }
        } else {
            print("用户已认证，直接显示排行榜")
            // 已认证，直接显示排行榜
            displayLeaderboard(type, resolve: resolve, reject: reject)
        }
    }
    
    // 辅助方法：显示排行榜
    private func displayLeaderboard(_ type: String,
                                  resolve: @escaping RCTPromiseResolveBlock,
                                  reject: @escaping RCTPromiseRejectBlock) {
        guard let leaderboardType = LeaderboardType(rawValue: type) else {
            print("无效的排行榜类型: \(type)")
            reject("ERROR", "无效的排行榜类型: \(type)", nil)
            return
        }
        
        print("准备显示排行榜: \(leaderboardType.leaderboardId)")
        
        // 确保所有UI操作都在主线程执行
        DispatchQueue.main.async {
            let scenes = UIApplication.shared.connectedScenes
            if let windowScene = scenes.first as? UIWindowScene,
               let rootViewController = windowScene.windows.first?.rootViewController {
                
                let gcViewController = GKGameCenterViewController(leaderboardID: leaderboardType.leaderboardId, playerScope: .global, timeScope: .allTime)
                gcViewController.gameCenterDelegate = self
                print("正在显示排行榜界面")
                rootViewController.present(gcViewController, animated: true) {
                    resolve(["success": true, "type": type])
                }
            } else {
                print("无法获取根视图控制器")
                reject("ERROR", "无法显示排行榜界面", nil)
            }
        }
    }
    
    // MARK: - 私有方法
    // 创建一个变量跟踪认证回调是否已经被调用
    private var authenticationCompletionCallbacks: [(Bool, Error?) -> Void] = []
    private var isAuthenticating: Bool = false
    
    // 修改authenticatePlayer方法
    private func authenticatePlayer(completion: @escaping (Bool, Error?) -> Void) {
        print("开始认证玩家, 当前认证状态: \(LeaderboardManager.isAuthenticated)")
        
        // 先检查当前玩家是否已认证
        let localPlayer = GKLocalPlayer.local
        if localPlayer.isAuthenticated {
            print("玩家已经认证: \(localPlayer.displayName)")
            LeaderboardManager.isAuthenticated = true
            completion(true, nil)
            return
        }
        
        // 如果已经在认证过程中，加入队列等待结果
        if isAuthenticating {
            print("已有认证过程在进行中，加入回调队列")
            authenticationCompletionCallbacks.append(completion)
            return
        }
        
        // 标记开始认证过程
        isAuthenticating = true
        authenticationCompletionCallbacks.append(completion)
        
        // 定义一个用于跟踪是否已经处理过回调的标志变量
        var handlerCalled = false
        
        // 如果未认证，执行认证过程
        DispatchQueue.main.async {
            localPlayer.authenticateHandler = { [weak self] viewController, error in
                guard let self = self else { return }
                
                // 防止多次回调处理
                if handlerCalled {
                    print("authenticateHandler 已经被调用过，忽略此次回调")
                    return
                }
                handlerCalled = true
                
                if let error = error {
                    print("认证发生错误: \(error.localizedDescription)")
                    LeaderboardManager.isAuthenticated = false
                    self.completeAuthentication(success: false, error: error)
                    return
                }
                
                if let viewController = viewController {
                    print("需要显示认证界面")
                    // 需要用户交互才能完成认证，重置标志以便下次回调可以处理
                    handlerCalled = false
                    
                    DispatchQueue.main.async {
                        if let rootViewController = self.getRootViewController() {
                            rootViewController.present(viewController, animated: true)
                        } else {
                            print("无法显示认证界面")
                            self.completeAuthentication(success: false, error: nil)
                        }
                    }
                } else if localPlayer.isAuthenticated {
                    print("玩家已认证: \(localPlayer.displayName)")
                    LeaderboardManager.isAuthenticated = true
                    self.completeAuthentication(success: true, error: nil)
                } else {
                    print("玩家未认证")
                    LeaderboardManager.isAuthenticated = false
                    self.completeAuthentication(success: false, error: nil)
                }
            }
        }
    }
    
    // 新增方法处理认证完成并通知所有回调
    private func completeAuthentication(success: Bool, error: Error?) {
        DispatchQueue.main.async {
            // 复制当前回调列表并清空
            let callbacks = self.authenticationCompletionCallbacks
            self.authenticationCompletionCallbacks = []
            self.isAuthenticating = false
            
            // 通知所有等待的回调
            for callback in callbacks {
                callback(success, error)
            }
        }
    }
    
    // 修改获取根视图控制器的辅助方法
    private func getRootViewController() -> UIViewController? {
        // connectedScenes 不是 Optional 类型，不能用 if let
        let scenes = UIApplication.shared.connectedScenes
        if let windowScene = scenes.first as? UIWindowScene,
           let rootViewController = windowScene.windows.first?.rootViewController {
            return rootViewController
        }
        return nil
    }
}

// MARK: - GKGameCenterControllerDelegate
extension LeaderboardManager: GKGameCenterControllerDelegate {
    func gameCenterViewControllerDidFinish(_ gameCenterViewController: GKGameCenterViewController) {
        print("Game Center 控制器已关闭")
        gameCenterViewController.dismiss(animated: true)
    }
} 