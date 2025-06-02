import QuartzCore

// 判断两个位置是否形成强链接
func isUnitStrongLink(
  board: [[CellData]],
  position1: Position,
  position2: Position,
  num: Int,
  candidateMap: CandidateMap
) -> Bool {
  // 检查两个位置是否相同
  if position1.row == position2.row && position1.col == position2.col {
    return false
  }

  // 检查两个位置是否都包含指定的候选数
  if !board[position1.row][position1.col].draft.contains(num) {
    return false
  }

  if !board[position2.row][position2.col].draft.contains(num) {
    return false
  }

  var flag1 = false
  var flag2 = false
  var flag3 = false

  // 检查是否在同一行且该行只有这两个位置包含该候选数
  if position1.row == position2.row {
    flag1 = candidateMap[num]?.row[position1.row]?.count == 2
  }

  // 检查是否在同一列且该列只有这两个位置包含该候选数
  if position1.col == position2.col {
    flag2 = candidateMap[num]?.col[position1.col]?.count == 2
  }

  // 检查是否在同一宫且该宫只有这两个位置包含该候选数
  if position1.row / 3 == position2.row / 3 && position1.col / 3 == position2.col / 3 {
    let boxIndex = (position1.row / 3) * 3 + (position1.col / 3)
    flag3 = candidateMap[num]?.box[boxIndex]?.count == 2
  }

  return flag1 || flag2 || flag3
}

// 给定两个坐标和候选数，判断是否为强连接
func isStrongLink(
  position1: Position,
  position2: Position,
  num: Int,
  graph: Graph
) -> Bool {
  guard let startNodes = graph[num] else { return false }

  for startNode in startNodes {
    var queue: [GraphNode] = [startNode]
    var visited = Set<String>()
    var foundPosition1 = false
    var foundPosition2 = false

    while !queue.isEmpty {
      let currentNode = queue.removeFirst()
      let key = "\(currentNode.row),\(currentNode.col)"

      if visited.contains(key) {
        continue
      }

      visited.insert(key)

      if currentNode.row == position1.row && currentNode.col == position1.col {
        foundPosition1 = true
      }

      if currentNode.row == position2.row && currentNode.col == position2.col {
        foundPosition2 = true
      }

      if foundPosition1 && foundPosition2 {
        return true
      }

      for nextNode in currentNode.next {
        queue.append(nextNode)
      }
    }
  }

  return false
}

// 获取图节点的数量
func getGraphNodesCounts(graphNode: GraphNode) -> Int {
  var visited = Set<String>()
  var queue: [GraphNode] = [graphNode]
  var count = 0

  while !queue.isEmpty {
    let node = queue.removeFirst()
    let key = "\(node.row),\(node.col)"

    if visited.contains(key) {
      continue
    }

    visited.insert(key)
    count += 1

    for nextNode in node.next {
      queue.append(nextNode)
    }
  }

  return count
}

// 获取图节点
func getGraphNode(pos: Position, num: Int, graph: Graph) -> GraphNode? {
  guard let graphArr = graph[num] else { return nil }

  for graphNode in graphArr {
    var queue: [GraphNode] = [graphNode]
    var visited = Set<String>()

    while !queue.isEmpty {
      let node = queue.removeFirst()
      let key = "\(node.row),\(node.col)"

      if visited.contains(key) { continue }
      visited.insert(key)

      if node.row == pos.row && node.col == pos.col {
        return node
      }

      queue.append(contentsOf: node.next)
    }
  }

  return nil
}

// 根据距离查找图节点
func findGraphNodeByDistance(graphNode: GraphNode?, distance: Int) -> [GraphNode] {
  if graphNode == nil { return [] }
  var resultNodes: [GraphNode] = []
  var visited = Set<String>()

  func dfs(node: GraphNode, currentDistance: Int) {
    if currentDistance > distance { return }
    let key = "\(node.row)-\(node.col)"
    if visited.contains(key) { return }
    visited.insert(key)

    if currentDistance == distance {
      resultNodes.append(node)
      visited.remove(key)
      return
    }

    if currentDistance < distance {
      for nextNode in node.next {
        dfs(node: nextNode, currentDistance: currentDistance + 1)
      }
    }
    visited.remove(key)
  }

  dfs(node: graphNode!, currentDistance: 0)

  return resultNodes
}

// 判断两个位置是否在同一单元（行、列或宫）
func areCellsInSameUnit(pos1: Position, pos2: Position) -> Bool {
  // 同行
  if pos1.row == pos2.row {
    return true
  }

  // 同列
  if pos1.col == pos2.col {
    return true
  }

  // 同宫
  let box1Row = pos1.row / 3
  let box1Col = pos1.col / 3
  let box2Row = pos2.row / 3
  let box2Col = pos2.col / 3

  return box1Row == box2Row && box1Col == box2Col
}

// 找到三个位置的共同影响单元格
func findCommonAffectedPositions_Three(
  pos1: Position, pos2: Position, pos3: Position, num: Int, board: [[CellData]]
) -> [Position] {
  var affectedPositions: [Position] = []

  for row in 0..<9 {
    for col in 0..<9 {
      if (row == pos1.row && col == pos1.col) || (row == pos2.row && col == pos2.col)
        || (row == pos3.row && col == pos3.col)
      {
        continue
      }

      let cell = board[row][col]
      if cell.value == nil && cell.draft.contains(num) {
        if areCellsInSameUnit(pos1: Position(row: row, col: col), pos2: pos1)
          && areCellsInSameUnit(pos1: Position(row: row, col: col), pos2: pos2)
          && areCellsInSameUnit(pos1: Position(row: row, col: col), pos2: pos3)
        {
          affectedPositions.append(Position(row: row, col: col))
        }
      }
    }
  }

  return affectedPositions
}

// 已知两个强关联的格子，寻找A到B为4个格子的所有路径
func findFourPath(
  pos1: Candidate,
  pos2: Candidate,
  num: Int,
  graph: Graph
) -> [[Position]] {
  guard let startNode = findGraphNodeByPosition(pos: pos1, num: num, graph: graph) else {
    return []
  }

  var visited = Set<String>()
  var path: [Position] = []
  var allPaths: [[Position]] = []

  func dfs(node: GraphNode) {
    let key = "\(node.row),\(node.col)"

    if visited.contains(key) {
      return
    }

    visited.insert(key)
    path.append(Position(row: node.row, col: node.col))

    if path.count == 4 && node.row == pos2.row && node.col == pos2.col {
      allPaths.append(path)
    }

    if path.count < 4 {
      for nextNode in node.next {
        dfs(node: nextNode)
      }
    }

    visited.remove(key)
    path.removeLast()
  }

  dfs(node: startNode)
  return allPaths
}

// 已知两个强关联的格子，寻找A到B为6个格子的所有路径
func findSixPath(
  pos1: Candidate,
  pos2: Candidate,
  num: Int,
  graph: Graph
) -> [[Position]] {
  guard let startNode = findGraphNodeByPosition(pos: pos1, num: num, graph: graph) else {
    return []
  }

  var visited = Set<String>()
  var path: [Position] = []
  var allPaths: [[Position]] = []

  func dfs(node: GraphNode) {
    let key = "\(node.row),\(node.col)"

    if visited.contains(key) {
      return
    }

    visited.insert(key)
    path.append(Position(row: node.row, col: node.col))

    if path.count == 6 && node.row == pos2.row && node.col == pos2.col {
      allPaths.append(path)
    }

    if path.count < 6 {
      for nextNode in node.next {
        dfs(node: nextNode)
      }
    }

    visited.remove(key)
    path.removeLast()
  }

  dfs(node: startNode)
  return allPaths
}

// 根据位置查找图节点
func findGraphNodeByPosition(
  pos: Candidate,
  num: Int,
  graph: Graph
) -> GraphNode? {
  guard let graphNodes = graph[num] else { return nil }

  for node in graphNodes {
    var queue: [GraphNode] = [node]
    var visited = Set<String>()

    while !queue.isEmpty {
      let currentNode = queue.removeFirst()
      let key = "\(currentNode.row),\(currentNode.col)"

      if visited.contains(key) { continue }
      visited.insert(key)

      if currentNode.row == pos.row && currentNode.col == pos.col {
        return currentNode
      }

      queue.append(contentsOf: currentNode.next)
    }
  }

  return nil
}

// 获取两个格子的共同区域
func getCommonUnits(
  pos1: Position,
  pos2: Position,
  board: [[CellData]]
) -> [Position] {
  var units: [Position] = []
  var uniquePositions = Set<String>()

  let units1 = getUnits(pos: pos1, board: board)
  let units2 = getUnits(pos: pos2, board: board)

  for unit1 in units1 {
    if units2.contains(where: { $0.row == unit1.row && $0.col == unit1.col }) {
      let key = "\(unit1.row),\(unit1.col)"
      if !uniquePositions.contains(key) {
        uniquePositions.insert(key)
        units.append(unit1)
      }
    }
  }

  return units
}

// 获取一个格子所在的所有区域
func getUnits(
  pos: Position,
  board: [[CellData]]
) -> [Position] {
  var units: [Position] = []
  var uniquePositions = Set<String>()

  // 获取行单元
  for col in 0..<9 {
    if board[pos.row][col].value == nil && col != pos.col {
      let key = "\(pos.row),\(col)"
      if !uniquePositions.contains(key) {
        uniquePositions.insert(key)
        units.append(Position(row: pos.row, col: col))
      }
    }
  }

  // 获取列单元
  for row in 0..<9 {
    if board[row][pos.col].value == nil && row != pos.row {
      let key = "\(row),\(pos.col)"
      if !uniquePositions.contains(key) {
        uniquePositions.insert(key)
        units.append(Position(row: row, col: pos.col))
      }
    }
  }

  // 获取宫单元
  let startRow = (pos.row / 3) * 3
  let startCol = (pos.col / 3) * 3

  for i in 0..<3 {
    for j in 0..<3 {
      if board[startRow + i][startCol + j].value == nil
        && (startRow + i != pos.row || startCol + j != pos.col)
      {
        let key = "\(startRow + i),\(startCol + j)"
        if !uniquePositions.contains(key) {
          uniquePositions.insert(key)
          units.append(Position(row: startRow + i, col: startCol + j))
        }
      }
    }
  }

  return units
}

// 找到两个位置共同影响的区域
func findCommonAffectedPositions(
  pos1: Position,
  pos2: Position,
  board: [[CellData]],
  num: Int
) -> [Position] {
  var affectedPositions: [Position] = []

  for row in 0..<9 {
    for col in 0..<9 {
      if (row == pos1.row && col == pos1.col) || (row == pos2.row && col == pos2.col) {
        continue
      }

      let cell = board[row][col]
      if cell.value == nil && cell.draft.contains(num) {
        if areCellsInSameUnit(pos1: Position(row: row, col: col), pos2: pos1)
          && areCellsInSameUnit(pos1: Position(row: row, col: col), pos2: pos2)
        {
          affectedPositions.append(Position(row: row, col: col))
        }
      }
    }
  }

  return affectedPositions
}

// 检查两个位置是否在同一个宫
func isInSameBox(pos1: Position, pos2: Position) -> Bool {
  return pos1.row / 3 == pos2.row / 3 && pos1.col / 3 == pos2.col / 3
}

// 重载函数，支持GraphNode类型
func isInSameBox(pos1: GraphNode, pos2: GraphNode) -> Bool {
  return pos1.row / 3 == pos2.row / 3 && pos1.col / 3 == pos2.col / 3
}

// 混合类型参数版本
func isInSameBox(pos1: Any, pos2: Any) -> Bool {
  let row1: Int
  let col1: Int
  let row2: Int
  let col2: Int

  if let position = pos1 as? Position {
    row1 = position.row
    col1 = position.col
  } else if let node = pos1 as? GraphNode {
    row1 = node.row
    col1 = node.col
  } else {
    return false
  }

  if let position = pos2 as? Position {
    row2 = position.row
    col2 = position.col
  } else if let node = pos2 as? GraphNode {
    row2 = node.row
    col2 = node.col
  } else {
    return false
  }

  return row1 / 3 == row2 / 3 && col1 / 3 == col2 / 3
}

// 判断是否为弱链
func isWeakLink(
  board: [[CellData]],
  pos1: Position,
  pos2: Position,
  num: Int,
  candidateMap: CandidateMap
) -> Bool {
  // 如果是强链，则不是弱链
  if isUnitStrongLink(
    board: board, position1: pos1, position2: pos2, num: num, candidateMap: candidateMap)
  {
    return false
  }

  // 如果在同一单元（行、列或宫），则是弱链
  if areCellsInSameUnit(pos1: pos1, pos2: pos2) {
    return true
  }

  return false
}

// 获取图节点数组
func getGraphNodesArray(graphNode: GraphNode) -> [GraphNode] {
  var resultNodes: [GraphNode] = []
  var visited = Set<String>()
  var queue: [GraphNode] = [graphNode]

  while !queue.isEmpty {
    guard let currentNode = queue.first else { continue }
    queue.removeFirst()

    let key = "\(currentNode.row)-\(currentNode.col)"
    if visited.contains(key) { continue }

    visited.insert(key)
    resultNodes.append(currentNode)

    for nextNode in currentNode.next {
      queue.append(nextNode)
    }
  }

  return resultNodes
}

// 获取一行中所有空格子位置
func getEmptyCellsInRow(row: Int, board: [[CellData]]) -> [Position] {
  var emptyCells: [Position] = []
  for col in 0..<9 {
    if !board[row][col].draft.isEmpty {
      emptyCells.append(Position(row: row, col: col))
    }
  }
  return emptyCells
}

// 获取一列中所有空格子位置
func getEmptyCellsInCol(col: Int, board: [[CellData]]) -> [Position] {
  var emptyCells: [Position] = []
  for row in 0..<9 {
    if !board[row][col].draft.isEmpty {
      emptyCells.append(Position(row: row, col: col))
    }
  }
  return emptyCells
}

// 获取两个格子所在宫内的所有空格子位置
func getEmptyCellsInBox(pos1: Position, pos2: Position, board: [[CellData]]) -> [Position] {
  var emptyCells: [Position] = []
  let box1 = (pos1.row / 3) * 3 + (pos1.col / 3)
  let box2 = (pos2.row / 3) * 3 + (pos2.col / 3)

  if box1 == box2 {
    let startRow = (pos1.row / 3) * 3
    let startCol = (pos1.col / 3) * 3

    for r in startRow..<(startRow + 3) {
      for c in startCol..<(startCol + 3) {
        if !board[r][c].draft.isEmpty && !(r == pos1.row && c == pos1.col)
          && !(r == pos2.row && c == pos2.col)
        {
          emptyCells.append(Position(row: r, col: c))
        }
      }
    }
  }

  return emptyCells
}

// 获取单元格的候选数
func getCandidates(
  board: [[CellData]],
  row: Int,
  col: Int
) -> [Int] {
  if board[row][col].value != nil { return [] }

  var candidates: [Int] = []
  for num in 1...9 {
    if isValid(board: board, row: row, col: col, num: num) {
      candidates.append(num)
    }
  }

  return candidates
}

func updateRelatedCellsDraft(
  board: inout [[CellData]],
  positions: [Position],
  value: Int,
  getCandidates: (([[CellData]], Int, Int) -> [Int]),
  isUndo: Bool = false
) -> [Position] {
  var affectedCells: [Position] = []

  // 收集受影响的单元格
  for position in positions {
    let row = position.row
    let col = position.col

    // 检查同一行的单元格
    for i in 0..<9 {
      if i != col && board[row][i].value == nil {
        affectedCells.append(Position(row: row, col: i))
      }
    }

    // 检查同一列的单元格
    for i in 0..<9 {
      if i != row && board[i][col].value == nil {
        affectedCells.append(Position(row: i, col: col))
      }
    }

    // 检查同一3x3宫格的单元格
    let boxRow = (row / 3) * 3
    let boxCol = (col / 3) * 3

    for i in boxRow..<(boxRow + 3) {
      for j in boxCol..<(boxCol + 3) {
        if (i != row || j != col) && board[i][j].value == nil {
          affectedCells.append(Position(row: i, col: j))
        }
      }
    }
  }

  // 去重受影响的单元格
  let uniqueAffectedCells = Array(Set(affectedCells.map { "\($0.row),\($0.col)" }))
    .map { position -> Position in
      let components = position.split(separator: ",")
      return Position(
        row: Int(components[0]) ?? 0,
        col: Int(components[1]) ?? 0
      )
    }

  // 更新受影响的单元格
  for position in uniqueAffectedCells {
    var cell = board[position.row][position.col]
    let candidates = getCandidates(board, position.row, position.col)
    updateCellDraft(cell: &cell, value: value, candidates: candidates, isUndo: isUndo)
    // 将修改后的cell重新赋值给board
    board[position.row][position.col] = cell
  }

  return uniqueAffectedCells
}

func isValid(board: [[CellData]], row: Int, col: Int, num: Int) -> Bool {
  // 检查行
  for x in 0..<9 {
    if board[row][x].value == num {
      return false
    }
  }

  // 检查列
  for x in 0..<9 {
    if board[x][col].value == num {
      return false
    }
  }

  // 检查3x3方格
  let startRow = (row / 3) * 3
  let startCol = (col / 3) * 3
  for i in 0..<3 {
    for j in 0..<3 {
      if board[i + startRow][j + startCol].value == num {
        return false
      }
    }
  }

  return true
}

func updateCellDraft(
  cell: inout CellData,
  value: Int,
  candidates: [Int],
  isUndo: Bool
) {
  if isUndo {
    // 如果是撤销操作，添加候选数字
    if candidates.contains(value) && !cell.draft.contains(value) {
      cell.draft.append(value)
      cell.draft.sort()  // Swift中的sort默认就是升序排列
    }
  } else {
    // 如果是填入数字操作，移除候选数字
    cell.draft = cell.draft.filter { $0 != value }
  }
}

func createGraph(board: [[CellData]], candidateMap: CandidateMap) -> Graph {
  var graph: Graph = [:]

  for num in 1...9 {
    let candidates = candidateMap[num]?.all ?? []
    var subGraphs: [[GraphNode]] = []
    var visited: [String: Set<String>] = [:]

    for i in 0..<candidates.count {
      let startKey = "\(candidates[i].row),\(candidates[i].col)"
      if visited[startKey] == nil {
        var subGraph: [GraphNode] = []
        var queue: [GraphNode] = [
          GraphNode(
            row: candidates[i].row,
            col: candidates[i].col,
            candidates: candidates[i].candidates,
            next: []
          )
        ]
        visited[startKey] = Set<String>()

        while !queue.isEmpty {
          let current = queue.removeFirst()

          subGraph.append(current)

          for j in 0..<candidates.count {
            let position1 = Position(row: current.row, col: current.col)
            let position2 = Position(row: candidates[j].row, col: candidates[j].col)
            let key1 = "\(position1.row),\(position1.col)"
            let key2 = "\(position2.row),\(position2.col)"

            if isUnitStrongLink(
              board: board,
              position1: Position(row: position1.row, col: position1.col),
              position2: Position(row: position2.row, col: position2.col),
              num: num,
              candidateMap: candidateMap
            ) {
              let newNodeIndex = subGraph.firstIndex(where: {
                $0.row == position2.row && $0.col == position2.col
              })

              var newNode: GraphNode
              if let idx = newNodeIndex {
                newNode = subGraph[idx]
              } else {
                newNode = GraphNode(
                  row: position2.row,
                  col: position2.col,
                  candidates: candidates[j].candidates,
                  next: []
                )
                subGraph.append(newNode)
              }

              // 找到current在subGraph中的索引
              if let currentIdx = subGraph.firstIndex(where: {
                $0.row == current.row && $0.col == current.col
              }) {
                // 检查是否已经存在连接
                if !subGraph[currentIdx].next.contains(where: {
                  $0.row == newNode.row && $0.col == newNode.col
                }) {
                  subGraph[currentIdx].next.append(newNode)
                }
              }

              // 找到newNode在subGraph中的索引
              if let newIdx = subGraph.firstIndex(where: {
                $0.row == newNode.row && $0.col == newNode.col
              }) {
                // 检查是否已经存在连接
                if !subGraph[newIdx].next.contains(where: {
                  $0.row == current.row && $0.col == current.col
                }) {
                  subGraph[newIdx].next.append(current)
                }
              }

              if visited[key2] == nil || !(visited[key2]?.contains(key1) ?? false) {
                if let idx = subGraph.firstIndex(where: {
                  $0.row == newNode.row && $0.col == newNode.col
                }) {
                  queue.append(subGraph[idx])
                }

                if visited[key2] == nil {
                  visited[key2] = Set<String>()
                }
                visited[key2]?.insert(key1)
              }

              if visited[key1] == nil || !(visited[key1]?.contains(key2) ?? false) {
                if visited[key1] == nil {
                  visited[key1] = Set<String>()
                }
                visited[key1]?.insert(key2)
              }
            }
          }
        }

        if !subGraph.isEmpty {
          var visitedNodes = Set<String>()
          var nodeQueue = [subGraph[0]]
          var nodeCount = 0

          while !nodeQueue.isEmpty && nodeCount < 3 {
            let currentNode = nodeQueue.removeFirst()
            let nodeKey = "\(currentNode.row)-\(currentNode.col)"

            if !visitedNodes.contains(nodeKey) {
              visitedNodes.insert(nodeKey)
              nodeCount += 1

              for nextNode in currentNode.next {
                nodeQueue.append(nextNode)
              }
            }
          }

          if nodeCount >= 2 {
            subGraphs.append(subGraph)
          }
        }
      }
    }

    if !subGraphs.isEmpty {
      graph[num] = subGraphs.map { $0[0] }
    }
  }

  return graph
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
          position1: Position(row: pos1.row, col: pos1.col),
          position2: Position(row: pos2.row, col: pos2.col),
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
        for pos in boxData.positions {
          if rowGroups[pos.row] == nil {
            rowGroups[pos.row] = []
          }
          rowGroups[pos.row]?.append(pos)
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
      }

      // 按列分组
      var colGroups: [Int: [Candidate]] = [:]
      for pos in boxData.positions {
        if colGroups[pos.col] == nil {
          colGroups[pos.col] = []
        }
        colGroups[pos.col]?.append(pos)
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

func updateCandidateMap(_ board: [[CellData]]) -> (
  CandidateMap, Graph, HyperGraph, globalNodeMap: [String: HyperGraphNode]
) {
  var candidateMap: CandidateMap = [:]

  // 初始化candidateMap
  for num in 1...9 {
    candidateMap[num] = (
      row: [:],
      col: [:],
      box: [:],
      all: []
    )
  }

  // 填充candidateMap
  for rowIndex in 0..<board.count {
    for colIndex in 0..<board[rowIndex].count {
      let cell = board[rowIndex][colIndex]

      if cell.value == nil {
        let boxIndex = (rowIndex / 3) * 3 + (colIndex / 3)
        let candidate = Candidate(row: rowIndex, col: colIndex, candidates: cell.draft)

        for num in cell.draft {
          // 更新行统计
          var rowStats =
            candidateMap[num]?.row[rowIndex] ?? CandidateStats(count: 0, positions: [])
          rowStats.count += 1
          rowStats.positions.append(candidate)
          candidateMap[num]?.row[rowIndex] = rowStats

          // 更新列统计
          var colStats =
            candidateMap[num]?.col[colIndex] ?? CandidateStats(count: 0, positions: [])
          colStats.count += 1
          colStats.positions.append(candidate)
          candidateMap[num]?.col[colIndex] = colStats

          // 更新宫格统计
          var boxStats =
            candidateMap[num]?.box[boxIndex] ?? CandidateStats(count: 0, positions: [])
          boxStats.count += 1
          boxStats.positions.append(candidate)
          candidateMap[num]?.box[boxIndex] = boxStats

          // 更新all数组
          candidateMap[num]?.all.append(candidate)
        }
      }
    }
  }

  let startTime1 = CACurrentMediaTime()
  let graph = createGraph(board: board, candidateMap: candidateMap)
  let endTime1 = CACurrentMediaTime()
  let duration1 = (endTime1 - startTime1) * 1000
  // print("graph: \(duration1) 毫秒")

  //   let startTime2 = CACurrentMediaTime()
  //   let (hyperGraph, globalNodeMap) = createHyperGraph(board: board, candidateMap: candidateMap)
  //   let endTime2 = CACurrentMediaTime()
  //   let duration2 = (endTime2 - startTime2) * 1000
  //   print("hyperGraph: \(duration2) 毫秒")
  return (candidateMap, graph, hyperGraph: [:], globalNodeMap: [:])
}
