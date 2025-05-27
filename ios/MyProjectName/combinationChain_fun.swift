import QuartzCore

func combinationChain(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: [String: HyperGraphNode],
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  let startTime = CACurrentMediaTime()
  let (hyperGraph, globalNodeMap) = createHyperGraph(board: board, candidateMap: candidateMap)
  let endTime = CACurrentMediaTime()
  let duration = (endTime - startTime) * 1000
  print("hyperGraph: \(duration) 毫秒")

  func dfs(
    num: Int,
    path: [HyperGraphNode],
    depth: Int,
    type1Array: [String],
    type2Array: [String]
  ) -> [String: Any]? {
    if depth > 6 { return nil }

    if depth == 4 || depth == 6 {
      let affectedCells = getCommonAffectedCells_Hyper(
        node1: path[0],
        node2: path[path.count - 1],
        candidateMap: candidateMap,
        num: num
      )

      var prompt: [[String: Any]] = []
      for node in path {
        for cell in node.cells {
          prompt.append(["row": cell.row, "col": cell.col])
        }
      }

      // 检查是否有重复位置
      for i in 0..<prompt.count {
        guard let row1 = prompt[i]["row"] as? Int,
          let col1 = prompt[i]["col"] as? Int
        else { continue }

        for j in (i + 1)..<prompt.count {
          guard let row2 = prompt[j]["row"] as? Int,
            let col2 = prompt[j]["col"] as? Int
          else { continue }

          if row1 == row2 && col1 == col2 {
            return nil
          }
        }
      }
      var isAllSingle = true
      for c in type1Array {
        if c == "二" || c == "三" {
          isAllSingle = false
          break
        }
      }

      var weakLinks = 0
      for c in type2Array {
        if c == "弱" {
          weakLinks += 1
        }
      }

      var method = ""
      if isAllSingle {
        if weakLinks == 1 {
          method = "Two Strong Links"
        } else if weakLinks == 2 {
          method = "Three Strong Links"
        }
      } else {
        method = "Chain of Combinations"
      }

      if !affectedCells.isEmpty {
        return [
          "label1": type1Array.joined(),
          "label2": type2Array.joined(),
          "position": affectedCells.map { ["row": $0.row, "col": $0.col] },
          "prompt": prompt,
          "method": method,
          "isFill": false,
          "target": [num],
        ]
      }
    }

    let node = path.last!

    // 对next节点按固定顺序排序
    let sortedNext = node.next.sorted { (node1, node2) -> Bool in
      let id1 = node1.cells.map { "\($0.row),\($0.col)" }.sorted().joined()
      let id2 = node2.cells.map { "\($0.row),\($0.col)" }.sorted().joined()
      return id1 < id2
    }

    // 使用排序后的节点集合遍历
    for nextNode in sortedNext {
      let key1 = nextNode.cells
        .map { "\($0.row),\($0.col)" }
        .sorted()
        .joined(separator: "|")

      var isSame = depth >= 2 ? false : true
      if depth >= 2 {
        for i in (0...(path.count - 2)).reversed() {
          let key2 = path[i].cells
            .map { "\($0.row),\($0.col)" }
            .sorted()
            .joined(separator: "|")

          if key1 == key2 {
            isSame = true
            break
          }
        }
      }

      if isSame && depth >= 2 { continue }

      if nextNode.cells.count == 1 {
        // 单节点情况
        if let result = dfs(
          num: num,
          path: path + [nextNode],
          depth: depth + 1,
          type1Array: type1Array + ["单"],
          type2Array: type2Array + ["强"]
        ) {
          return result
        }
      } else if nextNode.cells.count == 2 {
        // 多节点情况
        if let result = dfs(
          num: num,
          path: path + [nextNode],
          depth: depth + 1,
          type1Array: type1Array + ["二"],
          type2Array: type2Array + ["强"]
        ) {
          return result
        }
      } else if nextNode.cells.count == 3 {
        // 多节点情况
        if let result = dfs(
          num: num,
          path: path + [nextNode],
          depth: depth + 1,
          type1Array: type1Array + ["三"],
          type2Array: type2Array + ["强"]
        ) {
          return result
        }
      }
    }

    // 尝试弱链接（在depth为2或4时）
    if depth == 2 || depth == 4 {
      let affectedCells = getAffectedCells_Hyper(
        node: node,
        candidateMap: candidateMap,
        num: num,
        path: path
      )

      // 对受影响的单元格进行排序
      let sortedAffectedCells = affectedCells.sorted { (pos1, pos2) -> Bool in
        if pos1.row != pos2.row {
          return pos1.row < pos2.row
        }
        return pos1.col < pos2.col
      }

      // 使用排序后的单元格
      for pos in sortedAffectedCells {
        let key = "\(num)-\(pos.row),\(pos.col)"

        var isSame = false
        for i in (0...(path.count - 2)).reversed() {
          let keyNode =
            "\(num)-"
            + path[i].cells
            .map { "\($0.row),\($0.col)" }
            .sorted()
            .joined(separator: "|")

          if keyNode == key {
            isSame = true
            break
          }
        }

        if isSame { continue }

        if let nextNode = globalNodeMap[key] {
          if let result = dfs(
            num: num,
            path: path + [nextNode],
            depth: depth + 1,
            type1Array: type1Array + ["单"],
            type2Array: type2Array + ["弱"]
          ) {
            return result
          }
        }
      }

      // 找多格 - 双格情况
      if affectedCells.count > 1 {
        for i in 0..<affectedCells.count {
          for j in (i + 1)..<affectedCells.count {
            let cells = [
              "\(affectedCells[i].row),\(affectedCells[i].col)",
              "\(affectedCells[j].row),\(affectedCells[j].col)",
            ].sorted().joined(separator: "|")
            let key = "\(num)-\(cells)"

            var isSame = false
            for k in (0...(path.count - 2)).reversed() {
              let keyNode =
                "\(num)-"
                + path[k].cells
                .map { "\($0.row),\($0.col)" }
                .sorted()
                .joined(separator: "|")

              if keyNode == key {
                isSame = true
                break
              }
            }

            if isSame { continue }

            if let nextNode = globalNodeMap[key] {
              if let result = dfs(
                num: num,
                path: path + [nextNode],
                depth: depth + 1,
                type1Array: type1Array + ["二"],
                type2Array: type2Array + ["弱"]
              ) {
                return result
              }
            }
          }
        }
      }

      // 找多格 - 三格情况
      if affectedCells.count > 2 {
        for i in 0..<affectedCells.count {
          for j in (i + 1)..<affectedCells.count {
            for k in (j + 1)..<affectedCells.count {
              let cells = [
                "\(affectedCells[i].row),\(affectedCells[i].col)",
                "\(affectedCells[j].row),\(affectedCells[j].col)",
                "\(affectedCells[k].row),\(affectedCells[k].col)",
              ].sorted().joined(separator: "|")
              let key = "\(num)-\(cells)"

              var isSame = false
              for m in (0...(path.count - 2)).reversed() {
                let keyNode =
                  "\(num)-"
                  + path[m].cells
                  .map { "\($0.row),\($0.col)" }
                  .sorted()
                  .joined(separator: "|")

                if keyNode == key {
                  isSame = true
                  break
                }
              }

              if isSame { continue }

              if let nextNode = globalNodeMap[key] {
                if let result = dfs(
                  num: num,
                  path: path + [nextNode],
                  depth: depth + 1,
                  type1Array: type1Array + ["三"],
                  type2Array: type2Array + ["弱"]
                ) {
                  return result
                }
              }
            }
          }
        }
      }
    }

    return nil
  }

  // 主循环，遍历所有数字和根节点
  for num in 1...9 {
    if let hyperNodeRoots = hyperGraph[num] {
      // 对根节点数组进行排序
      let sortedRoots = hyperNodeRoots.sorted { (node1, node2) -> Bool in
        // 使用节点单元格的位置作为排序依据
        let id1 = node1.cells.map { "\($0.row),\($0.col)" }.sorted().joined()
        let id2 = node2.cells.map { "\($0.row),\($0.col)" }.sorted().joined()
        return id1 < id2
      }

      for rootNode in sortedRoots {
        // 获取节点数组并排序
        var nodesArray = getNodesArray(hyperGraphNode: rootNode)
        nodesArray.sort { (node1, node2) -> Bool in
          let id1 = node1.cells.map { "\($0.row),\($0.col)" }.sorted().joined()
          let id2 = node2.cells.map { "\($0.row),\($0.col)" }.sorted().joined()
          return id1 < id2
        }

        for node in nodesArray {
          if node.cells.count == 1 {
            // 从单节点开始搜索
            if let result = dfs(
              num: num,
              path: [node],
              depth: 1,
              type1Array: ["单"],
              type2Array: []
            ) {
              return result
            }
          }
        }
      }
    }
  }

  return nil
}

// 获取共同受影响的单元格
func getCommonAffectedCells_Hyper(
  node1: HyperGraphNode,
  node2: HyperGraphNode,
  candidateMap: CandidateMap,
  num: Int
) -> [Position] {
  let affectedCells1 = getAffectedCells_Hyper(node: node1, candidateMap: candidateMap, num: num)
  let affectedCells2 = getAffectedCells_Hyper(node: node2, candidateMap: candidateMap, num: num)

  var visited = Set<String>()
  var commonAffectedCells: [Position] = []

  // 构建第一组单元格的访问集
  for cell in affectedCells1 {
    visited.insert("\(cell.row)-\(cell.col)")
  }

  // 查找第二组单元格中也存在于第一组的单元格
  for cell in affectedCells2 {
    if visited.contains("\(cell.row)-\(cell.col)") {
      commonAffectedCells.append(cell)
    }
  }

  return commonAffectedCells
}

// 获取受影响的单元格
func getAffectedCells_Hyper(
  node: HyperGraphNode,
  candidateMap: CandidateMap,
  num: Int,
  path: [HyperGraphNode]? = nil
) -> [Position] {
  var affectedCells: [Position] = []
  var visited = Set<String>()

  if node.cells.count == 1 {
    // 单个单元格的情况
    let cell = node.cells[0]
    let row = cell.row
    let col = cell.col

    // 获取同行、同列、同宫的所有候选位置
    let rowStats = candidateMap[num]?.row[row]
    let colStats = candidateMap[num]?.col[col]
    let boxIndex = (row / 3) * 3 + (col / 3)
    let boxStats = candidateMap[num]?.box[boxIndex]

    // 添加同行的受影响单元格
    if let positions = rowStats?.positions {
      for pos in positions {
        let key = "\(pos.row)-\(pos.col)"
        if !visited.contains(key) && !(pos.row == row && pos.col == col) {
          visited.insert(key)
          affectedCells.append(Position(row: pos.row, col: pos.col))
        }
      }
    }

    // 添加同列的受影响单元格
    if let positions = colStats?.positions {
      for pos in positions {
        let key = "\(pos.row)-\(pos.col)"
        if !visited.contains(key) && !(pos.row == row && pos.col == col) {
          visited.insert(key)
          affectedCells.append(Position(row: pos.row, col: pos.col))
        }
      }
    }

    // 添加同宫的受影响单元格
    if let positions = boxStats?.positions {
      for pos in positions {
        let key = "\(pos.row)-\(pos.col)"
        if !visited.contains(key) && !(pos.row == row && pos.col == col) {
          visited.insert(key)
          affectedCells.append(Position(row: pos.row, col: pos.col))
        }
      }
    }
  } else {
    // 多个单元格的情况
    // 检查是否在同一行
    if node.cells.count >= 2 && node.cells[0].row == node.cells[1].row {
      let row = node.cells[0].row
      if let positions = candidateMap[num]?.row[row]?.positions {
        for pos in positions {
          let key = "\(pos.row)-\(pos.col)"
          if !visited.contains(key) {
            var isNodeCell = false
            for cell in node.cells {
              if cell.row == pos.row && cell.col == pos.col {
                isNodeCell = true
                break
              }
            }
            if !isNodeCell {
              visited.insert(key)
              affectedCells.append(Position(row: pos.row, col: pos.col))
            }
          }
        }
      }
    }
    // 检查是否在同一列
    else if node.cells.count >= 2 && node.cells[0].col == node.cells[1].col {
      let col = node.cells[0].col
      if let positions = candidateMap[num]?.col[col]?.positions {
        for pos in positions {
          let key = "\(pos.row)-\(pos.col)"
          if !visited.contains(key) {
            var isNodeCell = false
            for cell in node.cells {
              if cell.row == pos.row && cell.col == pos.col {
                isNodeCell = true
                break
              }
            }
            if !isNodeCell {
              visited.insert(key)
              affectedCells.append(Position(row: pos.row, col: pos.col))
            }
          }
        }
      }
    }

    // 检查是否在同一宫
    let boxIndex = (node.cells[0].row / 3) * 3 + (node.cells[0].col / 3)
    if let positions = candidateMap[num]?.box[boxIndex]?.positions {
      for pos in positions {
        let key = "\(pos.row)-\(pos.col)"
        if !visited.contains(key) {
          var isNodeCell = false
          for cell in node.cells {
            if cell.row == pos.row && cell.col == pos.col {
              isNodeCell = true
              break
            }
          }
          if !isNodeCell {
            visited.insert(key)
            affectedCells.append(Position(row: pos.row, col: pos.col))
          }
        }
      }
    }
  }

  return affectedCells
}

// 获取节点数组
func getNodesArray(hyperGraphNode: HyperGraphNode) -> [HyperGraphNode] {
  var nodesArray: [HyperGraphNode] = []
  var visited = Set<HyperGraphNode>()
  var queue: [HyperGraphNode] = [hyperGraphNode]

  while !queue.isEmpty {
    let current = queue.removeFirst()
    if visited.contains(where: { $0 === current }) { continue }

    visited.insert(current)
    nodesArray.append(current)

    // 将所有相邻节点加入队列
    for nextNode in current.next {
      if !visited.contains(where: { $0 === nextNode }) {
        queue.append(nextNode)
      }
    }
  }

  return nodesArray
}
