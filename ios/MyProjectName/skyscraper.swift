// 摩天楼
func skyscraper(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  for num in 1...9 {
    guard let candidates = candidateMap[num]?.all else { continue }

    if candidates.count <= 1 {
      continue
    }

    for i in 0..<(candidates.count - 1) {
      for j in (i + 1)..<candidates.count {
        let pos1 = candidates[i]
        let pos2 = candidates[j]

        // 检查两个位置是否在同一区域
        if areCellsInSameUnit(
          pos1: Position(row: pos1.row, col: pos1.col),
          pos2: Position(row: pos2.row, col: pos2.col))
        {
          continue
        }

        // 寻找一条包含四个节点的路径
        let paths = findFourPath(pos1: pos1, pos2: pos2, num: num, graph: graph)
        for path in paths {
          if path.count != 4 {
            continue
          }

          // 找到共同影响的区域
          var affectedPositions = findCommonAffectedPositions(
            pos1: Position(row: pos1.row, col: pos1.col),
            pos2: Position(row: pos2.row, col: pos2.col),
            board: board,
            num: num
          )

          // 排除与路径开头和结尾都为强连接的位置
          affectedPositions = affectedPositions.filter { pos in
            let isStrongLinkWithStart = isUnitStrongLink(
              board: board,
              position1: pos,
              position2: Position(row: path[0].row, col: path[0].col),
              num: num,
              candidateMap: candidateMap
            )
            let isStrongLinkWithEnd = isUnitStrongLink(
              board: board,
              position1: pos,
              position2: Position(row: path[3].row, col: path[3].col),
              num: num,
              candidateMap: candidateMap
            )
            return !(isStrongLinkWithStart && isStrongLinkWithEnd)
          }

          // 检查筛选后的影响位置是否有效
          let isPathContainsPos = affectedPositions.contains { pos in
            path.contains { pathPos in
              pathPos.row == pos.row && pathPos.col == pos.col
            }
          }

          if !affectedPositions.isEmpty && !isPathContainsPos {
            let isSameBox =
              path[1].row / 3 == path[2].row / 3 && path[1].col / 3 == path[2].col / 3

            let method = isSameBox ? SolutionMethods.TWO_STRING_KITE : SolutionMethods.SKYSCRAPER

            return [
              "position": affectedPositions.map { ["row": $0.row, "col": $0.col] },
              "prompt": path.map { ["row": $0.row, "col": $0.col] },
              "method": method,
              "target": [num],
              "isFill": false,
            ]
          }
        }

        // 寻找一条包含六个节点的路径
        let sixPaths = findSixPath(pos1: pos1, pos2: pos2, num: num, graph: graph)
        for path in sixPaths {
          if path.count != 6 {
            continue
          }

          // 找到共同影响的区域
          var affectedPositions = findCommonAffectedPositions(
            pos1: Position(row: pos1.row, col: pos1.col),
            pos2: Position(row: pos2.row, col: pos2.col),
            board: board,
            num: num
          )

          // 排除与路径开头和结尾都为强连接的位置
          affectedPositions = affectedPositions.filter { pos in
            let isStrongLinkWithStart = isUnitStrongLink(
              board: board,
              position1: pos,
              position2: Position(row: path[0].row, col: path[0].col),
              num: num,
              candidateMap: candidateMap
            )
            let isStrongLinkWithEnd = isUnitStrongLink(
              board: board,
              position1: pos,
              position2: Position(row: path[5].row, col: path[5].col),
              num: num,
              candidateMap: candidateMap
            )
            return !(isStrongLinkWithStart && isStrongLinkWithEnd)
          }

          // 检查筛选后的影响位置是否有效
          let isPathContainsPos = affectedPositions.contains { pos in
            path.contains { pathPos in
              pathPos.row == pos.row && pathPos.col == pos.col
            }
          }

          if !affectedPositions.isEmpty && !isPathContainsPos {
            return [
              "position": affectedPositions.map { ["row": $0.row, "col": $0.col] },
              "prompt": path.map { ["row": $0.row, "col": $0.col] },
              "method": SolutionMethods.X_CHAIN,
              "target": [num],
              "isFill": false,
              "label": "6",
            ]
          }
        }
      }
    }
  }

  return nil
}
