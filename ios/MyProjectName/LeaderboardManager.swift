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
        
        DispatchQueue.main.async {
            self.authenticatePlayer { success, error in
                if let error = error {
                    reject("ERROR", "初始化失败: \(error.localizedDescription)", error)
                    return
                }
                
                if success {
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
            return
        }
        
        guard let leaderboardType = LeaderboardType(rawValue: type) else {
            return
        }
        
        let scoreReporter = GKScore(leaderboardIdentifier: leaderboardType.leaderboardId)
        scoreReporter.value = Int64(score)
        
        GKScore.report([scoreReporter]) { error in
            if let error = error {
            } else {
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
        
        // 如果未认证，先进行认证
        if !LeaderboardManager.isAuthenticated {
            
            DispatchQueue.main.async {
                self.authenticatePlayer { success, error in
                    if let error = error {
                        reject("ERROR", "Game Center 认证失败: \(error.localizedDescription)", error)
                        return
                    }
                    
                    if success {
                        LeaderboardManager.isAuthenticated = true
                        // 认证成功后继续显示排行榜
                        self.displayLeaderboard(type, resolve: resolve, reject: reject)
                    } else {
                        LeaderboardManager.isAuthenticated = false
                        reject("ERROR", "Game Center 认证失败", nil)
                    }
                }
            }
        } else {
            // 已认证，直接显示排行榜
            displayLeaderboard(type, resolve: resolve, reject: reject)
        }
    }
    
    // 辅助方法：显示排行榜
    private func displayLeaderboard(_ type: String,
                                  resolve: @escaping RCTPromiseResolveBlock,
                                  reject: @escaping RCTPromiseRejectBlock) {
        guard let leaderboardType = LeaderboardType(rawValue: type) else {
            reject("ERROR", "无效的排行榜类型: \(type)", nil)
            return
        }
        
        
        // 确保所有UI操作都在主线程执行
        DispatchQueue.main.async {
            let scenes = UIApplication.shared.connectedScenes
            if let windowScene = scenes.first as? UIWindowScene,
               let rootViewController = windowScene.windows.first?.rootViewController {
                
                let gcViewController = GKGameCenterViewController(leaderboardID: leaderboardType.leaderboardId, playerScope: .global, timeScope: .allTime)
                gcViewController.gameCenterDelegate = self
                rootViewController.present(gcViewController, animated: true) {
                    resolve(["success": true, "type": type])
                }
            } else {
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
        
        // 先检查当前玩家是否已认证
        let localPlayer = GKLocalPlayer.local
        if localPlayer.isAuthenticated {
            LeaderboardManager.isAuthenticated = true
            completion(true, nil)
            return
        }
        
        // 如果已经在认证过程中，加入队列等待结果
        if isAuthenticating {
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
                    return
                }
                handlerCalled = true
                
                if let error = error {
                    LeaderboardManager.isAuthenticated = false
                    self.completeAuthentication(success: false, error: error)
                    return
                }
                
                if let viewController = viewController {
                    // 需要用户交互才能完成认证，重置标志以便下次回调可以处理
                    handlerCalled = false
                    
                    DispatchQueue.main.async {
                        if let rootViewController = self.getRootViewController() {
                            rootViewController.present(viewController, animated: true)
                        } else {
                            self.completeAuthentication(success: false, error: nil)
                        }
                    }
                } else if localPlayer.isAuthenticated {
                    LeaderboardManager.isAuthenticated = true
                    self.completeAuthentication(success: true, error: nil)
                } else {
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
        gameCenterViewController.dismiss(animated: true)
    }
} 