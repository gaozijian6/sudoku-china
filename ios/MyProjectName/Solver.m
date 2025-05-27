#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Solver, NSObject)

RCT_EXTERN_METHOD(solve:(NSArray *)boardArray
                  answerArray:(NSArray *)answerArray
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(rate:(NSArray *)boardArray
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end