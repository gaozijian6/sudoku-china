#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ColorChain, NSObject)

RCT_EXTERN_METHOD(solve:(NSArray *)board
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 