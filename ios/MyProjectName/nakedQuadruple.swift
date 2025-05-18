// 显性四数组
func nakedQuadruple(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 遍历行、列、宫
  for unitType in ["row", "col", "box"] {
    for unit in 0..<9 {
      // 使用candidateMap快速收集单元中所有候选格子
      var cellsWithCandidates: [(pos: Position, candidates: [Int])] = []

      // 用更高效的方式收集有2-4个候选数的格子
      for num in 1...9 {
        var stats: CandidateStats?

        switch unitType {
        case "row":
          stats = candidateMap[num]?.row[unit]
        case "col":
          stats = candidateMap[num]?.col[unit]
        case "box":
          stats = candidateMap[num]?.box[unit]
        default:
          continue
        }

        if let positions = stats?.positions {
          // 遍历所有包含此候选数的位置
          for pos in positions {
            // 只关注有2-4个候选数的格子
            if pos.candidates.count >= 2 && pos.candidates.count <= 4 {
              // 检查是否已添加过这个格子
              if !cellsWithCandidates.contains(where: {
                $0.pos.row == pos.row && $0.pos.col == pos.col
              }) {
                cellsWithCandidates.append(
                  (
                    pos: Position(row: pos.row, col: pos.col),
                    candidates: pos.candidates
                  ))
              }
            }
          }
        }
      }

      // 需要至少4个候选格子才能形成四数对
      if cellsWithCandidates.count < 4 { continue }

      // 检查所有可能的四个格子组合
      for i in 0..<(cellsWithCandidates.count - 3) {
        for j in (i + 1)..<(cellsWithCandidates.count - 2) {
          for k in (j + 1)..<(cellsWithCandidates.count - 1) {
            for l in (k + 1)..<cellsWithCandidates.count {
              let cellA = cellsWithCandidates[i]
              let cellB = cellsWithCandidates[j]
              let cellC = cellsWithCandidates[k]
              let cellD = cellsWithCandidates[l]

              // 计算四个格子中共有多少个不同候选数
              var uniqueCandidates = Set<Int>()
              for num in cellA.candidates { uniqueCandidates.insert(num) }
              for num in cellB.candidates { uniqueCandidates.insert(num) }
              for num in cellC.candidates { uniqueCandidates.insert(num) }
              for num in cellD.candidates { uniqueCandidates.insert(num) }

              // 显性四数对需要这四个格子刚好只有四个不同的候选数
              if uniqueCandidates.count == 4 {
                // 查找受影响的位置
                var affectedPositions: [Position] = []
                let prompt: [Position] = [cellA.pos, cellB.pos, cellC.pos, cellD.pos]

                // 使用candidateMap快速找到可能受影响的格子
                for num in uniqueCandidates {
                  var stats: CandidateStats?

                  switch unitType {
                  case "row":
                    stats = candidateMap[num]?.row[unit]
                  case "col":
                    stats = candidateMap[num]?.col[unit]
                  case "box":
                    stats = candidateMap[num]?.box[unit]
                  default:
                    continue
                  }

                  if let positions = stats?.positions {
                    for pos in positions {
                      // 检查是否是四数对之外的格子
                      if !prompt.contains(where: { $0.row == pos.row && $0.col == pos.col }) {
                        // 检查是否已经添加过
                        if !affectedPositions.contains(where: {
                          $0.row == pos.row && $0.col == pos.col
                        }) {
                          affectedPositions.append(Position(row: pos.row, col: pos.col))
                        }
                      }
                    }
                  }
                }

                if !affectedPositions.isEmpty {
                  // 获取方法名称
                  var method = ""

                  switch unitType {
                  case "row":
                    method = SolutionMethods.NAKED_QUADRUPLE_ROW
                  case "col":
                    method = SolutionMethods.NAKED_QUADRUPLE_COLUMN
                  case "box":
                    method = SolutionMethods.NAKED_QUADRUPLE_BOX
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
  }

  return nil
}
