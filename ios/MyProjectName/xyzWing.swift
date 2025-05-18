// XYZ-Wing
func xyzWing(
    board: [[CellData]],
    candidateMap: CandidateMap,
    graph: Graph,
    hyperGraph: HyperGraph,
    globalNodeMap: GlobalNodeMap,
    answerBoard: [[CellData]]?
) -> [String: Any]? {
    // 遍历每个数字的候选位置
    for num in 1...9 {
        guard let candidates = candidateMap[num]?.all else { continue }
        
        // 遍历所有候选位置，寻找三个候选数的方格A
        for cellA in candidates {
            if cellA.candidates.count != 3 { continue }
            
            // 确保候选数顺序对应，x为当前遍历的数字num
            var x = num
            var y = 0
            var z = 0
            
            // 提取另外两个候选数并整理x,y,z顺序
            for candidate in cellA.candidates {
                if candidate != x {
                    if y == 0 {
                        y = candidate
                    } else {
                        z = candidate
                    }
                }
            }
            
            // 如果没有找到正确的候选数组合，跳过此单元格
            if y == 0 || z == 0 { continue }
            
            // 在A所在宫中寻找方格B
            let boxRow = cellA.row / 3
            let boxCol = cellA.col / 3
            let box = boxRow * 3 + boxCol
            
            guard let cellsInBox = candidateMap[x]?.box[box]?.positions else { continue }
            
            for cellB in cellsInBox {
                if cellB.row == cellA.row && cellB.col == cellA.col { continue }
                
                let cellBDraft = board[cellB.row][cellB.col].draft
                if cellBDraft.count != 2 { continue }
                
                // 检查B的候选数是否为xy或xz
                let hasXY = cellBDraft.contains(x) && cellBDraft.contains(y)
                let hasXZ = cellBDraft.contains(x) && cellBDraft.contains(z)
                
                if !hasXY && !hasXZ { continue }
                
                // 在A所在的行和列中寻找方格C
                var potentialCells: [Candidate] = []
                
                if let cellsInRow = candidateMap[x]?.row[cellA.row]?.positions {
                    potentialCells.append(contentsOf: cellsInRow)
                }
                
                if let cellsInCol = candidateMap[x]?.col[cellA.col]?.positions {
                    potentialCells.append(contentsOf: cellsInCol)
                }
                
                for cellC in potentialCells {
                    if (cellC.row == cellA.row && cellC.col == cellA.col) ||
                       (cellC.row == cellB.row && cellC.col == cellB.col) {
                        continue
                    }
                    
                    let cellCDraft = board[cellC.row][cellC.col].draft
                    if cellCDraft.count != 2 { continue }
                    
                    // 检查C的候选数是否为xy或xz，且与B不同
                    let hasCXY = cellCDraft.contains(x) && cellCDraft.contains(y)
                    let hasCXZ = cellCDraft.contains(x) && cellCDraft.contains(z)
                    
                    if (!hasCXY && !hasCXZ) || (hasCXY && hasXY) || (hasCXZ && hasXZ) { continue }
                    
                    // 寻找受影响的方格D
                    var affectedPositions: [Position] = []
                    
                    // 在A所在宫中寻找D
                    for row in (boxRow * 3)..<(boxRow * 3 + 3) {
                        for col in (boxCol * 3)..<(boxCol * 3 + 3) {
                            if (row == cellA.row && col == cellA.col) ||
                               (row == cellB.row && col == cellB.col) ||
                               (row == cellC.row && col == cellC.col) {
                                continue
                            }
                            
                            // D必须与A和C的共同行或列上
                            let isInSameLineWithAC = 
                                (row == cellA.row && row == cellC.row) ||
                                (col == cellA.col && col == cellC.col)
                            
                            if isInSameLineWithAC {
                                let cell = board[row][col]
                                if cell.value == nil && cell.draft.contains(x) {
                                    affectedPositions.append(Position(row: row, col: col))
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
                            "method": SolutionMethods.XYZ_WING,
                            "target": [x],
                            "isFill": false,
                            "row": cellA.row,
                            "col": cellA.col,
                            "box": (cellA.row / 3) * 3 + (cellA.col / 3)
                        ]
                    }
                }
            }
        }
    }
    
    return nil
}