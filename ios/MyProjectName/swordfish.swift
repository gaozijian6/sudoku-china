// 剑鱼算法
func swordfish(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  for num in 1...9 {
    // 行版本的剑鱼
    do {
      var rowArray: [(row: Int, positions: [Candidate])] = []

      for row in 0..<9 {
        if let rowStats = candidateMap[num]?.row[row],
          rowStats.positions.count == 2 || rowStats.positions.count == 3
        {
          rowArray.append((row: row, positions: rowStats.positions))
        }
      }

      if rowArray.count >= 3 {
        for i in 0..<(rowArray.count - 2) {
          for j in (i + 1)..<(rowArray.count - 1) {
            for k in (j + 1)..<rowArray.count {
              let positions1 = rowArray[i].positions
              let positions2 = rowArray[j].positions
              let positions3 = rowArray[k].positions

              let row1 = rowArray[i].row
              let row2 = rowArray[j].row
              let row3 = rowArray[k].row

              let allPositions = positions1 + positions2 + positions3
              let allCols = allPositions.map { $0.col }
              let uniqueCols = Set(allCols)

              if uniqueCols.count == 3 {
                var deletedPositions: [Candidate] = []

                for col in uniqueCols {
                  if let positions = candidateMap[num]?.col[col]?.positions {
                    for pos in positions {
                      if ![row1, row2, row3].contains(pos.row) {
                        deletedPositions.append(pos)
                      }
                    }
                  }
                }

                if !deletedPositions.isEmpty {
                  var positionDicts = [[String: Int]]()
                  for pos in deletedPositions {
                    positionDicts.append(["row": pos.row, "col": pos.col])
                  }

                  var promptDicts = [[String: Int]]()
                  for pos in allPositions {
                    promptDicts.append(["row": pos.row, "col": pos.col])
                  }

                  return [
                    "isFill": false,
                    "position": positionDicts,
                    "prompt": promptDicts,
                    "method": SolutionMethods.SWORDFISH_ROW,
                    "target": [num],
                  ]
                }
              }
            }
          }
        }
      }
    }

    // 列版本的剑鱼
    do {
      var colArray: [(col: Int, positions: [Candidate])] = []

      for col in 0..<9 {
        if let colStats = candidateMap[num]?.col[col],
          colStats.positions.count == 2 || colStats.positions.count == 3
        {
          colArray.append((col: col, positions: colStats.positions))
        }
      }

      if colArray.count >= 3 {
        for i in 0..<(colArray.count - 2) {
          for j in (i + 1)..<(colArray.count - 1) {
            for k in (j + 1)..<colArray.count {
              let positions1 = colArray[i].positions
              let positions2 = colArray[j].positions
              let positions3 = colArray[k].positions

              let col1 = colArray[i].col
              let col2 = colArray[j].col
              let col3 = colArray[k].col

              let allPositions = positions1 + positions2 + positions3
              let allRows = allPositions.map { $0.row }
              let uniqueRows = Set(allRows)

              if uniqueRows.count == 3 {
                var deletedPositions: [Candidate] = []

                for row in uniqueRows {
                  if let positions = candidateMap[num]?.row[row]?.positions {
                    for pos in positions {
                      if ![col1, col2, col3].contains(pos.col) {
                        deletedPositions.append(pos)
                      }
                    }
                  }
                }

                if !deletedPositions.isEmpty {
                  var positionDicts = [[String: Int]]()
                  for pos in deletedPositions {
                    positionDicts.append(["row": pos.row, "col": pos.col])
                  }

                  var promptDicts = [[String: Int]]()
                  for pos in allPositions {
                    promptDicts.append(["row": pos.row, "col": pos.col])
                  }

                  return [
                    "isFill": false,
                    "position": positionDicts,
                    "prompt": promptDicts,
                    "method": SolutionMethods.SWORDFISH_COLUMN,
                    "target": [num],
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
