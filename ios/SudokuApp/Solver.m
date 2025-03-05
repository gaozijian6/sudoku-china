#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Solver, NSObject)

RCT_EXTERN_METHOD(solve:(NSString *)input
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end