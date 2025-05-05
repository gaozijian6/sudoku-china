// XY-Wing
func xyWing(
    board: [[CellData]],
    candidateMap: CandidateMap,
    graph: Graph
) -> [String: Any]? {
    // 找出所有只有两个候选数的格子
    var cellsWithTwoCandidates: [Position] = []
    for row in 0..<9 {
        for col in 0..<9 {
            let cell = board[row][col]
            if cell.value == nil && cell.draft.count == 2 {
                cellsWithTwoCandidates.append(Position(row: row, col: col))
            }
        }
    }
    
    // 检查两个格子是否在同一宫或行或列
    func areCellsInSameUnit(cell1: Position, cell2: Position) -> Bool {
        return cell1.row == cell2.row || 
               cell1.col == cell2.col || 
               (cell1.row / 3 == cell2.row / 3 && 
                cell1.col / 3 == cell2.col / 3)
    }
    
    // 遍历所有可能的 XY-Wing 组合
    for i in 0..<cellsWithTwoCandidates.count {
        let cellA = cellsWithTwoCandidates[i]
        let candidatesA = board[cellA.row][cellA.col].draft
        
        for j in 0..<cellsWithTwoCandidates.count {
            if i == j { continue }
            let cellB = cellsWithTwoCandidates[j]
            let candidatesB = board[cellB.row][cellB.col].draft
            
            for k in 0..<cellsWithTwoCandidates.count {
                if k == i || k == j { continue }
                let cellC = cellsWithTwoCandidates[k]
                let candidatesC = board[cellC.row][cellC.col].draft
                
                // 情况1: A是中央格
                if areCellsInSameUnit(cell1: cellA, cell2: cellB) && 
                   areCellsInSameUnit(cell1: cellA, cell2: cellC) && 
                   !areCellsInSameUnit(cell1: cellB, cell2: cellC) {
                    
                    // 检查候选数是否符合 XY-Wing 模式
                    let commonCandidateBC = candidatesB.first { candidatesC.contains($0) }
                    let commonCandidateAC = candidatesA.first { candidatesC.contains($0) }
                    let commonCandidateAB = candidatesA.first { candidatesB.contains($0) }
                    
                    if commonCandidateBC == nil || commonCandidateAC == nil || commonCandidateAB == nil {
                        continue
                    }
                    
                    if Set([commonCandidateBC!, commonCandidateAC!, commonCandidateAB!]).count != 3 {
                        continue
                    }
                    
                    // 找到符合条件的 XY-Wing
                    let targetNumber = commonCandidateBC!
                    var affectedPositions: [Position] = []
                    
                    // 检查与 B 和 C 在同一单元的格子
                    for row in 0..<9 {
                        for col in 0..<9 {
                            if (row == cellB.row && col == cellB.col) || 
                               (row == cellC.row && col == cellC.col) {
                                continue
                            }
                            
                            let pos = Position(row: row, col: col)
                            let isInSameUnitWithB = areCellsInSameUnit(cell1: cellB, cell2: pos)
                            let isInSameUnitWithC = areCellsInSameUnit(cell1: cellC, cell2: pos)
                            
                            if isInSameUnitWithB && isInSameUnitWithC {
                                let cell = board[row][col]
                                if cell.value == nil && cell.draft.contains(targetNumber) {
                                    affectedPositions.append(pos)
                                }
                            }
                        }
                    }
                    
                    if !affectedPositions.isEmpty {
                        return [
                            "position": affectedPositions.map { ["row": $0.row, "col": $0.col] },
                            "prompt": [
                                ["row": cellA.row, "col": cellA.col],
                                ["row": cellB.row, "col": cellB.col],
                                ["row": cellC.row, "col": cellC.col]
                            ],
                            "method": SolutionMethods.XY_WING,
                            "target": [targetNumber],
                            "isFill": false,
                            "row": cellA.row,
                            "col": cellA.col,
                            "box": (cellA.row / 3) * 3 + (cellA.col / 3)
                        ]
                    }
                    
                // 情况2: B是中央格
                } else if areCellsInSameUnit(cell1: cellB, cell2: cellA) && 
                          areCellsInSameUnit(cell1: cellB, cell2: cellC) && 
                          !areCellsInSameUnit(cell1: cellA, cell2: cellC) {
                    
                    // 检查候选数是否符合 XY-Wing 模式
                    let commonCandidateAC = candidatesA.first { candidatesC.contains($0) }
                    let commonCandidateBA = candidatesB.first { candidatesA.contains($0) }
                    let commonCandidateBC = candidatesB.first { candidatesC.contains($0) }
                    
                    if commonCandidateAC == nil || commonCandidateBA == nil || commonCandidateBC == nil {
                        continue
                    }
                    
                    if Set([commonCandidateAC!, commonCandidateBA!, commonCandidateBC!]).count != 3 {
                        continue
                    }
                    
                    // 找到符合条件的 XY-Wing
                    let targetNumber = commonCandidateAC!
                    var affectedPositions: [Position] = []
                    
                    // 检查与 A 和 C 在同一单元的格子
                    for row in 0..<9 {
                        for col in 0..<9 {
                            if (row == cellA.row && col == cellA.col) || 
                               (row == cellC.row && col == cellC.col) {
                                continue
                            }
                            
                            let pos = Position(row: row, col: col)
                            let isInSameUnitWithA = areCellsInSameUnit(cell1: cellA, cell2: pos)
                            let isInSameUnitWithC = areCellsInSameUnit(cell1: cellC, cell2: pos)
                            
                            if isInSameUnitWithA && isInSameUnitWithC {
                                let cell = board[row][col]
                                if cell.value == nil && cell.draft.contains(targetNumber) {
                                    affectedPositions.append(pos)
                                }
                            }
                        }
                    }
                    
                    if !affectedPositions.isEmpty {
                        return [
                            "position": affectedPositions.map { ["row": $0.row, "col": $0.col] },
                            "prompt": [
                                ["row": cellB.row, "col": cellB.col],
                                ["row": cellA.row, "col": cellA.col],
                                ["row": cellC.row, "col": cellC.col]
                            ],
                            "method": SolutionMethods.XY_WING,
                            "target": [targetNumber],
                            "isFill": false,
                            "row": cellB.row,
                            "col": cellB.col,
                            "box": (cellB.row / 3) * 3 + (cellB.col / 3)
                        ]
                    }
                    
                // 情况3: C是中央格
                } else if areCellsInSameUnit(cell1: cellC, cell2: cellA) && 
                          areCellsInSameUnit(cell1: cellC, cell2: cellB) && 
                          !areCellsInSameUnit(cell1: cellA, cell2: cellB) {
                    
                    // 检查候选数是否符合 XY-Wing 模式
                    let commonCandidateAB = candidatesA.first { candidatesB.contains($0) }
                    let commonCandidateCA = candidatesC.first { candidatesA.contains($0) }
                    let commonCandidateCB = candidatesC.first { candidatesB.contains($0) }
                    
                    if commonCandidateAB == nil || commonCandidateCA == nil || commonCandidateCB == nil {
                        continue
                    }
                    
                    if Set([commonCandidateAB!, commonCandidateCA!, commonCandidateCB!]).count != 3 {
                        continue
                    }
                    
                    // 找到符合条件的 XY-Wing
                    let targetNumber = commonCandidateAB!
                    var affectedPositions: [Position] = []
                    
                    // 检查与 A 和 B 在同一单元的格子
                    for row in 0..<9 {
                        for col in 0..<9 {
                            if (row == cellA.row && col == cellA.col) || 
                               (row == cellB.row && col == cellB.col) {
                                continue
                            }
                            
                            let pos = Position(row: row, col: col)
                            let isInSameUnitWithA = areCellsInSameUnit(cell1: cellA, cell2: pos)
                            let isInSameUnitWithB = areCellsInSameUnit(cell1: cellB, cell2: pos)
                            
                            if isInSameUnitWithA && isInSameUnitWithB {
                                let cell = board[row][col]
                                if cell.value == nil && cell.draft.contains(targetNumber) {
                                    affectedPositions.append(pos)
                                }
                            }
                        }
                    }
                    
                    if !affectedPositions.isEmpty {
                        return [
                            "position": affectedPositions.map { ["row": $0.row, "col": $0.col] },
                            "prompt": [
                                ["row": cellC.row, "col": cellC.col],
                                ["row": cellA.row, "col": cellA.col],
                                ["row": cellB.row, "col": cellB.col]
                            ],
                            "method": SolutionMethods.XY_WING,
                            "target": [targetNumber],
                            "isFill": false,
                            "row": cellC.row,
                            "col": cellC.col,
                            "box": (cellC.row / 3) * 3 + (cellC.col / 3)
                        ]
                    }
                }
            }
        }
    }
    
    return nil
}