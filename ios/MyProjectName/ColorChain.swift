import Foundation
import React

// 位置结构体
struct Position: Hashable {
    let row: Int
    let col: Int
}

// 候选数据结构体 - 改为 public
public struct Candidate {
    let row: Int
    let col: Int
    let candidates: [Int]
}

// 候选统计结构体 - 改为 public
public struct CandidateStats {
    var count: Int
    var positions: [Candidate]
}

// 候选映射字典类型 - 改为 public
public typealias CandidateMap = [Int: (
    row: [Int: CandidateStats],
    col: [Int: CandidateStats],
    box: [Int: CandidateStats],
    all: [Candidate]
)]

// 已经是 public 类型
public struct CellData {
    let value: Int?
    let isGiven: Bool
    let draft: [Int]
}

// 结果结构体
struct Result {
    let isFill: Bool
    let position: [Position]
    let prompt: [Position]
    let method: String
    let target: [Int]
    var rows: [Int]?
    var cols: [Int]?
    var row: Int?
    var col: Int?
    var box: Int?
    var isWeakLink: Bool?
    var chainStructure: String?
    var label: String?
    var highlightPromts1: [HighlightPrompt]?
    var highlightPromts2: [HighlightPrompt]?
    var highlightPromts3: [HighlightPrompt]?
    var highlightDeletes: [HighlightDelete]?
}

struct HighlightPrompt {
    let row: Int
    let col: Int
    let value: Int?
}

struct HighlightDelete {
    let row: Int
    let col: Int
    let value: [Int]?
}

// 节点类
class Node {
    let row: Int
    let col: Int
    let value: Int?
    var noValue: [Int]
    var sons1: [Node] = []
    var sons2: [Node] = []
    var sons3: [Node] = []
    var father: Node?
    let depth: Int
    let label: String

    init(
        row: Int, col: Int, value: Int?, depth: Int, father: Node? = nil, noValue: [Int] = [],
        label: String = ""
    ) {
        self.row = row
        self.col = col
        self.value = value
        self.depth = depth
        self.father = father
        self.noValue = noValue
        self.label = label
    }
}

class GraphNode {
    var row: Int
    var col: Int
    var candidates: [Int]
    var next: [GraphNode]

    init(row: Int, col: Int, candidates: [Int], next: [GraphNode] = []) {
        self.row = row
        self.col = col
        self.candidates = candidates
        self.next = next
    }
}

// 图结构类型定义
typealias Graph = [Int: [GraphNode]]

@objc(ColorChain)
class ColorChain: NSObject {
    // 实现 RCTBridgeModule 协议所需的静态方法
    @objc
    static func moduleName() -> String! {
        return "ColorChain"
    }

    // 暴露方法给 JavaScript
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }

    private var solveFunctions:
        [(
            _ board: [[CellData]],
            _ candidateMap: CandidateMap,
            _ graph: Graph
        ) -> [String: Any]?] = []

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

        let candidateMap = updateCandidateMap(board: board)
        let graph = createGraph(board: board, candidateMap: candidateMap)
        print("123")

        var result = doubleColorChain(
            board: board,
            candidateMap: candidateMap,
            graph: graph
        )
        print("result1", result)
        if result != nil {
            resolver(result ?? NSNull())
            return
        }
        result = tripleColorChain(
            board: board,
            candidateMap: candidateMap,
            graph: graph
        )
        print("result2", result)
        resolver(result ?? NSNull())
    }

    func doubleColorChain(
        board: [[CellData]],
        candidateMap: CandidateMap,
        graph: Graph
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
                        let rootA = Node(row: row, col: col, value: a, depth: 1, noValue: [b])
                        let rootB = Node(row: row, col: col, value: b, depth: 1, noValue: [a])
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
                            self.buildChainTree(
                                node: rootA, board: board, candidateMap: candidateMap,
                                graph: graph,
                                depth: 6, visitedMap: &visitedMapA)
                            group.leave()
                        }

                        // 并行执行第二个buildChainTree
                        group.enter()
                        queue.async {
                            self.buildChainTree(
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

                                let isInSameUnit = self.areCellsInSameUnit(
                                    pos1: Position(row: nodeA.row, col: nodeA.col),
                                    pos2: Position(row: nodeB.row, col: nodeB.col)
                                )

                                // 情况一：如果两个方格填入相同的数字，检查共同影响区
                                if let valueA = nodeA.value, let valueB = nodeB.value,
                                    valueA == valueB,
                                    !(nodeA.row == nodeB.row && nodeA.col == nodeB.col)
                                {

                                    // 找到共同影响区域
                                    let commonUnits = self.findCommonAffectedPositions(
                                        pos1: Position(row: nodeA.row, col: nodeA.col),
                                        pos2: Position(row: nodeB.row, col: nodeB.col),
                                        board: board,
                                        num: valueA)

                                    if !commonUnits.isEmpty {
                                        // 获取两个节点的所有祖先
                                        let ancestorsResultA = self.getAncestors(node: nodeA)
                                        let ancestorsA = ancestorsResultA.ancestors
                                        let rootA = ancestorsResultA.root
                                        let labelA = ancestorsResultA.label

                                        let ancestorsResultB = self.getAncestors(node: nodeB)
                                        let ancestorsB = ancestorsResultB.ancestors
                                        let rootB = ancestorsResultB.root
                                        let labelB = ancestorsResultB.label

                                        // 检查是否有重复的祖先
                                        let hasDuplicate = false  // 简化实现
                                        if hasDuplicate { continue }

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
                                            "highlightDeletes": highlightDeletes,
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
                                        let ancestorsResultA = self.getAncestors(node: nodeA)
                                        let ancestorsA = ancestorsResultA.ancestors
                                        let rootA = ancestorsResultA.root
                                        let labelA = ancestorsResultA.label

                                        let ancestorsResultB = self.getAncestors(node: nodeB)
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
                                        let ancestorsResultA = self.getAncestors(node: nodeA)
                                        let ancestorsA = ancestorsResultA.ancestors
                                        let rootA = ancestorsResultA.root
                                        let labelA = ancestorsResultA.label

                                        let ancestorsResultB = self.getAncestors(node: nodeB)
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
                                        let ancestorsResultA = self.getAncestors(node: nodeA)
                                        let ancestorsA = ancestorsResultA.ancestors
                                        let rootA = ancestorsResultA.root
                                        let labelA = ancestorsResultA.label

                                        let ancestorsResultB = self.getAncestors(node: nodeB)
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

    // 判断两个位置是否在同一个单元（行、列或宫）
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

    // 找到两个位置的共同影响单元格
    func findCommonAffectedPositions(
        pos1: Position, pos2: Position, board: [[CellData]], num: Int
    ) -> [Position] {
        var affectedPositions: [Position] = []

        for row in 0..<9 {
            for col in 0..<9 {
                if (row == pos1.row && col == pos1.col) || (row == pos2.row && col == pos2.col) {
                    continue
                }

                let cell = board[row][col]
                if cell.value == nil && cell.draft.contains(num) {
                    if areCellsInSameUnit(
                        pos1: Position(row: row, col: col), pos2: pos1)
                        && areCellsInSameUnit(pos1: Position(row: row, col: col), pos2: pos2)
                    {
                        affectedPositions.append(Position(row: row, col: col))
                    }
                }
            }
        }

        return affectedPositions
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

    func updateStats(map: inout [Int: CandidateStats], index: Int, candidate: Candidate) {
        if map[index] == nil {
            map[index] = CandidateStats(count: 0, positions: [])
        }

        map[index]?.count += 1
        map[index]?.positions.append(candidate)
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
                                position1: position1,
                                position2: position2,
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

                                if visited[key2] == nil || !(visited[key2]?.contains(key1) ?? false)
                                {
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

                                if visited[key1] == nil || !(visited[key1]?.contains(key2) ?? false)
                                {
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

        if position1.row == position2.row {
            flag1 = candidateMap[num]?.row[position1.row]?.count == 2
        }

        if position1.col == position2.col {
            flag2 = candidateMap[num]?.col[position1.col]?.count == 2
        }

        if position1.row / 3 == position2.row / 3 && position1.col / 3 == position2.col / 3 {
            let boxIndex = (position1.row / 3) * 3 + (position1.col / 3)
            flag3 = candidateMap[num]?.box[boxIndex]?.count == 2
        }

        return flag1 || flag2 || flag3
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

    // ... existing code ...

    func tripleColorChain(
        board: [[CellData]],
        candidateMap: CandidateMap,
        graph: Graph
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
                            self.buildChainTree(
                                node: rootA, board: board, candidateMap: candidateMap, graph: graph,
                                depth: 5, visitedMap: &visitedMapA)
                            group.leave()
                        }

                        // 并行执行第二个buildChainTree
                        group.enter()
                        queue.async {
                            self.buildChainTree(
                                node: rootB, board: board, candidateMap: candidateMap, graph: graph,
                                depth: 5, visitedMap: &visitedMapB)
                            group.leave()
                        }

                        // 并行执行第三个buildChainTree
                        group.enter()
                        queue.async {
                            self.buildChainTree(
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
                                            let isHasDuplicate = false  // 简化实现
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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
                                                    [
                                                        "row": $0.row, "col": $0.col,
                                                        "value": $0.value,
                                                    ]
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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
                                                "prompt": (ancestorsA + ancestorsB + ancestorsC).map
                                                {
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

}
