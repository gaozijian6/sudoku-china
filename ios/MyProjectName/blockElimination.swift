// 区块摒除法
func blockElimination(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 检查每个3x3宫格
  for boxRow in 0..<3 {
    for boxCol in 0..<3 {
      var boxCandidates: [Int: [[String: Int]]] = [:]

      // 收集宫内每个数字的候选位置
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

      // 检查每个候选数字
      for (numStr, cells) in boxCandidates {
        let num = numStr

        // 提取所有行和列
        let rows = Set(cells.compactMap { $0["row"] })
        let cols = Set(cells.compactMap { $0["col"] })

        // 区块摒除法（行）
        if rows.count == 1 {
          guard let targetRow = rows.first else { continue }
          var positionsToRemove: [[String: Int]] = []

          for i in 0..<9 {
            if i / 3 != boxCol {
              if board[targetRow][i].value == nil && board[targetRow][i].draft.contains(num) {
                positionsToRemove.append(["row": targetRow, "col": i])
              }
            }
          }

          if !positionsToRemove.isEmpty {
            return [
              "isFill": false,
              "position": positionsToRemove,
              "prompt": cells,
              "method": SolutionMethods.BLOCK_ELIMINATION_ROW,
              "target": [num],
              "row": cells[0]["row"],
            ]
          }
        }

        // 区块摒除法（列）
        if cols.count == 1 {
          guard let targetCol = cols.first else { continue }
          var positionsToRemove: [[String: Int]] = []

          for i in 0..<9 {
            if i / 3 != boxRow {
              if board[i][targetCol].value == nil && board[i][targetCol].draft.contains(num) {
                positionsToRemove.append(["row": i, "col": targetCol])
              }
            }
          }

          if !positionsToRemove.isEmpty {
            return [
              "isFill": false,
              "position": positionsToRemove,
              "prompt": cells,
              "method": SolutionMethods.BLOCK_ELIMINATION_COLUMN,
              "target": [num],
              "col": cells[0]["col"],
            ]
          }
        }
      }
    }
  }

  // 检查每一行
  for row in 0..<9 {
    var rowCandidates: [Int: [[String: Int]]] = [:]

    for col in 0..<9 {
      if board[row][col].value == nil {
        for num in board[row][col].draft {
          if rowCandidates[num] == nil {
            rowCandidates[num] = []
          }
          rowCandidates[num]?.append(["col": col])
        }
      }
    }

    for (numStr, cells) in rowCandidates {
      let num = numStr

      if cells.count >= 2 && cells.count <= 3 {
        guard let firstCol = cells[0]["col"] else { continue }
        let boxCol = firstCol / 3

        // 检查所有单元格是否在同一个小宫格内
        if cells.allSatisfy({ ($0["col"] ?? 0) / 3 == boxCol }) {
          var positionsToRemove: [[String: Int]] = []

          for i in 0..<3 {
            for j in 0..<3 {
              let checkRow = (row / 3) * 3 + i
              let checkCol = boxCol * 3 + j

              if checkRow != row {
                if board[checkRow][checkCol].value == nil
                  && board[checkRow][checkCol].draft.contains(num)
                {
                  positionsToRemove.append(["row": checkRow, "col": checkCol])
                }
              }
            }
          }

          if !positionsToRemove.isEmpty {
            var prompt: [[String: Int]] = []
            for cell in cells {
              if let col = cell["col"] {
                prompt.append(["row": row, "col": col])
              }
            }

            return [
              "isFill": false,
              "position": positionsToRemove,
              "prompt": prompt,
              "method": SolutionMethods.BLOCK_ELIMINATION_BOX_ROW,
              "target": [num],
              "row": row,
            ]
          }
        }
      }
    }
  }

  // 检查每一列
  for col in 0..<9 {
    var colCandidates: [Int: [[String: Int]]] = [:]

    for row in 0..<9 {
      if board[row][col].value == nil {
        for num in board[row][col].draft {
          if colCandidates[num] == nil {
            colCandidates[num] = []
          }
          colCandidates[num]?.append(["row": row])
        }
      }
    }

    for (numStr, cells) in colCandidates {
      let num = numStr

      if cells.count >= 2 && cells.count <= 3 {
        guard let firstRow = cells[0]["row"] else { continue }
        let boxRow = firstRow / 3

        // 检查所有单元格是否在同一个小宫格内
        if cells.allSatisfy({ ($0["row"] ?? 0) / 3 == boxRow }) {
          var positionsToRemove: [[String: Int]] = []

          for i in 0..<3 {
            for j in 0..<3 {
              let checkRow = boxRow * 3 + i
              let checkCol = (col / 3) * 3 + j

              if checkCol != col {
                if board[checkRow][checkCol].value == nil
                  && board[checkRow][checkCol].draft.contains(num)
                {
                  positionsToRemove.append(["row": checkRow, "col": checkCol])
                }
              }
            }
          }

          if !positionsToRemove.isEmpty {
            var prompt: [[String: Int]] = []
            for cell in cells {
              if let row = cell["row"] {
                prompt.append(["row": row, "col": col])
              }
            }

            return [
              "isFill": false,
              "position": positionsToRemove,
              "prompt": prompt,
              "method": SolutionMethods.BLOCK_ELIMINATION_BOX_COLUMN,
              "target": [num],
              "col": col,
            ]
          }
        }
      }
    }
  }

  return nil
}
