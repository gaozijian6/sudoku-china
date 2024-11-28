package com.sudoku.app;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import java.util.*;
import java.util.function.Function;

public class ComputeModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public ComputeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ComputeModule";
    }

    @ReactMethod
    public void solveSudoku1(ReadableArray board, ReadableArray standardBoard, Promise promise) {
        new Thread(() -> {
            int[][] numberBoard = new int[9][9];
            boolean[][][] draftBoard = new boolean[9][9][9];
            
            // 转换数字数组和草稿数组
            for (int i = 0; i < 9; i++) {
                ReadableArray row = board.getArray(i);
                ReadableArray standardRow = standardBoard.getArray(i);
                for (int j = 0; j < 9; j++) {
                    ReadableMap cell = row.getMap(j);
                    ReadableMap standardCell = standardRow.getMap(j);
                    
                    // 设置数字
                    if (cell.hasKey("value") && !cell.isNull("value")) {
                        numberBoard[i][j] = cell.getInt("value");
                    } else {
                        numberBoard[i][j] = 0;
                    }
                    
                    // 设置草稿
                    ReadableArray draft = standardCell.getArray("draft");
                    for (int k = 0; k < draft.size(); k++) {
                        draftBoard[i][j][draft.getInt(k) - 1] = true;
                    }
                }
            }

            boolean solved = solveSudokuHelper1(numberBoard, draftBoard);

            System.out.println("solved: " + solved);
            
            if (solved) {
                // 将结果转换回 CellData[][] 格式
                WritableArray solvedBoard = new WritableNativeArray();
                for (int i = 0; i < 9; i++) {
                    WritableArray row = new WritableNativeArray();
                    for (int j = 0; j < 9; j++) {
                        WritableMap cell = new WritableNativeMap();
                        cell.putInt("value", numberBoard[i][j]);
                        
                        // 保持原有的 isGiven 属性
                        ReadableMap originalCell = board.getArray(i).getMap(j);
                        cell.putBoolean("isGiven", originalCell.getBoolean("isGiven"));
                        
                        // 创建空的 draft 数组
                        WritableArray draft = new WritableNativeArray();
                        cell.putArray("draft", draft);
                        
                        row.pushMap(cell);
                    }
                    solvedBoard.pushArray(row);
                }
                reactContext.runOnUiQueueThread(() -> promise.resolve(solvedBoard));
            } else {
                reactContext.runOnUiQueueThread(() -> promise.resolve(false));
            }
        }).start();
    }

    @ReactMethod
    public void solveSudoku2(ReadableArray board, ReadableArray standardBoard, Promise promise) {
        new Thread(() -> {
            int[][] numberBoard = new int[9][9];
            boolean[][][] draftBoard = new boolean[9][9][9];
            
            // 转换数字数组和草稿数组
            for (int i = 0; i < 9; i++) {
                ReadableArray row = board.getArray(i);
                ReadableArray standardRow = standardBoard.getArray(i);
                for (int j = 0; j < 9; j++) {
                    ReadableMap cell = row.getMap(j);
                    ReadableMap standardCell = standardRow.getMap(j);
                    
                    // 设置数字
                    if (cell.hasKey("value") && !cell.isNull("value")) {
                        numberBoard[i][j] = cell.getInt("value");
                    } else {
                        numberBoard[i][j] = 0;
                    }
                    
                    // 设置草稿
                    ReadableArray draft = standardCell.getArray("draft");
                    for (int k = 0; k < draft.size(); k++) {
                        draftBoard[i][j][draft.getInt(k) - 1] = true;
                    }
                }
            }

            // 求解数独
            if (solveSudokuHelper2(numberBoard, draftBoard)) {
                // 将结果转换回 CellData[][] 格式
                WritableArray solvedBoard = new WritableNativeArray();
                for (int i = 0; i < 9; i++) {
                    WritableArray row = new WritableNativeArray();
                    for (int j = 0; j < 9; j++) {
                        WritableMap cell = new WritableNativeMap();
                        cell.putInt("value", numberBoard[i][j]);
                        
                        // 保持原有的 isGiven 属性
                        ReadableMap originalCell = board.getArray(i).getMap(j);
                        cell.putBoolean("isGiven", originalCell.getBoolean("isGiven"));
                        
                        // 创建空的 draft 数组
                        WritableArray draft = new WritableNativeArray();
                        cell.putArray("draft", draft);
                        
                        row.pushMap(cell);
                    }
                    solvedBoard.pushArray(row);
                }
                reactContext.runOnUiQueueThread(() -> promise.resolve(solvedBoard));
            } else {
                reactContext.runOnUiQueueThread(() -> promise.resolve(false));
            }
        }).start();
    }

    private boolean solveSudokuHelper1(int[][] board, boolean[][][] draftBoard) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (draftBoard[row][col][num-1] && isValidPlacement(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudokuHelper1(board, draftBoard)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private boolean solveSudokuHelper2(int[][] board, boolean[][][] draftBoard) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == 0) {
                    for (int num = 9; num >= 1; num--) {
                        // 检查数字是否在草稿中且位置有效
                        if (draftBoard[row][col][num-1] && isValidPlacement(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudokuHelper2(board, draftBoard)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private boolean isValidPlacement(int[][] board, int row, int col, int num) {
        // 检查行
        for (int x = 0; x < 9; x++) {
            if (board[row][x] == num) return false;
        }

        // 检查列
        for (int x = 0; x < 9; x++) {
            if (board[x][col] == num) return false;
        }

        // 检查3x3方格
        int startRow = row - row % 3;
        int startCol = col - col % 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] == num) return false;
            }
        }

        return true;
    }
}