// 显性对
func nakedPair(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 遍历所有数字的候选位置
  for num in 1...9 {
    guard let candidates = candidateMap[num]?.all else { continue }

    // 找到只有两个候选数的方格
    let pairCandidates = candidates.filter { $0.candidates.count == 2 }

    for cell1 in pairCandidates {
      if cell1.candidates.count != 2 { continue }

      let num1 = cell1.candidates[0]
      let num2 = cell1.candidates[1]

      // 检查行、列、宫
      let units: [(type: String, value: Int)] = [
        (type: "row", value: cell1.row),
        (type: "col", value: cell1.col),
        (type: "box", value: (cell1.row / 3) * 3 + (cell1.col / 3)),
      ]

      for unit in units {
        var unitCells: [Candidate] = []

        switch unit.type {
        case "row":
          unitCells = candidateMap[num]?.row[unit.value]?.positions ?? []
        case "col":
          unitCells = candidateMap[num]?.col[unit.value]?.positions ?? []
        case "box":
          unitCells = candidateMap[num]?.box[unit.value]?.positions ?? []
        default:
          continue
        }

        // 在同一单元中找到另一个具有相同候选数的方格
        if let cell2 = unitCells.first(where: { c in
          (c.row != cell1.row || c.col != cell1.col) && c.candidates.count == 2
            && c.candidates.contains(num1) && c.candidates.contains(num2)
        }) {
          // 找到受影响的方格
          var affectedCells: [Candidate] = []

          for i in 0..<9 {
            for j in 0..<9 {
              if (i != cell1.row || j != cell1.col) && (i != cell2.row || j != cell2.col)
                && ((unit.type == "row" && i == cell1.row) || (unit.type == "col" && j == cell1.col)
                  || (unit.type == "box" && i / 3 == cell1.row / 3 && j / 3 == cell1.col / 3))
              {

                let cell = board[i][j]
                if cell.value == nil && (cell.draft.contains(num1) || cell.draft.contains(num2)) {
                  affectedCells.append(
                    Candidate(
                      row: i,
                      col: j,
                      candidates: cell.draft
                    ))
                }
              }
            }
          }

          if !affectedCells.isEmpty {
            let position = affectedCells.map { ["row": $0.row, "col": $0.col] }
            let prompt = [
              ["row": cell1.row, "col": cell1.col],
              ["row": cell2.row, "col": cell2.col],
            ]

            var method = ""
            switch unit.type {
            case "row":
              method = SolutionMethods.NAKED_PAIR_ROW
            case "col":
              method = SolutionMethods.NAKED_PAIR_COLUMN
            case "box":
              method = SolutionMethods.NAKED_PAIR_BOX
            default:
              method = "Unknown"
            }

            let target = [num1, num2]

            return [
              "position": position,
              "prompt": prompt,
              "method": method,
              "target": target,
              "isFill": false,
              "row": cell1.row,
              "col": cell1.col,
              "box": (cell1.row / 3) * 3 + (cell1.col / 3),
            ]
          }
        }
      }
    }
  }

  return nil
}
