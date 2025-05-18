// X-Wing
func xWing(
    board: [[CellData]],
    candidateMap: CandidateMap,
    graph: Graph,
    hyperGraph: HyperGraph,
    globalNodeMap: GlobalNodeMap,
    answerBoard: [[CellData]]?
) -> [String: Any]? {
    // 检查行
    if let rowResult = checkXWing(board: board, isRow: true) {
        return rowResult
    }
    
    // 检查列
    if let colResult = checkXWing(board: board, isRow: false) {
        return colResult
    }
    
    return nil
}

func checkXWing(board: [[CellData]], isRow: Bool) -> [String: Any]? {
    for num in 1...9 {
        var candidatePositions: [[Position]] = []
        
        for i in 0..<9 {
            var positions: [Position] = []
            for j in 0..<9 {
                let row = isRow ? i : j
                let col = isRow ? j : i
                let cell = board[row][col]
                
                if cell.value == nil && cell.draft.contains(num) {
                    positions.append(Position(row: row, col: col))
                }
            }
            
            if positions.count == 2 {
                candidatePositions.append(positions)
            }
        }
        
        if candidatePositions.count >= 2 {
            for i in 0..<(candidatePositions.count - 1) {
                for j in (i + 1)..<candidatePositions.count {
                    let pos1 = candidatePositions[i][0]
                    let pos2 = candidatePositions[i][1]
                    let pos3 = candidatePositions[j][0]
                    let pos4 = candidatePositions[j][1]
                    
                    let index = isRow ? "col" : "row"
                    if (isRow && pos1.col == pos3.col && pos2.col == pos4.col) ||
                       (!isRow && pos1.row == pos3.row && pos2.row == pos4.row) {
                        var affectedPositions: [Position] = []
                        
                        for k in 0..<9 {
                            if isRow {
                                if k != pos1.row && k != pos3.row {
                                    let checkPos1 = Position(row: k, col: pos1.col)
                                    let checkPos2 = Position(row: k, col: pos2.col)
                                    
                                    let cell1 = board[checkPos1.row][checkPos1.col]
                                    let cell2 = board[checkPos2.row][checkPos2.col]
                                    
                                    if cell1.value == nil && cell1.draft.contains(num) {
                                        affectedPositions.append(checkPos1)
                                    }
                                    if cell2.value == nil && cell2.draft.contains(num) {
                                        affectedPositions.append(checkPos2)
                                    }
                                }
                            } else {
                                if k != pos1.col && k != pos3.col {
                                    let checkPos1 = Position(row: pos1.row, col: k)
                                    let checkPos2 = Position(row: pos2.row, col: k)
                                    
                                    let cell1 = board[checkPos1.row][checkPos1.col]
                                    let cell2 = board[checkPos2.row][checkPos2.col]
                                    
                                    if cell1.value == nil && cell1.draft.contains(num) {
                                        affectedPositions.append(checkPos1)
                                    }
                                    if cell2.value == nil && cell2.draft.contains(num) {
                                        affectedPositions.append(checkPos2)
                                    }
                                }
                            }
                        }
                        
                        if !affectedPositions.isEmpty {
                            return [
                                "position": affectedPositions.map { ["row": $0.row, "col": $0.col] },
                                "prompt": [
                                    ["row": pos1.row, "col": pos1.col],
                                    ["row": pos2.row, "col": pos2.col],
                                    ["row": pos3.row, "col": pos3.col],
                                    ["row": pos4.row, "col": pos4.col]
                                ],
                                "method": isRow ? SolutionMethods.X_WING_ROW : SolutionMethods.X_WING_COLUMN,
                                "target": [num],
                                "isFill": false,
                                "rows": [pos1.row, pos3.row],
                                "cols": [pos1.col, pos3.col]
                            ]
                        }
                    }
                }
            }
        }
    }
    
    return nil
}