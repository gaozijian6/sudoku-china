// 隐性数对
func hiddenPair(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 检查每一行
  for row in 0..<9 {
    for num1 in 1...8 {
      for num2 in (num1 + 1)...9 {
        let count1 = candidateMap[num1]?.row[row]?.count ?? 0
        let positions1 = candidateMap[num1]?.row[row]?.positions ?? []
        let count2 = candidateMap[num2]?.row[row]?.count ?? 0
        let positions2 = candidateMap[num2]?.row[row]?.positions ?? []

        if count1 == 2 && count2 == 2 {
          // 合并两个数字的位置
          let positionsArray = (positions1 + positions2).map {
            ["row": $0.row, "col": $0.col]
          }

          // 提取唯一位置（如果两个数字在同样的两个位置出现）
          var uniquePositions: [[String: Int]] = []
          var positionsSet = Set<String>()

          for pos in positionsArray {
            let key = "\(pos["row"] ?? 0)-\(pos["col"] ?? 0)"
            if !positionsSet.contains(key) {
              positionsSet.insert(key)
              uniquePositions.append(pos)
            }
          }

          if uniquePositions.count == 2 {
            // 获取这两个位置的所有候选数
            var allCandidates: [Int] = []
            for pos in uniquePositions {
              if let posRow = pos["row"], let posCol = pos["col"] {
                allCandidates.append(contentsOf: board[posRow][posCol].draft)
              }
            }

            // 检查候选数集合大小
            let allCandidatesSet = Set(allCandidates)
            if allCandidatesSet.count > 2 {
              // 要删除的候选数（除了num1和num2之外的所有候选数）
              let targetNums = Array(allCandidatesSet).filter { $0 != num1 && $0 != num2 }

              return [
                "isFill": false,
                "position": uniquePositions,
                "prompt": uniquePositions,
                "method": SolutionMethods.HIDDEN_PAIR_ROW,
                "target": targetNums,
              ]
            }
          }
        }
      }
    }
  }

  // 检查每一列
  for col in 0..<9 {
    for num1 in 1...8 {
      for num2 in (num1 + 1)...9 {
        let count1 = candidateMap[num1]?.col[col]?.count ?? 0
        let positions1 = candidateMap[num1]?.col[col]?.positions ?? []
        let count2 = candidateMap[num2]?.col[col]?.count ?? 0
        let positions2 = candidateMap[num2]?.col[col]?.positions ?? []

        if count1 == 2 && count2 == 2 {
          // 合并两个数字的位置
          let positionsArray = (positions1 + positions2).map {
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

          if uniquePositions.count == 2 {
            // 获取这两个位置的所有候选数
            var allCandidates: [Int] = []
            for pos in uniquePositions {
              if let posRow = pos["row"], let posCol = pos["col"] {
                allCandidates.append(contentsOf: board[posRow][posCol].draft)
              }
            }

            // 检查候选数集合大小
            let allCandidatesSet = Set(allCandidates)
            if allCandidatesSet.count > 2 {
              // 要删除的候选数（除了num1和num2之外的所有候选数）
              let targetNums = Array(allCandidatesSet).filter { $0 != num1 && $0 != num2 }

              return [
                "isFill": false,
                "position": uniquePositions,
                "prompt": uniquePositions,
                "method": SolutionMethods.HIDDEN_PAIR_COLUMN,
                "target": targetNums,
              ]
            }
          }
        }
      }
    }
  }

  // 检查每一宫
  for box in 0..<9 {
    for num1 in 1...8 {
      for num2 in (num1 + 1)...9 {
        let count1 = candidateMap[num1]?.box[box]?.count ?? 0
        let positions1 = candidateMap[num1]?.box[box]?.positions ?? []
        let count2 = candidateMap[num2]?.box[box]?.count ?? 0
        let positions2 = candidateMap[num2]?.box[box]?.positions ?? []

        if count1 == 2 && count2 == 2 {
          // 合并两个数字的位置
          let positionsArray = (positions1 + positions2).map {
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

          if uniquePositions.count == 2 {
            // 获取这两个位置的所有候选数
            var allCandidates: [Int] = []
            for pos in uniquePositions {
              if let posRow = pos["row"], let posCol = pos["col"] {
                allCandidates.append(contentsOf: board[posRow][posCol].draft)
              }
            }

            // 检查候选数集合大小
            let allCandidatesSet = Set(allCandidates)
            if allCandidatesSet.count > 2 {
              // 要删除的候选数（除了num1和num2之外的所有候选数）
              let targetNums = Array(allCandidatesSet).filter { $0 != num1 && $0 != num2 }

              return [
                "isFill": false,
                "position": uniquePositions,
                "prompt": uniquePositions,
                "method": SolutionMethods.HIDDEN_PAIR_BOX,
                "target": targetNums,
              ]
            }
          }
        }
      }
    }
  }

  return nil
}
