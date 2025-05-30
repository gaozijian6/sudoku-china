// 隐性唯一法
func hiddenSingle(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 检查每一行
  for row in 0..<9 {
    var rowCandidates: [Int: [Int]] = [:]
    for col in 0..<9 {
      if board[row][col].value == nil {
        for num in board[row][col].draft {
          if rowCandidates[num] == nil {
            rowCandidates[num] = []
          }
          rowCandidates[num]?.append(col)
        }
      }
    }

    for (num, cols) in rowCandidates {
      if cols.count == 1 {
        return [
          "isFill": true,
          "position": [["row": row, "col": cols[0]]],
          "prompt": cols.map { ["row": row, "col": $0] },
          "method": SolutionMethods.HIDDEN_SINGLE_ROW,
          "target": [num],
        ]
      }
    }
  }

  // 检查每一列
  for col in 0..<9 {
    var colCandidates: [Int: [Int]] = [:]
    for row in 0..<9 {
      if board[row][col].value == nil {
        for num in board[row][col].draft {
          if colCandidates[num] == nil {
            colCandidates[num] = []
          }
          colCandidates[num]?.append(row)
        }
      }
    }

    for (num, rows) in colCandidates {
      if rows.count == 1 {
        return [
          "isFill": true,
          "position": [["row": rows[0], "col": col]],
          "prompt": rows.map { ["row": $0, "col": col] },
          "method": SolutionMethods.HIDDEN_SINGLE_COLUMN,
          "target": [num],
        ]
      }
    }
  }

  // 检查每一宫
  for boxRow in 0..<3 {
    for boxCol in 0..<3 {
      var boxCandidates: [Int: [[String: Int]]] = [:]

      for i in 0..<3 {
        for j in 0..<3 {
          let row = boxRow * 3 + i
          let col = boxCol * 3 + j

          if board[row][col].value == nil {
            for num in board[row][col].draft {
              if boxCandidates[num] == nil {
                boxCandidates[num] = []
              }
              boxCandidates[num]?.append(["row": row, "col": col])
            }
          }
        }
      }

      for (num, cells) in boxCandidates {
        if cells.count == 1 {
          guard let cellRow = cells[0]["row"], let cellCol = cells[0]["col"] else {
            continue
          }

          return [
            "isFill": true,
            "position": [["row": cellRow, "col": cellCol]],
            "prompt": cells,
            "method": SolutionMethods.HIDDEN_SINGLE_BOX,
            "target": [num],
          ]
        }
      }
    }
  }

  return nil
}
