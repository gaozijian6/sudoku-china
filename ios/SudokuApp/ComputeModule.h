#import <React/RCTBridgeModule.h>

@interface ComputeModule : NSObject <RCTBridgeModule>
- (void)add:(nonnull NSNumber*)a b:(nonnull NSNumber*)b 
    resolver:(RCTPromiseResolveBlock)resolve 
    rejecter:(RCTPromiseRejectBlock)reject;
@end
