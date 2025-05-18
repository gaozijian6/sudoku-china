// 隐性三数组
func hiddenTriple(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 检查每一行
  for row in 0..<9 {
    for num1 in 1...7 {
      for num2 in (num1 + 1)...8 {
        for num3 in (num2 + 1)...9 {
          let count1 = candidateMap[num1]?.row[row]?.count ?? 0
          let positions1 = candidateMap[num1]?.row[row]?.positions ?? []
          let count2 = candidateMap[num2]?.row[row]?.count ?? 0
          let positions2 = candidateMap[num2]?.row[row]?.positions ?? []
          let count3 = candidateMap[num3]?.row[row]?.count ?? 0
          let positions3 = candidateMap[num3]?.row[row]?.positions ?? []

          if count1 != 0 && count2 != 0 && count3 != 0 && count1 <= 3 && count2 <= 3 && count3 <= 3 {
            // 合并三个数字的位置
            let positionsArray = (positions1 + positions2 + positions3).map {
              ["row": $0.row, "col": $0.col]
            }

            // 提取唯一位置
            var uniquePositions: [[String: Int]] = []
            var positionsSet = Set<String>()

            for pos in positionsArray {
              let key = "\(pos["row"] ?? 0)-\(pos["col"] ?? 0)"
              if !positionsSet.contains(key) {
                positionsSet.insert(key)
                uniquePositions.append(pos)
              }
            }

            if uniquePositions.count == 3 {
              // 获取这三个位置的所有候选数
              var allCandidates: [Int] = []
              for pos in uniquePositions {
                if let posRow = pos["row"], let posCol = pos["col"] {
                  allCandidates.append(contentsOf: board[posRow][posCol].draft)
                }
              }

              // 检查候选数集合
              let allCandidatesSet = Set(allCandidates)
              
              // 只有当所有候选数不仅仅是这3个数字时，才需要删除
              if allCandidatesSet.count != 3 {
                // 检查是否有需要删除的候选数
                let targetNums = Array(allCandidatesSet).filter {
                  $0 != num1 && $0 != num2 && $0 != num3
                }
                
                if targetNums.count > 0 {
                  return [
                    "isFill": false,
                    "position": uniquePositions,
                    "prompt": uniquePositions,
                    "method": SolutionMethods.HIDDEN_TRIPLE_ROW,
                    "target": targetNums,
                  ]
                }
              }
            }
          }
        }
      }
    }
  }

  // 检查每一列
  for col in 0..<9 {
    for num1 in 1...7 {
      for num2 in (num1 + 1)...8 {
        for num3 in (num2 + 1)...9 {
          let count1 = candidateMap[num1]?.col[col]?.count ?? 0
          let positions1 = candidateMap[num1]?.col[col]?.positions ?? []
          let count2 = candidateMap[num2]?.col[col]?.count ?? 0
          let positions2 = candidateMap[num2]?.col[col]?.positions ?? []
          let count3 = candidateMap[num3]?.col[col]?.count ?? 0
          let positions3 = candidateMap[num3]?.col[col]?.positions ?? []

          if count1 != 0 && count2 != 0 && count3 != 0 && count1 <= 3 && count2 <= 3 && count3 <= 3 {
            // 合并三个数字的位置
            let positionsArray = (positions1 + positions2 + positions3).map {
              ["row": $0.row, "col": $0.col]
            }

            // 提取唯一位置
            var uniquePositions: [[String: Int]] = []
            var positionsSet = Set<String>()

            for pos in positionsArray {
              let key = "\(pos["row"] ?? 0)-\(pos["col"] ?? 0)"
              if !positionsSet.contains(key) {
                positionsSet.insert(key)
                uniquePositions.append(pos)
              }
            }

            if uniquePositions.count == 3 {
              // 获取这三个位置的所有候选数
              var allCandidates: [Int] = []
              for pos in uniquePositions {
                if let posRow = pos["row"], let posCol = pos["col"] {
                  allCandidates.append(contentsOf: board[posRow][posCol].draft)
                }
              }

              // 检查候选数集合
              let allCandidatesSet = Set(allCandidates)
              
              // 只有当所有候选数不仅仅是这3个数字时，才需要删除
              if allCandidatesSet.count != 3 {
                // 检查是否有需要删除的候选数
                let targetNums = Array(allCandidatesSet).filter {
                  $0 != num1 && $0 != num2 && $0 != num3
                }
                
                if targetNums.count > 0 {
                  return [
                    "isFill": false,
                    "position": uniquePositions,
                    "prompt": uniquePositions,
                    "method": SolutionMethods.HIDDEN_TRIPLE_COLUMN,
                    "target": targetNums,
                  ]
                }
              }
            }
          }
        }
      }
    }
  }

  // 检查每一宫
  for box in 0..<9 {
    for num1 in 1...7 {
      for num2 in (num1 + 1)...8 {
        for num3 in (num2 + 1)...9 {
          let count1 = candidateMap[num1]?.box[box]?.count ?? 0
          let positions1 = candidateMap[num1]?.box[box]?.positions ?? []
          let count2 = candidateMap[num2]?.box[box]?.count ?? 0
          let positions2 = candidateMap[num2]?.box[box]?.positions ?? []
          let count3 = candidateMap[num3]?.box[box]?.count ?? 0
          let positions3 = candidateMap[num3]?.box[box]?.positions ?? []

          if count1 != 0 && count2 != 0 && count3 != 0 && count1 <= 3 && count2 <= 3 && count3 <= 3 {
            // 合并三个数字的位置
            let positionsArray = (positions1 + positions2 + positions3).map {
              ["row": $0.row, "col": $0.col]
            }

            // 提取唯一位置
            var uniquePositions: [[String: Int]] = []
            var positionsSet = Set<String>()

            for pos in positionsArray {
              let key = "\(pos["row"] ?? 0)-\(pos["col"] ?? 0)"
              if !positionsSet.contains(key) {
                positionsSet.insert(key)
                uniquePositions.append(pos)
              }
            }

            if uniquePositions.count == 3 {
              // 获取这三个位置的所有候选数
              var allCandidates: [Int] = []
              for pos in uniquePositions {
                if let posRow = pos["row"], let posCol = pos["col"] {
                  allCandidates.append(contentsOf: board[posRow][posCol].draft)
                }
              }

              // 检查候选数集合
              let allCandidatesSet = Set(allCandidates)
              
              // 只有当所有候选数不仅仅是这3个数字时，才需要删除
              if allCandidatesSet.count != 3 {
                // 检查是否有需要删除的候选数
                let targetNums = Array(allCandidatesSet).filter {
                  $0 != num1 && $0 != num2 && $0 != num3
                }
                
                if targetNums.count > 0 {
                  return [
                    "isFill": false,
                    "position": uniquePositions,
                    "prompt": uniquePositions,
                    "method": SolutionMethods.HIDDEN_TRIPLE_BOX,
                    "target": targetNums,
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
