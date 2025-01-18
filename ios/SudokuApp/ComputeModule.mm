#import "ComputeModule.h"
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>

@implementation ComputeModule

// 确保模块名称正确导出
RCT_EXPORT_MODULE(ComputeModule)

// 如果需要在主线程运行，添加这个方法
- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(add:(nonnull NSNumber *)a
                  b:(nonnull NSNumber *)b
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSLog(@"add method called with %@ and %@", a, b);  // 添加日志
    NSNumber *result = @([a intValue] + [b intValue]);
    resolve(result);
}

// 如果需要在 JS 中同步访问常量，可以添加这个方法
+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end
