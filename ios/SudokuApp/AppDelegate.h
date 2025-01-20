#import <UIKit/UIKit.h>
#import <React/RCTBridgeDelegate.h>
#import <StoreKit/StoreKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, SKPaymentTransactionObserver>

@property (nonatomic, strong) UIWindow *window;

@end
