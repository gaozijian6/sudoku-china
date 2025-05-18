// skyscraper2(单节点弱链2-2)
func skyscraper2(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  for (numStr, graphArr) in graph {
    let num = numStr

    if graphArr.count >= 2 {
      var nodesArr: [[Position]] = []

      for graphNode in graphArr {
        var queue: [GraphNode] = [graphNode]
        var visited = Set<String>()
        var nodes: [Position] = []

        while !queue.isEmpty {
          let currentNode = queue.removeFirst()
          let key = "\(currentNode.row),\(currentNode.col)"

          if visited.contains(key) {
            continue
          }

          visited.insert(key)
          nodes.append(Position(row: currentNode.row, col: currentNode.col))

          for nextNode in currentNode.next {
            queue.append(nextNode)
          }
        }

        nodesArr.append(nodes)
      }

      if nodesArr.count <= 1 {
        continue
      }

      for i in 0..<(nodesArr.count - 1) {
        for j in (i + 1)..<nodesArr.count {
          for k in 0..<nodesArr[i].count {
            for l in 0..<nodesArr[j].count {
              if isWeakLink(
                board: board,
                pos1: nodesArr[i][k],
                pos2: nodesArr[j][l],
                num: num,
                candidateMap: candidateMap
              ) {
                let graphNode1 = findGraphNodeByPosition(
                  pos: Candidate(
                    row: nodesArr[i][k].row, col: nodesArr[i][k].col, candidates: [num]),
                  num: num,
                  graph: graph
                )
                let graphNode2 = findGraphNodeByPosition(
                  pos: Candidate(
                    row: nodesArr[j][l].row, col: nodesArr[j][l].col, candidates: [num]),
                  num: num,
                  graph: graph
                )

                if graphNode1 == nil || graphNode2 == nil { continue }

                for graphNode1_1 in graphNode1!.next {
                  for graphNode2_1 in graphNode2!.next {
                    let commonUnits = getCommonUnits(
                      pos1: Position(row: graphNode1_1.row, col: graphNode1_1.col),
                      pos2: Position(row: graphNode2_1.row, col: graphNode2_1.col),
                      board: board
                    )

                    if !commonUnits.isEmpty {
                      var positions: [Position] = []

                      for unit in commonUnits {
                        let cell = board[unit.row][unit.col]
                        if cell.value == nil && cell.draft.contains(num) {
                          positions.append(unit)
                        }
                      }

                      if !positions.isEmpty {
                        return [
                          "position": positions.map { ["row": $0.row, "col": $0.col] },
                          "prompt": [
                            ["row": graphNode1_1.row, "col": graphNode1_1.col],
                            ["row": nodesArr[i][k].row, "col": nodesArr[i][k].col],
                            ["row": nodesArr[j][l].row, "col": nodesArr[j][l].col],
                            ["row": graphNode2_1.row, "col": graphNode2_1.col],
                          ],
                          "method": SolutionMethods.SKYSCRAPER2,
                          "target": [num],
                          "isFill": false,
                        ]
                      }
                    }
                  }
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
