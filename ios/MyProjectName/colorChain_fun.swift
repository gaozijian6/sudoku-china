import Foundation

func doubleColorChain(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 寻找可能的起始点
  for row in 0..<9 {
    for col in 0..<9 {
      // 使用转换后的Swift强类型数据
      if board[row][col].value == nil {
        let cellCandidates = board[row][col].draft
        if cellCandidates.count == 2 {
          let a = cellCandidates[0]
          let b = cellCandidates[1]

          // 创建根节点
          let rootA = Node(row: row, col: col, value: a, depth: 1, noValue: [b], label: "")
          let rootB = Node(row: row, col: col, value: b, depth: 1, noValue: [a], label: "")
          var visitedMapA = Set<String>()
          var visitedMapB = Set<String>()

          // 创建DispatchGroup用于同步两个并行任务
          let group = DispatchGroup()

          // 创建并行队列
          let queue = DispatchQueue(
            label: "com.sudokuapp.chainbuilder", attributes: .concurrent)

          // 并行执行第一个buildChainTree
          group.enter()
          queue.async {
            buildChainTree(
              node: rootA, board: board, candidateMap: candidateMap,
              graph: graph,
              depth: 6, visitedMap: &visitedMapA)
            group.leave()
          }

          // 并行执行第二个buildChainTree
          group.enter()
          queue.async {
            buildChainTree(
              node: rootB, board: board, candidateMap: candidateMap,
              graph: graph,
              depth: 6, visitedMap: &visitedMapB)
            group.leave()
          }

          // 等待两个任务都完成
          group.wait()

          // 收集A树和B树的所有节点
          var nodesA: [Node] = []
          var nodesB: [Node] = []

          // 使用队列收集所有节点
          var queueA: [Node] = [rootA]
          var queueB: [Node] = [rootB]
          var indexA = 0
          var indexB = 0

          // 收集A树的所有节点
          while indexA < queueA.count {
            let node = queueA[indexA]
            indexA += 1
            nodesA.append(node)

            queueA.append(contentsOf: node.sons1)
            queueA.append(contentsOf: node.sons2)
            queueA.append(contentsOf: node.sons3)
          }

          // 收集B树的所有节点
          while indexB < queueB.count {
            let node = queueB[indexB]
            indexB += 1
            nodesB.append(node)

            queueB.append(contentsOf: node.sons1)
            queueB.append(contentsOf: node.sons2)
            queueB.append(contentsOf: node.sons3)
          }

          // 检查冲突情况
          for nodeA in nodesA {
            for nodeB in nodesB {
              // 跳过某些情况
              if nodeA.depth == 2 && nodeB.depth == 2 { continue }
              if nodeA.depth == 1 && nodeB.depth == 2 { continue }
              if nodeA.depth == 2 && nodeB.depth == 1 { continue }
              if nodeA.depth == 3 && nodeB.depth == 1 { continue }
              if nodeA.depth == 1 && nodeB.depth == 3 { continue }

              let isInSameUnit = areCellsInSameUnit(
                pos1: Position(row: nodeA.row, col: nodeA.col),
                pos2: Position(row: nodeB.row, col: nodeB.col)
              )

              // 情况一：如果两个方格填入相同的数字，检查共同影响区
              if let valueA = nodeA.value, let valueB = nodeB.value,
                valueA == valueB,
                !(nodeA.row == nodeB.row && nodeA.col == nodeB.col)
              {

                // 找到共同影响区域
                let commonUnits = findCommonAffectedPositions(
                  pos1: Position(row: nodeA.row, col: nodeA.col),
                  pos2: Position(row: nodeB.row, col: nodeB.col),
                  board: board,
                  num: valueA)

                if !commonUnits.isEmpty {
                  // 获取两个节点的所有祖先
                  let ancestorsResultA = getAncestors(node: nodeA)
                  let ancestorsA = ancestorsResultA.ancestors
                  let rootA = ancestorsResultA.root
                  let labelA = ancestorsResultA.label

                  let ancestorsResultB = getAncestors(node: nodeB)
                  let ancestorsB = ancestorsResultB.ancestors
                  let rootB = ancestorsResultB.root
                  let labelB = ancestorsResultB.label

                  // 检查是否有重复的祖先
                  let allAncestors = ancestorsA + ancestorsB
                  let isHasDuplicate = allAncestors.contains { ancestor in
                    commonUnits.contains { pos in
                      pos.row == ancestor.row && pos.col == ancestor.col
                    }
                  }
                  if isHasDuplicate { continue }

                  // 高亮提示
                  var highlightDeletes: [HighlightDelete] = []

                  for pos in commonUnits {
                    highlightDeletes.append(
                      HighlightDelete(
                        row: pos.row,
                        col: pos.col,
                        value: [valueA]
                      )
                    )
                  }

                  // 构建结果
                  var newBoard = board

                  // 当找到结果时：
                  let resultDict: [String: Any] = [
                    "isFill": false,
                    "position": commonUnits.map {
                      ["row": $0.row, "col": $0.col]
                    },
                    "prompt": (ancestorsA + ancestorsB)
                      .map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                    "method": "Double Color Chain",
                    "target": [valueA],
                    "label": "①\(labelA)-\(labelB)",
                    "highlightPromts1": ancestorsA.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightPromts2": ancestorsB.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightDeletes": highlightDeletes.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                  ]

                  return resultDict
                }
              }
              // 情况二：如果两个不同方格填入的数字不同，但相互冲突
              else if isInSameUnit,
                let valueA = nodeA.value,
                let valueB = nodeB.value,
                valueA != valueB,
                !(nodeA.row == nodeB.row && nodeA.col == nodeB.col)
              {

                // 检查A中是否包含B的值作为候选数
                if board[nodeA.row][nodeA.col].draft.contains(valueB) {
                  let ancestorsResultA = getAncestors(node: nodeA)
                  let ancestorsA = ancestorsResultA.ancestors
                  let rootA = ancestorsResultA.root
                  let labelA = ancestorsResultA.label

                  let ancestorsResultB = getAncestors(node: nodeB)
                  let ancestorsB = ancestorsResultB.ancestors
                  let rootB = ancestorsResultB.root
                  let labelB = ancestorsResultB.label

                  // 将 Result 转换为字典并通过 resolver 返回
                  let resultDict: [String: Any] = [
                    "isFill": false,
                    "position": [["row": nodeA.row, "col": nodeA.col]],
                    "prompt": (ancestorsA + ancestorsB)
                      .map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                    "method": "Double Color Chain",
                    "target": [valueB],
                    "label": "②\(labelA)-\(labelB)",
                    "highlightPromts1": ancestorsA.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightPromts2": ancestorsB.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightDeletes": [
                      [
                        "row": nodeA.row, "col": nodeA.col,
                        "value": [valueB],
                      ]
                    ],
                  ]

                  return resultDict
                }

                // 检查B中是否包含A的值作为候选数
                if board[nodeB.row][nodeB.col].draft.contains(valueA) {
                  let ancestorsResultA = getAncestors(node: nodeA)
                  let ancestorsA = ancestorsResultA.ancestors
                  let rootA = ancestorsResultA.root
                  let labelA = ancestorsResultA.label

                  let ancestorsResultB = getAncestors(node: nodeB)
                  let ancestorsB = ancestorsResultB.ancestors
                  let rootB = ancestorsResultB.root
                  let labelB = ancestorsResultB.label

                  // 将 Result 转换为字典并通过 resolver 返回
                  let resultDict: [String: Any] = [
                    "isFill": false,
                    "position": [["row": nodeB.row, "col": nodeB.col]],
                    "prompt": (ancestorsA + ancestorsB)
                      .map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                    "method": "Double Color Chain",
                    "target": [valueA],
                    "label": "③\(labelA)-\(labelB)",
                    "highlightPromts1": ancestorsA.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightPromts2": ancestorsB.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightDeletes": [
                      [
                        "row": nodeB.row, "col": nodeB.col,
                        "value": [valueA],
                      ]
                    ],
                  ]

                  return resultDict
                }
              }
              // 情况三：如果两个节点在同一个位置，但有不同的值
              else if let valueA = nodeA.value,
                let valueB = nodeB.value,
                nodeA.row == nodeB.row && nodeA.col == nodeB.col
              {

                // 找出除了nodeA和nodeB填入的值以外的其他候选数
                let otherCandidates = board[nodeA.row][nodeA.col].draft
                  .filter {
                    $0 != valueA && $0 != valueB
                  }

                if !otherCandidates.isEmpty {
                  let ancestorsResultA = getAncestors(node: nodeA)
                  let ancestorsA = ancestorsResultA.ancestors
                  let rootA = ancestorsResultA.root
                  let labelA = ancestorsResultA.label

                  let ancestorsResultB = getAncestors(node: nodeB)
                  let ancestorsB = ancestorsResultB.ancestors
                  let rootB = ancestorsResultB.root
                  let labelB = ancestorsResultB.label

                  let resultDict: [String: Any] = [
                    "isFill": false,
                    "position": [["row": nodeA.row, "col": nodeA.col]],
                    "prompt": (ancestorsA + ancestorsB)
                      .map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                    "method": "Double Color Chain",
                    "target": otherCandidates,
                    "label": "④\(labelA)-\(labelB)",
                    "highlightPromts1": ancestorsA.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightPromts2": ancestorsB.map {
                      ["row": $0.row, "col": $0.col, "value": $0.value]
                    },
                    "highlightDeletes": [
                      [
                        "row": nodeA.row, "col": nodeA.col,
                        "value": otherCandidates,
                      ]
                    ],
                  ]

                  return resultDict
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

func tripleColorChain(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  // 寻找可能的起始点
  for row in 0..<9 {
    for col in 0..<9 {
      if board[row][col].value == nil {
        let cellCandidates = board[row][col].draft
        if cellCandidates.count == 3 {
          let a = cellCandidates[0]
          let b = cellCandidates[1]
          let c = cellCandidates[2]

          // 单独对 a 构建
          let rootA = Node(
            row: row, col: col, value: a, depth: 1, father: nil, noValue: [b, c],
            label: ""
          )
          var visitedMapA = Set<String>()

          // 单独对 b 构建
          let rootB = Node(
            row: row, col: col, value: b, depth: 1, father: nil, noValue: [a, c],
            label: ""
          )
          var visitedMapB = Set<String>()

          // 单独对 c 构建
          let rootC = Node(
            row: row, col: col, value: c, depth: 1, father: nil, noValue: [a, b],
            label: "")
          var visitedMapC = Set<String>()

          // 创建DispatchGroup用于同步三个并行任务
          let group = DispatchGroup()

          // 创建并行队列
          let queue = DispatchQueue(
            label: "com.sudokuapp.chainbuilder", attributes: .concurrent)

          // 并行执行第一个buildChainTree
          group.enter()
          queue.async {
            buildChainTree(
              node: rootA, board: board, candidateMap: candidateMap, graph: graph,
              depth: 5, visitedMap: &visitedMapA)
            group.leave()
          }

          // 并行执行第二个buildChainTree
          group.enter()
          queue.async {
            buildChainTree(
              node: rootB, board: board, candidateMap: candidateMap, graph: graph,
              depth: 5, visitedMap: &visitedMapB)
            group.leave()
          }

          // 并行执行第三个buildChainTree
          group.enter()
          queue.async {
            buildChainTree(
              node: rootC, board: board, candidateMap: candidateMap, graph: graph,
              depth: 5, visitedMap: &visitedMapC)
            group.leave()
          }

          // 等待三个任务都完成
          group.wait()

          // 收集A树的所有节点
          var nodesA: [Node] = []
          var queueA: [Node] = [rootA]
          var indexA = 0

          while indexA < queueA.count {
            let node = queueA[indexA]
            indexA += 1
            nodesA.append(node)

            queueA.append(contentsOf: node.sons1)
            queueA.append(contentsOf: node.sons2)
            queueA.append(contentsOf: node.sons3)
          }

          // 收集B树的所有节点
          var nodesB: [Node] = []
          var queueB: [Node] = [rootB]
          var indexB = 0

          while indexB < queueB.count {
            let node = queueB[indexB]
            indexB += 1
            nodesB.append(node)

            queueB.append(contentsOf: node.sons1)
            queueB.append(contentsOf: node.sons2)
            queueB.append(contentsOf: node.sons3)
          }

          // 收集C树的所有节点
          var nodesC: [Node] = []
          var queueC: [Node] = [rootC]
          var indexC = 0

          while indexC < queueC.count {
            let node = queueC[indexC]
            indexC += 1
            nodesC.append(node)

            queueC.append(contentsOf: node.sons1)
            queueC.append(contentsOf: node.sons2)
            queueC.append(contentsOf: node.sons3)
          }

          for nodeA in nodesA {
            for nodeB in nodesB {
              for nodeC in nodesC {
                if nodeA.depth == 1 && nodeB.depth <= 3 && nodeC.depth <= 3 {
                  continue
                }
                if nodeA.depth <= 3 && nodeB.depth == 1 && nodeC.depth <= 3 {
                  continue
                }
                if nodeA.depth <= 3 && nodeB.depth <= 3 && nodeC.depth == 1 {
                  continue
                }

                let isInSameUnitAB = areCellsInSameUnit(
                  pos1: Position(row: nodeA.row, col: nodeA.col),
                  pos2: Position(row: nodeB.row, col: nodeB.col)
                )
                let isInSameUnitAC = areCellsInSameUnit(
                  pos1: Position(row: nodeA.row, col: nodeA.col),
                  pos2: Position(row: nodeC.row, col: nodeC.col)
                )
                let isInSameUnitBC = areCellsInSameUnit(
                  pos1: Position(row: nodeB.row, col: nodeB.col),
                  pos2: Position(row: nodeC.row, col: nodeC.col)
                )

                // 情况一：如果存在三个方格里填入的数字相同，那么检查他们的共同影响区
                if let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  valueA == valueB && valueA == valueC,
                  !(nodeA.row == nodeB.row && nodeA.col == nodeB.col),
                  !(nodeA.row == nodeC.row && nodeA.col == nodeC.col),
                  !(nodeB.row == nodeC.row && nodeB.col == nodeC.col)
                {

                  // 检查是否有共同影响区域
                  let commonUnits = findCommonAffectedPositions_Three(
                    pos1: Position(row: nodeA.row, col: nodeA.col),
                    pos2: Position(row: nodeB.row, col: nodeB.col),
                    pos3: Position(row: nodeC.row, col: nodeC.col),
                    num: valueA,
                    board: board
                  )

                  if !commonUnits.isEmpty {
                    // 获取三个节点的所有祖先
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let rootA = ancestorsResultA.root
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let rootB = ancestorsResultB.root
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let rootC = ancestorsResultC.root
                    let labelC = ancestorsResultC.label

                    // 检查是否有重复的祖先
                    let allAncestors = ancestorsA + ancestorsB + ancestorsC
                    let isHasDuplicate = allAncestors.contains { ancestor in
                      commonUnits.contains { pos in
                        pos.row == ancestor.row && pos.col == ancestor.col
                      }
                    }
                    if isHasDuplicate { continue }

                    var highlightDeletes: [HighlightDelete] = []

                    for pos in commonUnits {
                      highlightDeletes.append(
                        HighlightDelete(
                          row: pos.row,
                          col: pos.col,
                          value: [valueA]
                        )
                      )
                    }

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": commonUnits.map {
                        ["row": $0.row, "col": $0.col]
                      },
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": [valueA],
                      "label": "①\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": highlightDeletes.map {
                        ["row": $0.row, "col": $0.col, "value": $0.value]
                      },
                    ]

                    return resultDict
                  }
                }
                // 情况二：B占据了被删除点且看得到A、C
                else if isInSameUnitAB && isInSameUnitBC,
                  let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  valueA != valueB && valueB != valueC && valueA == valueC,
                  !(nodeA.row == nodeB.row && nodeA.col == nodeB.col),
                  !(nodeA.row == nodeC.row && nodeA.col == nodeC.col),
                  !(nodeB.row == nodeC.row && nodeB.col == nodeC.col),
                  row != nodeB.row,
                  col != nodeB.col
                {

                  if board[nodeB.row][nodeB.col].draft.contains(valueA) {
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let labelC = ancestorsResultC.label

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": [["row": nodeB.row, "col": nodeB.col]],
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": [valueA],
                      "label": "②\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": [
                        [
                          "row": nodeB.row,
                          "col": nodeB.col,
                          "value": [valueA],
                        ]
                      ],
                    ]

                    return resultDict
                  }
                }
                // 情况三：A占据了被删除点且看得到B、C
                else if isInSameUnitAB && isInSameUnitAC,
                  let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  valueA != valueB && valueA != valueC && valueB == valueC,
                  !(nodeA.row == nodeB.row && nodeA.col == nodeB.col),
                  !(nodeA.row == nodeC.row && nodeA.col == nodeC.col),
                  !(nodeB.row == nodeC.row && nodeB.col == nodeC.col),
                  row != nodeA.row,
                  col != nodeA.col
                {

                  if board[nodeA.row][nodeA.col].draft.contains(valueB) {
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let labelC = ancestorsResultC.label

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": [["row": nodeA.row, "col": nodeA.col]],
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": [valueB],
                      "label": "③\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": [
                        [
                          "row": nodeA.row,
                          "col": nodeA.col,
                          "value": [valueB],
                        ]
                      ],
                    ]

                    return resultDict
                  }
                }
                // 情况四：C占据了被删除点且看得到A、B
                else if isInSameUnitAC && isInSameUnitBC,
                  let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  valueB != valueC && valueA != valueC && valueB == valueA,
                  !(nodeA.row == nodeB.row && nodeA.col == nodeB.col),
                  !(nodeA.row == nodeC.row && nodeA.col == nodeC.col),
                  !(nodeB.row == nodeC.row && nodeB.col == nodeC.col),
                  row != nodeC.row,
                  col != nodeC.col
                {

                  if board[nodeC.row][nodeC.col].draft.contains(valueA) {
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let labelC = ancestorsResultC.label

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": [["row": nodeC.row, "col": nodeC.col]],
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": [valueA],
                      "label": "④\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": [
                        [
                          "row": nodeC.row,
                          "col": nodeC.col,
                          "value": [valueA],
                        ]
                      ],
                    ]

                    return resultDict
                  }
                }
                // 情况五：AB占据了被删除点且看得到C
                else if isInSameUnitAC,
                  let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  valueC != valueA && valueC != valueB,
                  nodeA.row == nodeB.row && nodeA.col == nodeB.col,
                  !(nodeA.row == nodeC.row && nodeA.col == nodeC.col),
                  !(nodeB.row == nodeC.row && nodeB.col == nodeC.col),
                  row != nodeA.row,
                  col != nodeA.col
                {

                  if board[nodeA.row][nodeA.col].draft.contains(valueC) {
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let labelC = ancestorsResultC.label

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": [["row": nodeB.row, "col": nodeB.col]],
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": [valueC],
                      "label": "⑤\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": [
                        [
                          "row": nodeB.row,
                          "col": nodeB.col,
                          "value": [valueC],
                        ]
                      ],
                    ]

                    return resultDict
                  }
                }
                // 情况六：BC占据了被删除点且看得到A
                else if isInSameUnitAB,
                  let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  valueC != valueA && valueB != valueA,
                  !(nodeA.row == nodeB.row && nodeA.col == nodeB.col),
                  !(nodeA.row == nodeC.row && nodeA.col == nodeC.col),
                  nodeB.row == nodeC.row && nodeB.col == nodeC.col,
                  row != nodeB.row,
                  col != nodeB.col
                {

                  if board[nodeC.row][nodeC.col].draft.contains(valueA) {
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let labelC = ancestorsResultC.label

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": [["row": nodeB.row, "col": nodeB.col]],
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": [valueA],
                      "label": "⑥\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": [
                        [
                          "row": nodeB.row,
                          "col": nodeB.col,
                          "value": [valueA],
                        ]
                      ],
                    ]

                    return resultDict
                  }
                }
                // 情况七：AC占据了被删除点且看得到B
                else if isInSameUnitAB,
                  let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  valueA != valueB && valueC != valueB,
                  !(nodeA.row == nodeB.row && nodeA.col == nodeB.col),
                  nodeA.row == nodeC.row && nodeA.col == nodeC.col,
                  !(nodeB.row == nodeC.row && nodeB.col == nodeC.col),
                  row != nodeA.row,
                  col != nodeA.col
                {

                  if board[nodeC.row][nodeC.col].draft.contains(valueB) {
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let labelC = ancestorsResultC.label

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": [["row": nodeC.row, "col": nodeC.col]],
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": [valueB],
                      "label": "⑦\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": [
                        [
                          "row": nodeC.row,
                          "col": nodeC.col,
                          "value": [valueB],
                        ]
                      ],
                    ]

                    return resultDict
                  }
                }
                // 情况八：ABC占据了被删除点
                else if let valueA = nodeA.value,
                  let valueB = nodeB.value,
                  let valueC = nodeC.value,
                  nodeA.row == nodeB.row && nodeA.col == nodeB.col,
                  nodeA.row == nodeC.row && nodeA.col == nodeC.col,
                  nodeB.row == nodeC.row && nodeB.col == nodeC.col,
                  row != nodeA.row,
                  col != nodeA.col
                {

                  // 获取该位置的所有候选数
                  let cell = board[nodeA.row][nodeA.col]
                  // 找出除了nodeA、nodeB和nodeC填入的值以外的其他候选数
                  let otherCandidates = cell.draft.filter {
                    $0 != valueA && $0 != valueB && $0 != valueC
                  }

                  if !otherCandidates.isEmpty {
                    let ancestorsResultA = getAncestors(node: nodeA)
                    let ancestorsA = ancestorsResultA.ancestors
                    let labelA = ancestorsResultA.label

                    let ancestorsResultB = getAncestors(node: nodeB)
                    let ancestorsB = ancestorsResultB.ancestors
                    let labelB = ancestorsResultB.label

                    let ancestorsResultC = getAncestors(node: nodeC)
                    let ancestorsC = ancestorsResultC.ancestors
                    let labelC = ancestorsResultC.label

                    let resultDict: [String: Any] = [
                      "isFill": false,
                      "position": [["row": nodeA.row, "col": nodeA.col]],
                      "prompt": (ancestorsA + ancestorsB + ancestorsC).map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "method": "Triple Color Chain",
                      "target": otherCandidates,
                      "label": "⑧\(labelA)-\(labelB)-\(labelC)",
                      "highlightPromts1": ancestorsA.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts2": ancestorsB.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightPromts3": ancestorsC.map {
                        [
                          "row": $0.row, "col": $0.col,
                          "value": $0.value,
                        ]
                      },
                      "highlightDeletes": [
                        [
                          "row": nodeA.row,
                          "col": nodeA.col,
                          "value": otherCandidates,
                        ]
                      ],
                    ]

                    return resultDict
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

// 构建链树
func buildChainTree(
  node: Node, board: [[CellData]], candidateMap: CandidateMap, graph: Graph,
  depth: Int,
  visitedMap: inout Set<String>
) {
  // 递归终止条件
  if node.depth >= depth {
    return
  }

  // 使用与TypeScript相同的访问标记逻辑
  if let value = node.value {
    visitedMap.insert("\(node.row)-\(node.col)-value-\(value)")
  }
  if !node.noValue.isEmpty {
    for noValue in node.noValue {
      visitedMap.insert("\(node.row)-\(node.col)-noValue-\(noValue)")
    }
  }

  let pos = Position(row: node.row, col: node.col)

  if let num = node.value {
    // 1. 处理双数置换 (sons1)
    let affectedCells1 = getAffectedCells(
      position: pos, num: num, candidateMap: candidateMap)

    for pos in affectedCells1 {
      // 如果单元格包含当前节点的值作为候选数，并且只有两个候选数
      if board[pos.row][pos.col].draft.count == 2 {
        // 找到另一个候选数
        let other =
          board[pos.row][pos.col].draft[0] == num
          ? board[pos.row][pos.col].draft[1] : board[pos.row][pos.col].draft[0]

        // 检查是否已在访问集合中
        if visitedMap.contains("\(pos.row)-\(pos.col)-value-\(other)") { continue }

        // 创建双数置换节点
        let son = Node(
          row: pos.row, col: pos.col, value: other, depth: node.depth + 1,
          father: node, noValue: [num], label: "双")
        node.sons1.append(son)

        // 继续构建链树
        buildChainTree(
          node: son, board: board, candidateMap: candidateMap, graph: graph,
          depth: depth, visitedMap: &visitedMap)
      }
    }

    // 2. 处理消除候选数 (sons2)
    let affectedCells2 = getAffectedCells(
      position: pos, num: num, candidateMap: candidateMap)

    for pos in affectedCells2 {
      // 检查是否已经在访问集合中
      if visitedMap.contains("\(pos.row)-\(pos.col)-noValue-\(num)") { continue }

      // 创建弱链节点
      let son = Node(
        row: pos.row, col: pos.col, value: nil, depth: node.depth + 1, father: node,
        noValue: [num], label: "弱")
      node.sons2.append(son)

      // 继续构建链树
      buildChainTree(
        node: son, board: board, candidateMap: candidateMap, graph: graph,
        depth: depth, visitedMap: &visitedMap)
    }
  }

  if !node.noValue.isEmpty {
    // 3. 处理强链关系 (sons3)
    for noValue in node.noValue {
      let graphNode_noValue = getGraphNode(pos: pos, num: noValue, graph: graph)
      let nodesArray = findGraphNodeByDistance(graphNode: graphNode_noValue, distance: 1)

      for graphNode in nodesArray {
        // 检查是否已经在访问集合中
        if visitedMap.contains("\(graphNode.row)-\(graphNode.col)-value-\(noValue)") {
          continue
        }

        // 找到除noValue外的其他候选数
        let restCandidates = board[graphNode.row][graphNode.col].draft.filter {
          $0 != noValue
        }

        // 创建强链节点
        let son = Node(
          row: graphNode.row, col: graphNode.col, value: noValue,
          depth: node.depth + 1,
          father: node, noValue: restCandidates, label: "强")
        node.sons3.append(son)

        // 继续构建链树
        buildChainTree(
          node: son, board: board, candidateMap: candidateMap, graph: graph,
          depth: depth, visitedMap: &visitedMap)
      }
    }
  }
}

// 获取祖先节点
func getAncestors(node: Node) -> (
  ancestors: [HighlightPrompt], root: Node?, label: String
) {
  var ancestors: [HighlightPrompt] = []
  var currentNode: Node? = node
  var lastCurrent: Node? = nil
  var chainLabel = ""

  while currentNode != nil {
    // value为nil也允许
    ancestors.insert(
      HighlightPrompt(
        row: currentNode!.row,
        col: currentNode!.col,
        value: currentNode!.value ?? nil
      ), at: 0)

    chainLabel = currentNode!.label + chainLabel
    lastCurrent = currentNode
    currentNode = currentNode!.father
  }

  return (ancestors, root: lastCurrent, label: chainLabel)
}

// 获取受影响的单元格
func getAffectedCells(
  position: Position, num: Int?, candidateMap: CandidateMap
) -> [Position] {
  // 如果 num 为 nil，返回空数组
  guard let num = num else {
    return []
  }

  var visitedMap = Set<String>()
  visitedMap.insert("\(position.row)-\(position.col)")
  var affectedCells: [Position] = []

  // 检查同行
  if let rowStats = candidateMap[num]?.row[position.row] {
    for pos in rowStats.positions {
      let key = "\(pos.row)-\(pos.col)"
      if !visitedMap.contains(key) {
        visitedMap.insert(key)
        affectedCells.append(Position(row: pos.row, col: pos.col))
      }
    }
  }

  // 检查同列
  if let colStats = candidateMap[num]?.col[position.col] {
    for pos in colStats.positions {
      let key = "\(pos.row)-\(pos.col)"
      if !visitedMap.contains(key) {
        visitedMap.insert(key)
        affectedCells.append(Position(row: pos.row, col: pos.col))
      }
    }
  }

  // 检查同宫
  let boxIndex = (position.row / 3) * 3 + (position.col / 3)
  if let boxStats = candidateMap[num]?.box[boxIndex] {
    for pos in boxStats.positions {
      let key = "\(pos.row)-\(pos.col)"
      if !visitedMap.contains(key) {
        visitedMap.insert(key)
        affectedCells.append(Position(row: pos.row, col: pos.col))
      }
    }
  }

  // 转换格式并返回
  return affectedCells
}
