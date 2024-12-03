package com.sudoku_gzj.app;

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
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.CompletableFuture;

public class ComputeModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final ExecutorService executorService = Executors.newFixedThreadPool(2);

    public ComputeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ComputeModule";
    }

    @ReactMethod
    public void solveSudoku(ReadableArray board, ReadableArray standardBoard, Promise promise) {
        CompletableFuture<WritableArray> future1 = CompletableFuture.supplyAsync(
                () -> solveSudoku1(board, standardBoard),
                executorService);

        CompletableFuture<WritableArray> future2 = CompletableFuture.supplyAsync(
                () -> solveSudoku2(board, standardBoard),
                executorService);

        CompletableFuture.anyOf(future1, future2)
                .thenAccept(result -> {
                    WritableArray solution = (WritableArray) result;
                    if (solution == null) {
                        // 如果第一个结果为null，直接返回false
                        reactContext.runOnUiQueueThread(() -> promise.resolve(false));
                        return;
                    }

                    // 获取另一个future
                    CompletableFuture<WritableArray> remainingFuture = future1.isDone() ? future2 : future1;

                    remainingFuture.thenAccept(secondResult -> {
                        // 如果两个结果不相同，返回false
                        boolean isEqual = isSolutionsEqual(solution, secondResult);
                        reactContext.runOnUiQueueThread(() -> {
                            if (isEqual) {
                                promise.resolve(solution);
                            } else {
                                promise.resolve(false);
                            }
                        });
                    });
                })
                .exceptionally(throwable -> {
                    reactContext.runOnUiQueueThread(() -> promise.resolve(false));
                    return null;
                });
    }

    @ReactMethod
    public WritableArray solveSudoku1(ReadableArray board, ReadableArray standardBoard) {
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

            return solvedBoard;
        } else {
            return null;
        }
    }

    @ReactMethod
    public WritableArray solveSudoku2(ReadableArray board, ReadableArray standardBoard) {
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

            return solvedBoard;
        } else {
            return null;
        }
    }

    private boolean solveSudokuHelper1(int[][] board, boolean[][][] draftBoard) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (draftBoard[row][col][num - 1] && isValidPlacement(board, row, col, num)) {
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
                        if (draftBoard[row][col][num - 1] && isValidPlacement(board, row, col, num)) {
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
            if (board[row][x] == num)
                return false;
        }

        // 检查列
        for (int x = 0; x < 9; x++) {
            if (board[x][col] == num)
                return false;
        }

        // 检查3x3方格
        int startRow = row - row % 3;
        int startCol = col - col % 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] == num)
                    return false;
            }
        }

        return true;
    }

    private WritableArray convertToWritableArray(int[][] numberBoard, ReadableArray originalBoard) {
        WritableArray solvedBoard = new WritableNativeArray();
        for (int i = 0; i < 9; i++) {
            WritableArray row = new WritableNativeArray();
            for (int j = 0; j < 9; j++) {
                WritableMap cell = new WritableNativeMap();
                cell.putInt("value", numberBoard[i][j]);

                ReadableMap originalCell = originalBoard.getArray(i).getMap(j);
                cell.putBoolean("isGiven", originalCell.getBoolean("isGiven"));

                WritableArray draft = new WritableNativeArray();
                cell.putArray("draft", draft);

                row.pushMap(cell);
            }
            solvedBoard.pushArray(row);
        }
        return solvedBoard;
    }

    // 新增方法：比较两个解是否一致
    private boolean isSolutionsEqual(WritableArray solution1, WritableArray solution2) {
        for (int i = 0; i < 9; i++) {
            ReadableArray row1 = solution1.getArray(i);
            ReadableArray row2 = solution2.getArray(i);
            for (int j = 0; j < 9; j++) {
                ReadableMap cell1 = row1.getMap(j);
                ReadableMap cell2 = row2.getMap(j);
                if (cell1.getInt("value") != cell2.getInt("value")) {
                    return false;
                }
            }
        }
        return true;
    }
}