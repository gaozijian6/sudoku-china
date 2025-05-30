// 环
func Loop(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  for (numStr, startNodesArray) in graph {
    let num = numStr

    if startNodesArray.count < 2 { continue }

    for i in 0..<startNodesArray.count {
      let someNode = startNodesArray[i]
      let graphNodesArray = getGraphNodesArray(graphNode: someNode)

      if graphNodesArray.count < 3 { continue }

      for startNode in graphNodesArray {
        let endNodesArray = findGraphNodeByDistance(graphNode: startNode, distance: 2)

        for endNode in endNodesArray {
          var endNode1: GraphNode? = nil
          var startNode1: GraphNode? = nil
          var j = 0

          for j in 0..<startNodesArray.count {
            if j == i { continue }

            let startNodesArray1 = getGraphNodesArray(graphNode: startNodesArray[j])

            for node in startNodesArray1 {
              if isWeakLink(
                board: board,
                pos1: Position(row: endNode.row, col: endNode.col),
                pos2: Position(row: node.row, col: node.col),
                num: num,
                candidateMap: candidateMap
              ) {
                endNode1 = node
              }
            }
          }

          var k = 0
          for k in 0..<startNodesArray.count {
            if k == i || k == j { continue }

            let startNodesArray1 = getGraphNodesArray(graphNode: startNodesArray[k])

            for node in startNodesArray1 {
              if isWeakLink(
                board: board,
                pos1: Position(row: startNode.row, col: startNode.col),
                pos2: Position(row: node.row, col: node.col),
                num: num,
                candidateMap: candidateMap
              ) {
                startNode1 = node
              }
            }
          }

          if let startNode1 = startNode1,
            let endNode1 = endNode1,
            startNode1.row == endNode1.row && startNode1.col == endNode1.col
          {
            continue
          }

          // 3-2
          if let startNode1 = startNode1,
            let endNode1 = endNode1,
            isUnitStrongLink(
              board: board,
              position1: Position(row: startNode1.row, col: startNode1.col),
              position2: Position(row: endNode1.row, col: endNode1.col),
              num: num,
              candidateMap: candidateMap
            )
          {

            let rootNodeArray1 = findGraphNodeByDistance(graphNode: startNode, distance: 1)
            let rootNodeArray2 = findGraphNodeByDistance(graphNode: endNode, distance: 1)

            if !rootNodeArray1.isEmpty && !rootNodeArray2.isEmpty {
              for rootNode1 in rootNodeArray1 {
                for rootNode2 in rootNodeArray2 {
                  if rootNode1.row == rootNode2.row && rootNode1.col == rootNode2.col {
                    return [
                      "label": "3-2",
                      "position": [["row": rootNode1.row, "col": rootNode1.col]],
                      "prompt": [
                        ["row": rootNode1.row, "col": rootNode1.col],
                        ["row": startNode.row, "col": startNode.col],
                        ["row": endNode.row, "col": endNode.col],
                        ["row": startNode1.row, "col": startNode1.col],
                        ["row": endNode1.row, "col": endNode1.col],
                      ],
                      "method": SolutionMethods.LOOP,
                      "isFill": true,
                      "target": [num],
                    ]
                  }
                }
              }
            }
          }

          // 3-2-2 & 3-4
          if let startNode1 = startNode1, let endNode1 = endNode1 {
            let startNodes2Array = findGraphNodeByDistance(graphNode: startNode1, distance: 1)
            let endNodes2Array = findGraphNodeByDistance(graphNode: endNode1, distance: 1)

            if !startNodes2Array.isEmpty && !endNodes2Array.isEmpty {
              for startNode2 in startNodes2Array {
                if startNode2.row == startNode1.row && startNode2.col == startNode1.col {
                  continue
                }

                for endNode2 in endNodes2Array {
                  if endNode2.row == endNode1.row && endNode2.col == endNode1.col {
                    continue
                  }

                  if endNode2.row == startNode2.row && endNode2.col == startNode2.col {
                    continue
                  }

                  // 3-2-2
                  if isWeakLink(
                    board: board,
                    pos1: Position(row: startNode2.row, col: startNode2.col),
                    pos2: Position(row: endNode2.row, col: endNode2.col),
                    num: num,
                    candidateMap: candidateMap
                  ) {
                    let rootNodeArray1 = findGraphNodeByDistance(graphNode: startNode, distance: 1)
                    let rootNodeArray2 = findGraphNodeByDistance(graphNode: endNode, distance: 1)

                    if !rootNodeArray1.isEmpty && !rootNodeArray2.isEmpty {
                      for rootNode1 in rootNodeArray1 {
                        for rootNode2 in rootNodeArray2 {
                          if rootNode1.row == rootNode2.row && rootNode1.col == rootNode2.col {
                            return [
                              "label": "3-2-2",
                              "position": [["row": rootNode1.row, "col": rootNode1.col]],
                              "prompt": [
                                ["row": rootNode1.row, "col": rootNode1.col],
                                ["row": startNode.row, "col": startNode.col],
                                ["row": endNode.row, "col": endNode.col],
                                ["row": startNode1.row, "col": startNode1.col],
                                ["row": startNode2.row, "col": startNode2.col],
                                ["row": endNode1.row, "col": endNode1.col],
                                ["row": endNode2.row, "col": endNode2.col],
                              ],
                              "method": SolutionMethods.LOOP,
                              "isFill": true,
                              "target": [num],
                            ]
                          }
                        }
                      }
                    }
                  }

                  // 3-4
                  if isUnitStrongLink(
                    board: board,
                    position1: Position(row: startNode2.row, col: startNode2.col),
                    position2: Position(row: endNode2.row, col: endNode2.col),
                    num: num,
                    candidateMap: candidateMap
                  ) {
                    let rootNodeArray1 = findGraphNodeByDistance(graphNode: startNode, distance: 1)
                    let rootNodeArray2 = findGraphNodeByDistance(graphNode: endNode, distance: 1)

                    if !rootNodeArray1.isEmpty && !rootNodeArray2.isEmpty {
                      for rootNode1 in rootNodeArray1 {
                        for rootNode2 in rootNodeArray2 {
                          if rootNode1.row == rootNode2.row && rootNode1.col == rootNode2.col {
                            return [
                              "label": "3-4",
                              "position": [["row": rootNode1.row, "col": rootNode1.col]],
                              "prompt": [
                                ["row": rootNode1.row, "col": rootNode1.col],
                                ["row": startNode.row, "col": startNode.col],
                                ["row": endNode.row, "col": endNode.col],
                                ["row": startNode1.row, "col": startNode1.col],
                                ["row": startNode2.row, "col": startNode2.col],
                                ["row": endNode1.row, "col": endNode1.col],
                                ["row": endNode2.row, "col": endNode2.col],
                              ],
                              "method": SolutionMethods.LOOP,
                              "isFill": true,
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
          }
        }
      }
    }
  }

  return nil
}
