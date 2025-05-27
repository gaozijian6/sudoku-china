// 二阶退化鱼
func xWingVarient(
    board: [[CellData]],
    candidateMap: CandidateMap,
    graph: Graph,
    hyperGraph: HyperGraph,
    globalNodeMap: GlobalNodeMap,
    answerBoard: [[CellData]]?
) -> [String: Any]? {
    // 检查行
    if let rowResult = checkXWingVarient(board: board, candidateMap: candidateMap, isRow: true) {
        return rowResult
    }
    
    // 检查列
    if let colResult = checkXWingVarient(board: board, candidateMap: candidateMap, isRow: false) {
        return colResult
    }
    
    return nil
}

func checkXWingVarient(
    board: [[CellData]],
    candidateMap: CandidateMap,
    isRow: Bool
) -> [String: Any]? {
    for num in 1...9 {
        for i in 0..<9 {
            var positions: [Candidate] = []
            
            if isRow {
                positions = candidateMap[num]?.row[i]?.positions ?? []
            } else {
                positions = candidateMap[num]?.col[i]?.positions ?? []
            }
            
            if positions.count == 2 {
                let posA = positions[0]
                let posB = positions[1]
                
                for j in 0..<9 {
                    if j == i { continue }
                    
                    var otherPositions: [Candidate] = []
                    
                    if isRow {
                        otherPositions = candidateMap[num]?.row[j]?.positions ?? []
                    } else {
                        otherPositions = candidateMap[num]?.col[j]?.positions ?? []
                    }
                    
                    if otherPositions.count == 3 || otherPositions.count == 4 {
                        // 找到与A或B在同一列/行的位置C
                        let posC = otherPositions.first { pos in
                            isRow ? (pos.col == posA.col || pos.col == posB.col) : (pos.row == posA.row || pos.row == posB.row)
                        }
                        
                        if let posC = posC {
                            // 获取剩余的位置
                            let groupD = otherPositions.filter { pos in
                                !(pos.row == posC.row && pos.col == posC.col)
                            }
                            
                            // 检查groupD是否在同一个宫内
                            let isGroupDInSameBox = groupD.allSatisfy { pos in
                                pos.row / 3 == groupD[0].row / 3 && pos.col / 3 == groupD[0].col / 3
                            }
                            
                            let dBoxCol = groupD[0].col / 3
                            let dBoxRow = groupD[0].row / 3
                            let aBoxCol = posA.col / 3
                            let aBoxRow = posA.row / 3
                            let bBoxCol = posB.col / 3
                            let bBoxRow = posB.row / 3
                            
                            let isDInSameBoxWithAB = isRow ? 
                                (dBoxCol == aBoxCol || dBoxCol == bBoxCol) : 
                                (dBoxRow == aBoxRow || dBoxRow == bBoxRow)
                            
                            if !isDInSameBoxWithAB { continue }
                            
                            if isGroupDInSameBox {
                                let abInSameBox = posA.row / 3 == posB.row / 3 && posA.col / 3 == posB.col / 3
                                
                                let cdBoxRow = groupD[0].row / 3
                                let cdBoxCol = groupD[0].col / 3
                                
                                var positionsToExclude: [Position] = []
                                
                                // 判断是否是ABCD之一
                                func isNotABCD(r: Int, c: Int) -> Bool {
                                    return !(r == posA.row && c == posA.col) &&
                                           !(r == posB.row && c == posB.col) &&
                                           !(r == posC.row && c == posC.col) &&
                                           !groupD.contains { pos in pos.row == r && pos.col == c }
                                }
                                
                                if abInSameBox {
                                    // AB 在同一宫，排除 CD 所属宫内其他方格
                                    for r in (cdBoxRow * 3)..<(cdBoxRow * 3 + 3) {
                                        for c in (cdBoxCol * 3)..<(cdBoxCol * 3 + 3) {
                                            if isNotABCD(r: r, c: c) && board[r][c].draft.contains(num) {
                                                positionsToExclude.append(Position(row: r, col: c))
                                            }
                                        }
                                    }
                                } else {
                                    // AB 不在同一宫
                                    if isRow {
                                        let targetCol = posC.col == posA.col ? posB.col : posA.col
                                        for r in (cdBoxRow * 3)..<(cdBoxRow * 3 + 3) {
                                            if isNotABCD(r: r, c: targetCol) && board[r][targetCol].draft.contains(num) {
                                                positionsToExclude.append(Position(row: r, col: targetCol))
                                            }
                                        }
                                    } else {
                                        let targetRow = posC.row == posA.row ? posB.row : posA.row
                                        for c in (cdBoxCol * 3)..<(cdBoxCol * 3 + 3) {
                                            if isNotABCD(r: targetRow, c: c) && board[targetRow][c].draft.contains(num) {
                                                positionsToExclude.append(Position(row: targetRow, col: c))
                                            }
                                        }
                                    }
                                }
                                
                                if !positionsToExclude.isEmpty &&
                                   groupD[0].row / 3 == positionsToExclude[0].row / 3 &&
                                   groupD[0].col / 3 == positionsToExclude[0].col / 3 {
                                    
                                    var promptPositions: [Position] = [
                                        Position(row: posA.row, col: posA.col),
                                        Position(row: posB.row, col: posB.col),
                                        Position(row: posC.row, col: posC.col)
                                    ]
                                    
                                    for d in groupD {
                                        promptPositions.append(Position(row: d.row, col: d.col))
                                    }
                                    
                                    return [
                                        "position": positionsToExclude.map { ["row": $0.row, "col": $0.col] },
                                        "prompt": promptPositions.map { ["row": $0.row, "col": $0.col] },
                                        "method": isRow ? SolutionMethods.X_WING_VARIENT_ROW : SolutionMethods.X_WING_VARIENT_COLUMN,
                                        "target": [num],
                                        "isFill": false,
                                        "rows": [posA.row, posC.row],
                                        "cols": [posA.col, posC.col]
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    return nil
}