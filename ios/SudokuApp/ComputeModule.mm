#import "ComputeModule.h"
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <Foundation/Foundation.h>

@implementation ComputeModule {
    dispatch_queue_t _computeQueue;
}

- (instancetype)init {
    if (self = [super init]) {
        _computeQueue = dispatch_queue_create("com.sudoku.compute", DISPATCH_QUEUE_CONCURRENT);
    }
    return self;
}

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

RCT_EXPORT_METHOD(solveSudoku:(NSArray *)board 
                  standardBoard:(NSArray *)standardBoard
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(_computeQueue, ^{
        dispatch_group_t group = dispatch_group_create();
        __block NSArray *solution1 = nil;
        __block NSArray *solution2 = nil;
        
        // 启动第一个求解任务
        dispatch_group_async(group, self->_computeQueue, ^{
            solution1 = [self solveSudoku1:board standardBoard:standardBoard];
        });
        
        // 启动第二个求解任务
        dispatch_group_async(group, self->_computeQueue, ^{
            solution2 = [self solveSudoku2:board standardBoard:standardBoard];
        });
        
        dispatch_group_notify(group, dispatch_get_main_queue(), ^{
            if (!solution1 && !solution2) {
                resolve(@NO);
                return;
            }
            
            NSArray *firstResult = solution1 ? solution1 : solution2;
            NSArray *secondResult = solution1 ? solution2 : solution1;
            
            if ([self isSolutionsEqual:firstResult second:secondResult]) {
                resolve(firstResult);
            } else {
                resolve(@NO);
            }
        });
    });
}

// 第一个求解方法
- (NSArray *)solveSudoku1:(NSArray *)board standardBoard:(NSArray *)standardBoard {
    NSMutableArray<NSMutableArray<NSNumber *> *> *numberBoard = [NSMutableArray arrayWithCapacity:9];
    NSMutableArray<NSMutableArray<NSMutableArray<NSNumber *> *> *> *draftBoard = [NSMutableArray arrayWithCapacity:9];
    
    // 初始化数组
    [self initializeBoards:numberBoard draftBoard:draftBoard fromBoard:board standardBoard:standardBoard];
    
    // 求解数独
    if ([self solveSudokuHelper1:numberBoard draftBoard:draftBoard]) {
        return [self convertToResultArray:numberBoard originalBoard:board];
    }
    
    return nil;
}

// 第二个求解方法
- (NSArray *)solveSudoku2:(NSArray *)board standardBoard:(NSArray *)standardBoard {
    NSMutableArray<NSMutableArray<NSNumber *> *> *numberBoard = [NSMutableArray arrayWithCapacity:9];
    NSMutableArray<NSMutableArray<NSMutableArray<NSNumber *> *> *> *draftBoard = [NSMutableArray arrayWithCapacity:9];
    
    // 初始化数组
    [self initializeBoards:numberBoard draftBoard:draftBoard fromBoard:board standardBoard:standardBoard];
    
    // 求解数独
    if ([self solveSudokuHelper2:numberBoard draftBoard:draftBoard]) {
        return [self convertToResultArray:numberBoard originalBoard:board];
    }
    
    return nil;
}

// 辅助方法：初始化数独板和草稿板
- (void)initializeBoards:(NSMutableArray *)numberBoard 
              draftBoard:(NSMutableArray *)draftBoard 
               fromBoard:(NSArray *)board 
           standardBoard:(NSArray *)standardBoard {
    for (int i = 0; i < 9; i++) {
        NSMutableArray *numberRow = [NSMutableArray arrayWithCapacity:9];
        NSMutableArray *draftRow = [NSMutableArray arrayWithCapacity:9];
        
        for (int j = 0; j < 9; j++) {
            NSDictionary *cell = board[i][j];
            NSDictionary *standardCell = standardBoard[i][j];
            
            // 设置数字（添加空值检查）
            NSNumber *value = cell[@"value"];
            if (value == [NSNull null]) {
                value = @0;
            }
            [numberRow addObject:value ? value : @0];
            
            // 设置草稿（添加空值检查）
            NSMutableArray *cellDraft = [NSMutableArray arrayWithCapacity:9];
            for (int k = 0; k < 9; k++) {
                [cellDraft addObject:@NO];
            }
            
            NSArray *draft = standardCell[@"draft"];
            if (draft != [NSNull null] && [draft isKindOfClass:[NSArray class]]) {
                for (id num in draft) {
                    if ([num isKindOfClass:[NSNumber class]]) {
                        cellDraft[[num intValue] - 1] = @YES;
                    }
                }
            }
            [draftRow addObject:cellDraft];
        }
        
        [numberBoard addObject:numberRow];
        [draftBoard addObject:draftRow];
    }
}

// 第一个求解助手方法
- (BOOL)solveSudokuHelper1:(NSMutableArray *)board draftBoard:(NSMutableArray *)draftBoard {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if ([board[row][col] intValue] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if ([draftBoard[row][col][num-1] boolValue] && 
                        [self isValidPlacement:board row:row col:col num:num]) {
                        board[row][col] = @(num);
                        if ([self solveSudokuHelper1:board draftBoard:draftBoard]) {
                            return YES;
                        }
                        board[row][col] = @0;
                    }
                }
                return NO;
            }
        }
    }
    return YES;
}

// 第二个求解助手方法
- (BOOL)solveSudokuHelper2:(NSMutableArray *)board draftBoard:(NSMutableArray *)draftBoard {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if ([board[row][col] intValue] == 0) {
                for (int num = 9; num >= 1; num--) {
                    if ([draftBoard[row][col][num-1] boolValue] && 
                        [self isValidPlacement:board row:row col:col num:num]) {
                        board[row][col] = @(num);
                        if ([self solveSudokuHelper2:board draftBoard:draftBoard]) {
                            return YES;
                        }
                        board[row][col] = @0;
                    }
                }
                return NO;
            }
        }
    }
    return YES;
}

// 检查位置是否有效
- (BOOL)isValidPlacement:(NSArray *)board row:(int)row col:(int)col num:(int)num {
    // 检查行
    for (int x = 0; x < 9; x++) {
        if ([board[row][x] intValue] == num) return NO;
    }
    
    // 检查列
    for (int x = 0; x < 9; x++) {
        if ([board[x][col] intValue] == num) return NO;
    }
    
    // 检查3x3方格
    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if ([board[i + startRow][j + startCol] intValue] == num) return NO;
        }
    }
    
    return YES;
}

// 转换结果为数组
- (NSArray *)convertToResultArray:(NSArray *)numberBoard originalBoard:(NSArray *)originalBoard {
    NSMutableArray *solvedBoard = [NSMutableArray arrayWithCapacity:9];
    
    for (int i = 0; i < 9; i++) {
        NSMutableArray *row = [NSMutableArray arrayWithCapacity:9];
        for (int j = 0; j < 9; j++) {
            NSMutableDictionary *cell = [NSMutableDictionary dictionary];
            cell[@"value"] = numberBoard[i][j];
            cell[@"isGiven"] = originalBoard[i][j][@"isGiven"];
            cell[@"draft"] = @[];
            [row addObject:cell];
        }
        [solvedBoard addObject:row];
    }
    
    return solvedBoard;
}

// 比较两个解是否相等
- (BOOL)isSolutionsEqual:(NSArray *)solution1 second:(NSArray *)solution2 {
    if (!solution1 || !solution2) return NO;
    
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if ([solution1[i][j][@"value"] intValue] != 
                [solution2[i][j][@"value"] intValue]) {
                return NO;
            }
        }
    }
    return YES;
}

@end
