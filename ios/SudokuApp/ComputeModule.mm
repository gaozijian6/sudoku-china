#import "ComputeModule.h"
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>

@implementation ComputeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(solveSudoku:(NSArray *)board 
                  standardBoard:(NSArray *)standardBoard
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // 创建数字数组和草稿数组
  NSMutableArray *numberBoard = [NSMutableArray arrayWithCapacity:9];
  NSMutableArray *draftBoard = [NSMutableArray arrayWithCapacity:9];
  
  // 初始化数组
  for (int i = 0; i < 9; i++) {
    numberBoard[i] = [NSMutableArray arrayWithCapacity:9];
    draftBoard[i] = [NSMutableArray arrayWithCapacity:9];
    for (int j = 0; j < 9; j++) {
      draftBoard[i][j] = [NSMutableArray arrayWithCapacity:9];
    }
  }
  
  // 转换数字数组和草稿数组
  for (int i = 0; i < 9; i++) {
    NSArray *row = board[i];
    NSArray *standardRow = standardBoard[i];
    for (int j = 0; j < 9; j++) {
      NSDictionary *cell = row[j];
      NSDictionary *standardCell = standardRow[j];
      
      // 设置数字
      if ([cell objectForKey:@"value"] != [NSNull null]) {
        numberBoard[i][j] = cell[@"value"];
      } else {
        numberBoard[i][j] = @0;
      }
      
      // 设置草稿
      NSArray *draft = standardCell[@"draft"];
      for (NSNumber *num in draft) {
        draftBoard[i][j][[num intValue] - 1] = @YES;
      }
    }
  }
  
  // 尝试解决数独
  BOOL solved = [self solveSudokuHelper:numberBoard draftBoard:draftBoard];
  
  if (solved) {
    // 将结果转换回 CellData[][] 格式
    NSMutableArray *solvedBoard = [NSMutableArray arrayWithCapacity:9];
    for (int i = 0; i < 9; i++) {
      NSMutableArray *row = [NSMutableArray arrayWithCapacity:9];
      for (int j = 0; j < 9; j++) {
        NSMutableDictionary *cell = [NSMutableDictionary dictionary];
        cell[@"value"] = numberBoard[i][j];
        
        // 保持原有的 isGiven 属性
        NSDictionary *originalCell = board[i][j];
        cell[@"isGiven"] = originalCell[@"isGiven"];
        
        // 创建空的 draft 数组
        cell[@"draft"] = @[];
        
        [row addObject:cell];
      }
      [solvedBoard addObject:row];
    }
    
    resolve(solvedBoard);
  } else {
    resolve(@NO);
  }
}

- (BOOL)solveSudokuHelper:(NSMutableArray *)board draftBoard:(NSMutableArray *)draftBoard {
  for (int row = 0; row < 9; row++) {
    for (int col = 0; col < 9; col++) {
      if ([board[row][col] intValue] == 0) {
        for (int num = 1; num <= 9; num++) {
          if ([draftBoard[row][col][num-1] boolValue] && [self isValidPlacement:board row:row col:col num:num]) {
            board[row][col] = @(num);
            if ([self solveSudokuHelper:board draftBoard:draftBoard]) {
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

- (BOOL)isValidPlacement:(NSArray *)board row:(int)row col:(int)col num:(int)num {
  // 检查行
  for (int x = 0; x < 9; x++) {
    if ([board[row][x] intValue] == num) {
      return NO;
    }
  }
  
  // 检查列
  for (int x = 0; x < 9; x++) {
    if ([board[x][col] intValue] == num) {
      return NO;
    }
  }
  
  // 检查3x3方格
  int startRow = row - row % 3;
  int startCol = col - col % 3;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if ([board[i + startRow][j + startCol] intValue] == num) {
        return NO;
      }
    }
  }
  
  return YES;
}

RCT_EXPORT_METHOD(add:(NSNumber *)a
                  b:(NSNumber *)b
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @([a intValue] + [b intValue]);
    resolve(result);
}

@end
