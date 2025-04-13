#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LeaderboardManager, NSObject)

// 修改类方法暴露方式
RCT_EXTERN_METHOD(initialize:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(submitScore:(NSInteger)score
                  type:(NSString *)type
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(showLeaderboard:(NSString *)type
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 