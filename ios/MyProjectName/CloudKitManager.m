// CloudKitManager.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CloudKitManager, NSObject)

RCT_EXTERN_METHOD(saveData:(NSString *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(fetchData:(NSString *)record
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deleteData:(NSArray *)recordIds
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateData:(NSString *)recordId
                  newData:(NSString *)newData
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end