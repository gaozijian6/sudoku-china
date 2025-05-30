// 双全值坟墓算法
func binaryUniversalGrave(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  var target: [Int] = []
  var prompt: [Position] = []

  for row in 0..<9 {
    for col in 0..<9 {
      let cell = board[row][col]

      if cell.draft.count == 2 {
        let a = cell.draft[0]
        let b = cell.draft[1]

        let boxIndex = (row / 3) * 3 + (col / 3)

        let rowCount1 = candidateMap[a]?.row[row]?.count ?? 0
        let colCount1 = candidateMap[a]?.col[col]?.count ?? 0
        let boxCount1 = candidateMap[a]?.box[boxIndex]?.count ?? 0

        let rowCount2 = candidateMap[b]?.row[row]?.count ?? 0
        let colCount2 = candidateMap[b]?.col[col]?.count ?? 0
        let boxCount2 = candidateMap[b]?.box[boxIndex]?.count ?? 0

        // 如果两个候选数都是双双对对，则跳过
        if rowCount1 == 2 && colCount1 == 2 && boxCount1 == 2 && rowCount2 == 2 && colCount2 == 2
          && boxCount2 == 2
        {
          continue
        }
        // 如果a是双双对对，且b有至少一个三，则b是目标
        else if rowCount1 == 2 && colCount1 == 2 && boxCount1 == 2
          && (rowCount2 == 3 || colCount2 == 3 || boxCount2 == 3)
        {
          if !target.contains(b) {
            target.append(b)
          }
        }
        // 如果b是双双对对，且a有至少一个三，则a是目标
        else if rowCount2 == 2 && colCount2 == 2 && boxCount2 == 2
          && (rowCount1 == 3 || colCount1 == 3 || boxCount1 == 3)
        {
          if !target.contains(a) {
            target.append(a)
          }
        }
      }
      // 记录有3个候选数的格子
      else if cell.draft.count == 3 {
        prompt.append(Position(row: row, col: col))
        // 如果有两个以上三候选格，返回null
        if prompt.count == 2 {
          return nil
        }
      }
      // 如果有候选数>=4的格子，返回null
      else if cell.draft.count >= 4 {
        return nil
      }
    }
  }

  // 仅当有一个3候选格和一个目标数时才返回结果
  if prompt.count == 1 && target.count == 1 {
    return [
      "isFill": true,
      "position": [["row": prompt[0].row, "col": prompt[0].col]],
      "prompt": [["row": prompt[0].row, "col": prompt[0].col]],
      "method": SolutionMethods.BINARY_UNIVERSAL_GRAVE,
      "target": target,
    ]
  }

  return nil
}
