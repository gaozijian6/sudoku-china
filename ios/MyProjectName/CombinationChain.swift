import Foundation
import React

// 使用ColorChain.swift中已定义的结构体
class HyperGraphNode: Hashable {
  var cells: [Candidate] = []
  var next: [HyperGraphNode] = []

  init(cells: [Candidate], next: [HyperGraphNode] = []) {
    self.cells = cells
    self.next = next
  }

  // 实现 Hashable 协议
  func hash(into hasher: inout Hasher) {
    // 使用对象标识符作为哈希值
    hasher.combine(ObjectIdentifier(self))
  }

  // 实现 Equatable 协议
  static func == (lhs: HyperGraphNode, rhs: HyperGraphNode) -> Bool {
    // 比较对象引用是否相同
    return lhs === rhs
  }
}
typealias HyperGraph = [Int: [HyperGraphNode]]

@objc(CombinationChain)
class CombinationChain: NSObject {

  // 实现 RCTBridgeModule 协议所需的静态方法
  @objc
  static func moduleName() -> String! {
    return "CombinationChain"
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
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

  // 主要求解方法
  @objc
  func solve(
    _ boardInput: NSArray,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    var board: [[CellData]] = []
    for i in 0..<boardInput.count {
      guard let row = boardInput[i] as? NSArray else { continue }
      var cellDataRow: [CellData] = []

      for j in 0..<row.count {
        guard let cellDict = row[j] as? [String: Any] else { continue }

        let value = cellDict["value"] as? Int
        let isGiven = cellDict["isGiven"] as? Bool ?? false
        let draft = cellDict["draft"] as? [Int] ?? []

        let cellData = CellData(value: value, isGiven: isGiven, draft: draft)
        cellDataRow.append(cellData)
      }

      board.append(cellDataRow)
    }

    // 创建候选数映射
    let candidateMap = updateCandidateMap(board: board)
    // 创建超图结构
    let hyperGraphResult = createHyperGraph(board: board, candidateMap: candidateMap)
    let hyperGraph = hyperGraphResult.hyperGraph
    let globalNodeMap = hyperGraphResult.globalNodeMap

    // 执行组合链求解
    let result = combinationChain(
      board: board,
      candidateMap: candidateMap,
      hyperGraph: hyperGraph,
      globalNodeMap: globalNodeMap
    )

    resolver(result ?? NSNull())
  }

  // 组合链求解算法
  func combinationChain(
    board: [[CellData]],
    candidateMap: CandidateMap,
    hyperGraph: HyperGraph,
    globalNodeMap: [String: HyperGraphNode]
  ) -> [String: Any]? {
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

  // 创建超图结构
  func createHyperGraph(board: [[CellData]], candidateMap: CandidateMap) -> (
    hyperGraph: HyperGraph, globalNodeMap: [String: HyperGraphNode]
  ) {
    var hyperGraph: HyperGraph = [:]
    var globalNodeMap: [String: HyperGraphNode] = [:]

    // 遍历1到9的所有候选数
    for num in 1...9 {
      hyperGraph[num] = []

      // 获取该数字的所有候选位置
      guard let candidates = candidateMap[num]?.all, !candidates.isEmpty else {
        continue
      }

      // 单位置到超图节点的映射
      var nodeMap: [String: HyperGraphNode] = [:]
      // 多位置到超图节点的映射
      var multiNodeMap: [String: HyperGraphNode] = [:]

      // 为每个候选数位置创建单节点
      for candidate in candidates {
        let key = "\(candidate.row),\(candidate.col)"
        let node = HyperGraphNode(cells: [candidate])
        nodeMap[key] = node

        // 添加到全局映射，使用 num-row,col 格式作为键
        let globalKey = "\(num)-\(candidate.row),\(candidate.col)"
        globalNodeMap[globalKey] = node
      }

      // 第一步：识别单单强链接
      let strongLinks: [(Candidate, Candidate)] = []
      for i in 0..<candidates.count {
        for j in (i + 1)..<candidates.count {
          let pos1 = candidates[i]
          let pos2 = candidates[j]

          if isUnitStrongLink(
            board: board,
            position1: pos1,
            position2: pos2,
            num: num,
            candidateMap: candidateMap
          ) {
            // 建立单单强链接
            let key1 = "\(pos1.row),\(pos1.col)"
            let key2 = "\(pos2.row),\(pos2.col)"

            if let node1 = nodeMap[key1], let node2 = nodeMap[key2] {
              if !node1.next.contains(where: { $0 === node2 }) {
                node1.next.append(node2)
              }
              if !node2.next.contains(where: { $0 === node1 }) {
                node2.next.append(node1)
              }
            }
          }
        }
      }

      // 第二步：识别单多强链接 (多节点处理)

      // 处理行的单多强链接
      for (rowIndex, rowData) in candidateMap[num]?.row ?? [:] {
        if rowData.count >= 3 && rowData.count <= 4 {
          // 按宫分组
          var boxGroups: [Int: [Candidate]] = [:]

          for pos in rowData.positions {
            let boxIndex = pos.col / 3
            if boxGroups[boxIndex] == nil {
              boxGroups[boxIndex] = []
            }
            boxGroups[boxIndex]?.append(pos)
          }

          // 为每个至少有2个候选数的宫创建多节点
          if boxGroups.count != 2 { continue }

          for (boxIndex, cells) in boxGroups {
            if cells.count >= 2 {
              // 计算其他宫的单元格数量
              var remainingCellCount = 0
              for (otherBoxIndex, otherCells) in boxGroups {
                if boxIndex != otherBoxIndex {
                  remainingCellCount += otherCells.count
                }
              }

              // 如果多元格+单元格等于行内候选数总数，才建立强链接
              if cells.count + remainingCellCount == rowData.count {
                let multiKey =
                  cells
                  .map { "\($0.row)-\($0.col)" }
                  .sorted()
                  .joined(separator: ",")

                let multiNode = HyperGraphNode(cells: cells)
                multiNodeMap[multiKey] = multiNode

                // 添加到全局映射，使用 num-cells内容 格式作为键
                let cellsStr =
                  cells
                  .map { "\($0.row),\($0.col)" }
                  .sorted()
                  .joined(separator: "|")
                let globalKey = "\(num)-\(cellsStr)"
                globalNodeMap[globalKey] = multiNode

                // 连接该多节点与其他宫的单节点
                for (otherBoxIndex, otherCells) in boxGroups {
                  if boxIndex != otherBoxIndex && otherCells.count == 1 {
                    let singleCell = otherCells[0]
                    let singleKey = "\(singleCell.row),\(singleCell.col)"

                    if let singleNode = nodeMap[singleKey] {
                      if !multiNode.next.contains(where: { $0 === singleNode }) {
                        multiNode.next.append(singleNode)
                      }
                      if !singleNode.next.contains(where: { $0 === multiNode }) {
                        singleNode.next.append(multiNode)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 处理列的单多强链接
      for (colIndex, colData) in candidateMap[num]?.col ?? [:] {
        if colData.count >= 3 && colData.count <= 4 {
          // 按宫分组
          var boxGroups: [Int: [Candidate]] = [:]

          for pos in colData.positions {
            let boxIndex = pos.row / 3
            if boxGroups[boxIndex] == nil {
              boxGroups[boxIndex] = []
            }
            boxGroups[boxIndex]?.append(pos)
          }

          // 为每个至少有2个候选数的宫创建多节点
          if boxGroups.count != 2 { continue }

          for (boxIndex, cells) in boxGroups {
            if cells.count >= 2 {
              // 计算其他宫的单元格数量
              var remainingCellCount = 0
              for (otherBoxIndex, otherCells) in boxGroups {
                if boxIndex != otherBoxIndex {
                  remainingCellCount += otherCells.count
                }
              }

              // 如果多元格+单元格等于列内候选数总数，才建立强链接
              if cells.count + remainingCellCount == colData.count {
                let multiKey =
                  cells
                  .map { "\($0.row)-\($0.col)" }
                  .sorted()
                  .joined(separator: ",")

                // 避免重复创建节点
                if multiNodeMap[multiKey] == nil {
                  let multiNode = HyperGraphNode(cells: cells)
                  multiNodeMap[multiKey] = multiNode

                  // 添加到全局映射，使用 num-cells内容 格式作为键
                  let cellsStr =
                    cells
                    .map { "\($0.row),\($0.col)" }
                    .sorted()
                    .joined(separator: "|")
                  let globalKey = "\(num)-\(cellsStr)"
                  globalNodeMap[globalKey] = multiNode
                }

                guard let multiNode = multiNodeMap[multiKey] else { continue }

                // 连接该多节点与其他宫的单节点
                for (otherBoxIndex, otherCells) in boxGroups {
                  if boxIndex != otherBoxIndex && otherCells.count == 1 {
                    let singleCell = otherCells[0]
                    let singleKey = "\(singleCell.row),\(singleCell.col)"

                    if let singleNode = nodeMap[singleKey] {
                      if !multiNode.next.contains(where: { $0 === singleNode }) {
                        multiNode.next.append(singleNode)
                      }
                      if !singleNode.next.contains(where: { $0 === multiNode }) {
                        singleNode.next.append(multiNode)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 处理宫的单多强链接
      for (boxIndex, boxData) in candidateMap[num]?.box ?? [:] {
        if boxData.count >= 3 && boxData.count <= 4 {
          // 按行分组
          var rowGroups: [Int: [Candidate]] = [:]
          // 按列分组
          var colGroups: [Int: [Candidate]] = [:]

          for pos in boxData.positions {
            if rowGroups[pos.row] == nil {
              rowGroups[pos.row] = []
            }
            rowGroups[pos.row]?.append(pos)

            if colGroups[pos.col] == nil {
              colGroups[pos.col] = []
            }
            colGroups[pos.col]?.append(pos)
          }

          // 处理行分组中的单多强链接
          if rowGroups.count == 2 {
            for (rowIndex, cells) in rowGroups {
              if cells.count >= 2 {
                // 确保单多强链接的单元格和多元格总数等于宫内该候选数的总数
                var remainingCellCount = 0
                for (otherRowIndex, otherCells) in rowGroups {
                  if rowIndex != otherRowIndex {
                    // 计算其他行的单元格总数
                    remainingCellCount += otherCells.count
                  }
                }

                // 如果多元格+单元格等于宫内候选数总数，才建立强链接
                if cells.count + remainingCellCount == boxData.count {
                  let multiKey =
                    cells
                    .map { "\($0.row)-\($0.col)" }
                    .sorted()
                    .joined(separator: ",")

                  // 避免重复创建节点
                  if multiNodeMap[multiKey] == nil {
                    let multiNode = HyperGraphNode(cells: cells)
                    multiNodeMap[multiKey] = multiNode

                    // 添加到全局映射，使用 num-cells内容 格式作为键
                    let cellsStr =
                      cells
                      .map { "\($0.row),\($0.col)" }
                      .sorted()
                      .joined(separator: "|")
                    let globalKey = "\(num)-\(cellsStr)"
                    globalNodeMap[globalKey] = multiNode
                  }

                  guard let multiNode = multiNodeMap[multiKey] else { continue }

                  // 找出同宫内其他行的单个候选位置
                  for (otherRowIndex, otherCells) in rowGroups {
                    if rowIndex != otherRowIndex && otherCells.count == 1 {
                      let singleCell = otherCells[0]
                      let singleKey = "\(singleCell.row),\(singleCell.col)"

                      if let singleNode = nodeMap[singleKey] {
                        if !multiNode.next.contains(where: { $0 === singleNode }) {
                          multiNode.next.append(singleNode)
                        }
                        if !singleNode.next.contains(where: { $0 === multiNode }) {
                          singleNode.next.append(multiNode)
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // 处理列分组中的单多强链接
          if colGroups.count == 2 {
            for (colIndex, cells) in colGroups {
              if cells.count >= 2 {
                // 确保单多强链接的单元格和多元格总数等于宫内该候选数的总数
                var remainingCellCount = 0
                for (otherColIndex, otherCells) in colGroups {
                  if colIndex != otherColIndex {
                    // 计算其他列的单元格总数
                    remainingCellCount += otherCells.count
                  }
                }

                // 如果多元格+单元格等于宫内候选数总数，才建立强链接
                if cells.count + remainingCellCount == boxData.count {
                  let multiKey =
                    cells
                    .map { "\($0.row)-\($0.col)" }
                    .sorted()
                    .joined(separator: ",")

                  // 避免重复创建节点
                  if multiNodeMap[multiKey] == nil {
                    let multiNode = HyperGraphNode(cells: cells)
                    multiNodeMap[multiKey] = multiNode

                    // 添加到全局映射，使用 num-cells内容 格式作为键
                    let cellsStr =
                      cells
                      .map { "\($0.row),\($0.col)" }
                      .sorted()
                      .joined(separator: "|")
                    let globalKey = "\(num)-\(cellsStr)"
                    globalNodeMap[globalKey] = multiNode
                  }

                  guard let multiNode = multiNodeMap[multiKey] else { continue }

                  // 找出同宫内其他列的单个候选位置
                  for (otherColIndex, otherCells) in colGroups {
                    if colIndex != otherColIndex && otherCells.count == 1 {
                      let singleCell = otherCells[0]
                      let singleKey = "\(singleCell.row),\(singleCell.col)"

                      if let singleNode = nodeMap[singleKey] {
                        if !multiNode.next.contains(where: { $0 === singleNode }) {
                          multiNode.next.append(singleNode)
                        }
                        if !singleNode.next.contains(where: { $0 === multiNode }) {
                          singleNode.next.append(multiNode)
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

      // 处理行的多多强链接
      for (rowIndex, rowData) in candidateMap[num]?.row ?? [:] {
        if rowData.count >= 4 {
          // 至少需要4个候选数才能形成多多强链（每个多节点至少2个单元格）
          // 按宫分组
          var boxGroups: [Int: [Candidate]] = [:]

          for pos in rowData.positions {
            let boxIndex = pos.col / 3
            if boxGroups[boxIndex] == nil {
              boxGroups[boxIndex] = []
            }
            boxGroups[boxIndex]?.append(pos)
          }

          // 必须至少有2个宫，且每个宫内至少有2个候选数
          if boxGroups.count >= 2 {
            // 遍历所有可能的宫对组合
            let boxIndices = Array(boxGroups.keys).sorted()

            for i in 0..<boxIndices.count {
              for j in (i + 1)..<boxIndices.count {
                let boxIndex1 = boxIndices[i]
                let boxIndex2 = boxIndices[j]

                guard let cells1 = boxGroups[boxIndex1],
                  let cells2 = boxGroups[boxIndex2]
                else { continue }

                // 确保两个宫各自至少有2个候选数
                if cells1.count >= 2 && cells2.count >= 2 {
                  // 检查两个多节点总和是否等于行内候选数总数
                  if cells1.count + cells2.count == rowData.count {
                    // 创建第一个多节点 - 添加row_前缀区分
                    let multiKey1 =
                      "row_"
                      + cells1
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey1] == nil {
                      let multiNode1 = HyperGraphNode(cells: cells1)
                      multiNodeMap[multiKey1] = multiNode1

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells1
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode1
                    }

                    // 创建第二个多节点 - 添加row_前缀区分
                    let multiKey2 =
                      "row_"
                      + cells2
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey2] == nil {
                      let multiNode2 = HyperGraphNode(cells: cells2)
                      multiNodeMap[multiKey2] = multiNode2

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells2
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode2
                    }

                    guard let multiNode1 = multiNodeMap[multiKey1],
                      let multiNode2 = multiNodeMap[multiKey2]
                    else { continue }

                    // 建立多多强链接
                    if !multiNode1.next.contains(where: { $0 === multiNode2 }) {
                      multiNode1.next.append(multiNode2)
                    }
                    if !multiNode2.next.contains(where: { $0 === multiNode1 }) {
                      multiNode2.next.append(multiNode1)
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 处理列的多多强链接
      for (colIndex, colData) in candidateMap[num]?.col ?? [:] {
        if colData.count >= 4 {
          // 至少需要4个候选数才能形成多多强链（每个多节点至少2个单元格）
          // 按宫分组
          var boxGroups: [Int: [Candidate]] = [:]

          for pos in colData.positions {
            let boxIndex = pos.row / 3
            if boxGroups[boxIndex] == nil {
              boxGroups[boxIndex] = []
            }
            boxGroups[boxIndex]?.append(pos)
          }

          // 必须至少有2个宫，且每个宫内至少有2个候选数
          if boxGroups.count >= 2 {
            // 遍历所有可能的宫对组合
            let boxIndices = Array(boxGroups.keys).sorted()

            for i in 0..<boxIndices.count {
              for j in (i + 1)..<boxIndices.count {
                let boxIndex1 = boxIndices[i]
                let boxIndex2 = boxIndices[j]

                guard let cells1 = boxGroups[boxIndex1],
                  let cells2 = boxGroups[boxIndex2]
                else { continue }

                // 确保两个宫各自至少有2个候选数
                if cells1.count >= 2 && cells2.count >= 2 {
                  // 检查两个多节点总和是否等于列内候选数总数
                  if cells1.count + cells2.count == colData.count {
                    // 创建第一个多节点 - 添加col_前缀区分
                    let multiKey1 =
                      "col_"
                      + cells1
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey1] == nil {
                      let multiNode1 = HyperGraphNode(cells: cells1)
                      multiNodeMap[multiKey1] = multiNode1

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells1
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode1
                    }

                    // 创建第二个多节点 - 添加col_前缀区分
                    let multiKey2 =
                      "col_"
                      + cells2
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey2] == nil {
                      let multiNode2 = HyperGraphNode(cells: cells2)
                      multiNodeMap[multiKey2] = multiNode2

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells2
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode2
                    }

                    guard let multiNode1 = multiNodeMap[multiKey1],
                      let multiNode2 = multiNodeMap[multiKey2]
                    else { continue }

                    // 建立多多强链接
                    if !multiNode1.next.contains(where: { $0 === multiNode2 }) {
                      multiNode1.next.append(multiNode2)
                    }
                    if !multiNode2.next.contains(where: { $0 === multiNode1 }) {
                      multiNode2.next.append(multiNode1)
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 处理宫的多多强链接
      for (boxIndex, boxData) in candidateMap[num]?.box ?? [:] {
        if boxData.count >= 4 {
          // 至少需要4个候选数才能形成多多强链（每个多节点至少2个单元格）

          // 按行分组
          var rowGroups: [Int: [Candidate]] = [:]
          // 按列分组
          var colGroups: [Int: [Candidate]] = [:]

          for pos in boxData.positions {
            if rowGroups[pos.row] == nil {
              rowGroups[pos.row] = []
            }
            rowGroups[pos.row]?.append(pos)

            if colGroups[pos.col] == nil {
              colGroups[pos.col] = []
            }
            colGroups[pos.col]?.append(pos)
          }

          // 处理行分组的多多强链
          if rowGroups.count >= 2 {
            let rowIndices = Array(rowGroups.keys).sorted()

            for i in 0..<rowIndices.count {
              for j in (i + 1)..<rowIndices.count {
                let rowIndex1 = rowIndices[i]
                let rowIndex2 = rowIndices[j]

                guard let cells1 = rowGroups[rowIndex1],
                  let cells2 = rowGroups[rowIndex2]
                else { continue }

                // 确保两行各自至少有2个候选数
                if cells1.count >= 2 && cells2.count >= 2 {
                  // 检查两个多节点总和是否等于宫内候选数总数
                  if cells1.count + cells2.count == boxData.count {
                    // 创建第一个多节点 - 添加box_row_前缀区分
                    let multiKey1 =
                      "box_row_"
                      + cells1
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey1] == nil {
                      let multiNode1 = HyperGraphNode(cells: cells1)
                      multiNodeMap[multiKey1] = multiNode1

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells1
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode1
                    }

                    // 创建第二个多节点 - 添加box_row_前缀区分
                    let multiKey2 =
                      "box_row_"
                      + cells2
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey2] == nil {
                      let multiNode2 = HyperGraphNode(cells: cells2)
                      multiNodeMap[multiKey2] = multiNode2

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells2
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode2
                    }

                    guard let multiNode1 = multiNodeMap[multiKey1],
                      let multiNode2 = multiNodeMap[multiKey2]
                    else { continue }

                    // 建立多多强链接
                    if !multiNode1.next.contains(where: { $0 === multiNode2 }) {
                      multiNode1.next.append(multiNode2)
                    }
                    if !multiNode2.next.contains(where: { $0 === multiNode1 }) {
                      multiNode2.next.append(multiNode1)
                    }
                  }
                }
              }
            }
          }

          // 处理列分组的多多强链
          if colGroups.count >= 2 {
            let colIndices = Array(colGroups.keys).sorted()

            for i in 0..<colIndices.count {
              for j in (i + 1)..<colIndices.count {
                let colIndex1 = colIndices[i]
                let colIndex2 = colIndices[j]

                guard let cells1 = colGroups[colIndex1],
                  let cells2 = colGroups[colIndex2]
                else { continue }

                // 确保两列各自至少有2个候选数
                if cells1.count >= 2 && cells2.count >= 2 {
                  // 检查两个多节点总和是否等于宫内候选数总数
                  if cells1.count + cells2.count == boxData.count {
                    // 创建第一个多节点 - 添加box_col_前缀区分
                    let multiKey1 =
                      "box_col_"
                      + cells1
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey1] == nil {
                      let multiNode1 = HyperGraphNode(cells: cells1)
                      multiNodeMap[multiKey1] = multiNode1

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells1
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode1
                    }

                    // 创建第二个多节点 - 添加box_col_前缀区分
                    let multiKey2 =
                      "box_col_"
                      + cells2
                      .map { "\($0.row)-\($0.col)" }
                      .sorted()
                      .joined(separator: ",")

                    // 避免重复创建节点
                    if multiNodeMap[multiKey2] == nil {
                      let multiNode2 = HyperGraphNode(cells: cells2)
                      multiNodeMap[multiKey2] = multiNode2

                      // 添加到全局映射，使用 num-cells内容 格式作为键
                      let cellsStr =
                        cells2
                        .map { "\($0.row),\($0.col)" }
                        .sorted()
                        .joined(separator: "|")
                      let globalKey = "\(num)-\(cellsStr)"
                      globalNodeMap[globalKey] = multiNode2
                    }

                    guard let multiNode1 = multiNodeMap[multiKey1],
                      let multiNode2 = multiNodeMap[multiKey2]
                    else { continue }

                    // 建立多多强链接
                    if !multiNode1.next.contains(where: { $0 === multiNode2 }) {
                      multiNode1.next.append(multiNode2)
                    }
                    if !multiNode2.next.contains(where: { $0 === multiNode1 }) {
                      multiNode2.next.append(multiNode1)
                    }
                  }
                }
              }
            }
          }

          // 处理行列交叉的多多强链接（实验性）
          if rowGroups.count >= 1 && colGroups.count >= 1 {
            for (rowIndex, rowCells) in rowGroups {
              if rowCells.count >= 2 {
                for (colIndex, colCells) in colGroups {
                  if colCells.count >= 2 {
                    // 检查两组是否有重叠单元格
                    let rowCellsSet = Set(rowCells.map { "\($0.row),\($0.col)" })
                    let colCellsSet = Set(colCells.map { "\($0.row),\($0.col)" })

                    // 获取交集
                    let intersection = rowCellsSet.intersection(colCellsSet)

                    // 如果没有交集或交集很小，并且两组单元格总数（减去交集）等于宫内候选数总数
                    if (intersection.count == 0 || intersection.count == 1)
                      && rowCells.count + colCells.count - intersection.count == boxData.count
                    {

                      // 创建不重叠的行单元格集合
                      let uniqueRowCells = rowCells.filter { cell in
                        !intersection.contains("\(cell.row),\(cell.col)")
                      }

                      // 创建不重叠的列单元格集合
                      let uniqueColCells = colCells.filter { cell in
                        !intersection.contains("\(cell.row),\(cell.col)")
                      }

                      if uniqueRowCells.count >= 2 && uniqueColCells.count >= 2 {
                        // 创建行多节点 - 添加前缀box_cross_row_来区分
                        let multiKeyRow =
                          "box_cross_row_"
                          + uniqueRowCells
                          .map { "\($0.row)-\($0.col)" }
                          .sorted()
                          .joined(separator: ",")

                        // 避免重复创建节点
                        if multiNodeMap[multiKeyRow] == nil {
                          let multiNodeRow = HyperGraphNode(cells: uniqueRowCells)
                          multiNodeMap[multiKeyRow] = multiNodeRow

                          // 添加到全局映射，使用 num-cells内容 格式作为键
                          let cellsStr =
                            uniqueRowCells
                            .map { "\($0.row),\($0.col)" }
                            .sorted()
                            .joined(separator: "|")
                          let globalKey = "\(num)-\(cellsStr)"
                          globalNodeMap[globalKey] = multiNodeRow
                        }

                        // 创建列多节点 - 添加前缀box_cross_col_来区分
                        let multiKeyCol =
                          "box_cross_col_"
                          + uniqueColCells
                          .map { "\($0.row)-\($0.col)" }
                          .sorted()
                          .joined(separator: ",")

                        // 避免重复创建节点
                        if multiNodeMap[multiKeyCol] == nil {
                          let multiNodeCol = HyperGraphNode(cells: uniqueColCells)
                          multiNodeMap[multiKeyCol] = multiNodeCol

                          // 添加到全局映射，使用 num-cells内容 格式作为键
                          let cellsStr =
                            uniqueColCells
                            .map { "\($0.row),\($0.col)" }
                            .sorted()
                            .joined(separator: "|")
                          let globalKey = "\(num)-\(cellsStr)"
                          globalNodeMap[globalKey] = multiNodeCol
                        }

                        guard let multiNodeRow = multiNodeMap[multiKeyRow],
                          let multiNodeCol = multiNodeMap[multiKeyCol]
                        else { continue }

                        // 建立多多强链接
                        if !multiNodeRow.next.contains(where: { $0 === multiNodeCol }) {
                          multiNodeRow.next.append(multiNodeCol)
                        }
                        if !multiNodeCol.next.contains(where: { $0 === multiNodeRow }) {
                          multiNodeCol.next.append(multiNodeRow)
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

      // 第四步：清理所有节点的next列表，确保没有自引用
      let allNodes = Array(nodeMap.values) + Array(multiNodeMap.values)
      for node in allNodes {
        node.next = node.next.filter { $0 !== node }
      }

      // 第五步：创建按单元格内容分组的映射
      var cellsContentMap: [String: [HyperGraphNode]] = [:]

      // 基于单元格内容而非前缀分组，这样可以找到具有相同单元格的所有节点
      for node in allNodes {
        let cellsContent = node.cells
          .map { "\($0.row),\($0.col)" }
          .sorted()
          .joined(separator: "|")

        if cellsContentMap[cellsContent] == nil {
          cellsContentMap[cellsContent] = []
        }
        cellsContentMap[cellsContent]?.append(node)
      }

      // 第六步：合并具有相同单元格内容的节点的连接
      for (_, nodes) in cellsContentMap {
        if nodes.count > 1 {
          // 首先，收集所有这些节点的next引用
          var allNextNodes = Set<HyperGraphNode>()
          for node in nodes {
            for next in node.next {
              if next !== node {  // 防止自引用
                allNextNodes.insert(next)
              }
            }
          }

          // 然后，确保每个节点都连接到所有收集到的next节点
          for node in nodes {
            // 清空当前next列表
            node.next = []

            // 添加所有非自引用的next节点
            for next in allNextNodes {
              if next !== node {  // 再次检查以防止自引用
                node.next.append(next)
              }
            }

            // 还要添加与其共享单元格内容但不是自身的节点
            for otherNode in nodes {
              if otherNode !== node && !node.next.contains(where: { $0 === otherNode }) {
                node.next.append(otherNode)
              }
            }
          }
        }
      }

      // 辅助函数：生成节点的cells的唯一标识
      func getCellsSignature(_ node: HyperGraphNode) -> String {
        return node.cells
          .map { "\($0.row),\($0.col)" }
          .sorted()
          .joined(separator: "|")
      }

      // 辅助函数：检查两个节点是否代表相同的cells组合
      func isSameNodeCells(_ node1: HyperGraphNode, _ node2: HyperGraphNode) -> Bool {
        let sig1 = getCellsSignature(node1)
        let sig2 = getCellsSignature(node2)
        return sig1 == sig2
      }

      // 第七步：修复所有互相引用并去除重复节点
      for nodeA in allNodes {
        // 使用字典来存储唯一的next节点，键是cells内容的标识
        var uniqueNextNodes: [String: HyperGraphNode] = [:]

        // 收集所有唯一的next节点，忽略自身
        for nextNode in nodeA.next {
          // 检查是否是自引用（基于cells内容而非引用）
          if !isSameNodeCells(nodeA, nextNode) {
            let signature = getCellsSignature(nextNode)
            uniqueNextNodes[signature] = nextNode
          }
        }

        // 重置next列表，只包含唯一的next节点
        nodeA.next = Array(uniqueNextNodes.values)
      }

      // 第八步：确保互相引用
      for nodeA in allNodes {
        for nodeB in allNodes {
          // 跳过相同的节点（基于cells内容）
          if isSameNodeCells(nodeA, nodeB) { continue }

          // 检查nodeA的next是否包含nodeB
          let nodeAHasNodeB = nodeA.next.contains(where: { isSameNodeCells($0, nodeB) })

          // 检查nodeB的next是否包含nodeA
          let nodeBHasNodeA = nodeB.next.contains(where: { isSameNodeCells($0, nodeA) })

          // 如果一方包含另一方，但另一方不包含一方，则添加互相引用
          if nodeAHasNodeB && !nodeBHasNodeA {
            nodeB.next.append(nodeA)
          } else if !nodeAHasNodeB && nodeBHasNodeA {
            nodeA.next.append(nodeB)
          }
        }
      }

      // 第九步：再次清理所有节点的next列表，确保没有重复项和自引用
      for node in allNodes {
        // 使用字典来去除重复节点（基于cells内容）
        var uniqueNext: [String: HyperGraphNode] = [:]

        for nextNode in node.next {
          // 跳过自引用
          if !isSameNodeCells(node, nextNode) {
            let signature = getCellsSignature(nextNode)
            uniqueNext[signature] = nextNode
          }
        }

        node.next = Array(uniqueNext.values)
      }

      // 第十步：使用BFS找出所有连通组件
      var visited = Set<HyperGraphNode>()

      for node in allNodes {
        if !visited.contains(where: { $0 === node }) {
          var component: [HyperGraphNode] = []
          var queue: [HyperGraphNode] = [node]
          var componentVisited = Set<HyperGraphNode>()

          while !queue.isEmpty {
            let current = queue.removeFirst()
            if componentVisited.contains(where: { $0 === current }) { continue }

            componentVisited.insert(current)
            component.append(current)
            visited.insert(current)

            for next in current.next {
              if next !== current && !componentVisited.contains(where: { $0 === next }) {
                queue.append(next)
              }
            }
          }

          // 只有当连通分量中至少有2个节点时才加入超图
          if component.count >= 2 {
            hyperGraph[num]?.append(component[0])
          }
        }
      }
    }

    return (hyperGraph, globalNodeMap)
  }

  // 判断两个位置是否形成强链接
  func isUnitStrongLink(
    board: [[CellData]],
    position1: Candidate,
    position2: Candidate,
    num: Int,
    candidateMap: CandidateMap
  ) -> Bool {
    // 检查两个位置是否相同
    if position1.row == position2.row && position1.col == position2.col {
      return false
    }

    // 检查两个位置是否都包含指定的候选数
    if !position1.candidates.contains(num) || !position2.candidates.contains(num) {
      return false
    }

    var flag1 = false
    var flag2 = false
    var flag3 = false

    // 检查是否在同一行，且行内只有这两个位置包含该候选数
    if position1.row == position2.row {
      flag1 = candidateMap[num]?.row[position1.row]?.count == 2
    }

    // 检查是否在同一列，且列内只有这两个位置包含该候选数
    if position1.col == position2.col {
      flag2 = candidateMap[num]?.col[position1.col]?.count == 2
    }

    // 检查是否在同一宫，且宫内只有这两个位置包含该候选数
    if position1.row / 3 == position2.row / 3 && position1.col / 3 == position2.col / 3 {
      let boxIndex = (position1.row / 3) * 3 + (position1.col / 3)
      flag3 = candidateMap[num]?.box[boxIndex]?.count == 2
    }

    return flag1 || flag2 || flag3
  }

  // 更新候选数映射
  func updateCandidateMap(board: [[CellData]]) -> CandidateMap {
    var newCandidateMap: CandidateMap = [:]

    // 初始化候选数映射
    for num in 1...9 {
      newCandidateMap[num] = (
        row: [:],
        col: [:],
        box: [:],
        all: []
      )
    }

    // 遍历棋盘
    for rowIndex in 0..<board.count {
      for colIndex in 0..<board[rowIndex].count {
        let cell = board[rowIndex][colIndex]

        // 只处理未填入值的单元格
        if cell.value == nil {
          let boxIndex = (rowIndex / 3) * 3 + (colIndex / 3)
          let candidate = Candidate(
            row: rowIndex,
            col: colIndex,
            candidates: cell.draft
          )

          // 遍历所有候选数
          for num in cell.draft {
            // 修复 inout 参数问题
            if var numEntry = newCandidateMap[num] {
              updateStats(map: &numEntry.row, index: rowIndex, candidate: candidate)
              updateStats(map: &numEntry.col, index: colIndex, candidate: candidate)
              updateStats(map: &numEntry.box, index: boxIndex, candidate: candidate)

              // 添加到所有候选项中
              numEntry.all.append(candidate)

              // 更新回字典
              newCandidateMap[num] = numEntry
            }
          }
        }
      }
    }

    return newCandidateMap
  }

  // 辅助函数：更新候选数统计
  func updateStats(map: inout [Int: CandidateStats], index: Int, candidate: Candidate) {
    if map[index] == nil {
      map[index] = CandidateStats(count: 0, positions: [])
    }

    map[index]?.count += 1
    map[index]?.positions.append(candidate)
  }
}
