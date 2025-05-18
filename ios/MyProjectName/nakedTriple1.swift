// 显性三数组法 1
func nakedTriple1(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 检查行
  if let rowResult = checkNakedTriple1(board: board, unitType: "row") {
    return rowResult
  }

  // 检查列
  if let colResult = checkNakedTriple1(board: board, unitType: "col") {
    return colResult
  }

  // 检查宫
  if let boxResult = checkNakedTriple1(board: board, unitType: "box") {
    return boxResult
  }

  return nil
}

func checkNakedTriple1(board: [[CellData]], unitType: String) -> [String: Any]? {
  for unit in 0..<9 {
    var cellsWithCandidates: [(pos: Position, candidates: [Int])] = []

    // 收集单元内的候选数和位置
    for i in 0..<9 {
      let row: Int
      let col: Int

      switch unitType {
      case "row":
        row = unit
        col = i
      case "col":
        row = i
        col = unit
      case "box":
        row = (unit / 3) * 3 + (i / 3)
        col = (unit % 3) * 3 + (i % 3)
      default:
        continue
      }

      let cell = board[row][col]
      if cell.value == nil && cell.draft.count >= 2 && cell.draft.count <= 3 {
        cellsWithCandidates.append((pos: Position(row: row, col: col), candidates: cell.draft))
      }
    }

    // 如果没有足够的单元格进行三元组检查，则跳过当前单元
    if cellsWithCandidates.count < 3 {
      continue  // 跳到下一个unit
    }

    // 检查所有可能的三个格子组合
    for i in 0..<(cellsWithCandidates.count - 2) {
      for j in (i + 1)..<(cellsWithCandidates.count - 1) {
        for k in (j + 1)..<cellsWithCandidates.count {
          let cellA = cellsWithCandidates[i]
          let cellB = cellsWithCandidates[j]
          let cellC = cellsWithCandidates[k]

          // 获取所有唯一的候选数
          var uniqueCandidates = Set<Int>()
          for num in cellA.candidates { uniqueCandidates.insert(num) }
          for num in cellB.candidates { uniqueCandidates.insert(num) }
          for num in cellC.candidates { uniqueCandidates.insert(num) }

          if uniqueCandidates.count == 3 {
            let candidatesArray = Array(uniqueCandidates)
            let a = candidatesArray[0]
            let b = candidatesArray[1]
            let c = candidatesArray[2]

            // 检查是否满足显性三数对法1的条件
            let hasThreeCandidates =
              cellA.candidates.count == 3 || cellB.candidates.count == 3
              || cellC.candidates.count == 3

            // 检查是否有两个不同的对
            let hasTwoDifferentPairs =
              (cellA.candidates.count == 2 && cellB.candidates.count == 2
                && !cellA.candidates.allSatisfy { cellB.candidates.contains($0) })
              || (cellA.candidates.count == 2 && cellC.candidates.count == 2
                && !cellA.candidates.allSatisfy { cellC.candidates.contains($0) })
              || (cellB.candidates.count == 2 && cellC.candidates.count == 2
                && !cellB.candidates.allSatisfy { cellC.candidates.contains($0) })

            // 三个候选方格里都只有abc候选数
            let allHaveThreeCandidates =
              cellA.candidates.count == 3 && cellB.candidates.count == 3
              && cellC.candidates.count == 3
              && cellA.candidates.allSatisfy { uniqueCandidates.contains($0) }
              && cellB.candidates.allSatisfy { uniqueCandidates.contains($0) }
              && cellC.candidates.allSatisfy { uniqueCandidates.contains($0) }

            // 新增条件：两个候选方格有abc候选数，另一个有其中两个
            let twoFullOnePartial =
              (cellA.candidates.count == 3 && cellB.candidates.count == 3
                && cellC.candidates.count == 2
                && cellC.candidates.allSatisfy { uniqueCandidates.contains($0) })
              || (cellA.candidates.count == 3 && cellC.candidates.count == 3
                && cellB.candidates.count == 2
                && cellB.candidates.allSatisfy { uniqueCandidates.contains($0) })
              || (cellB.candidates.count == 3 && cellC.candidates.count == 3
                && cellA.candidates.count == 2
                && cellA.candidates.allSatisfy { uniqueCandidates.contains($0) })

            if (hasThreeCandidates && hasTwoDifferentPairs) || allHaveThreeCandidates
              || twoFullOnePartial
            {

              var affectedPositions: [Position] = []
              let prompt: [Position] = [cellA.pos, cellB.pos, cellC.pos]

              // 检查其他格子是否受影响
              for m in 0..<9 {
                let row: Int
                let col: Int

                switch unitType {
                case "row":
                  row = unit
                  col = m
                case "col":
                  row = m
                  col = unit
                case "box":
                  row = (unit / 3) * 3 + (m / 3)
                  col = (unit % 3) * 3 + (m % 3)
                default:
                  continue
                }

                let cell = board[row][col]
                if cell.value == nil && !prompt.contains(where: { $0.row == row && $0.col == col })
                  && cell.draft.contains(where: { [a, b, c].contains($0) })
                {
                  affectedPositions.append(Position(row: row, col: col))
                }
              }

              if !affectedPositions.isEmpty {
                var method = ""

                switch unitType {
                case "row":
                  method = SolutionMethods.NAKED_TRIPLE_ROW1
                case "col":
                  method = SolutionMethods.NAKED_TRIPLE_COLUMN1
                case "box":
                  method = SolutionMethods.NAKED_TRIPLE_BOX1
                default:
                  method = "Unknown"
                }

                return [
                  "position": affectedPositions.map { ["row": $0.row, "col": $0.col] },
                  "prompt": prompt.map { ["row": $0.row, "col": $0.col] },
                  "method": method,
                  "target": Array(uniqueCandidates),
                  "isFill": false,
                  "row": cellA.pos.row,
                  "col": cellA.pos.col,
                  "box": (cellA.pos.row / 3) * 3 + (cellA.pos.col / 3),
                ]
              }
            }
          }
        }
      }
    }
  }

  return nil
}
