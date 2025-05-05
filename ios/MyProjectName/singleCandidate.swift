// 唯一余数法
func singleCandidate(
    board: [[CellData]],
    candidateMap: CandidateMap,
    graph: Graph
) -> [String: Any]? {
    for row in 0..<9 {
        for col in 0..<9 {
            if board[row][col].value == nil && board[row][col].draft.count == 1 {
                // 创建结果
                let resultDict: [String: Any] = [
                    "isFill": true,
                    "position": [["row": row, "col": col]],
                    "prompt": [["row": row, "col": col]],
                    "method": SolutionMethods.SINGLE_CANDIDATE,
                    "target": [board[row][col].draft[0]]
                ]
                
                return resultDict
            }
        }
    }
    
    return nil
}