import Foundation
import QuartzCore
import React

typealias GlobalNodeMap = [String: HyperGraphNode]
// MARK: - 主函数
@objc(Solver)
class Solver: NSObject {

  @objc
  static func moduleName() -> String! {
    return "Solver"
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  // 工具函数 - 深拷贝棋盘
  func deepCopyBoard(_ board: [[CellData]]) -> [[CellData]] {
    return board.map { $0.map { $0 } }
  }

  // 工具函数 - 复制官方草稿
  func copyOfficialDraft(_ board: [[CellData]]) -> [[CellData]] {
    var newBoard: [[CellData]] = []

    for rowIndex in 0..<board.count {
      var newRow: [CellData] = []
      for colIndex in 0..<board[rowIndex].count {
        let cell = board[rowIndex][colIndex]
        let draft = getCandidates(board: board, row: rowIndex, col: colIndex)

        newRow.append(
          CellData(
            value: cell.value,
            isGiven: cell.isGiven,
            draft: draft
          ))
      }
      newBoard.append(newRow)
    }

    return newBoard
  }

  func convertToBoard(_ board: String) -> [[CellData]] {
    var result: [[CellData]] = []

    for i in 0..<9 {
      var row: [CellData] = []
      for j in 0..<9 {
        let boardChars = Array(board)
        let valueString = String(boardChars[i * 9 + j])
        let value = Int(valueString) != 0 ? Int(valueString) : nil
        row.append(
          CellData(
            value: value,
            isGiven: value != nil,
            draft: []
          ))
      }
      result.append(row)
    }
    return result
  }

  func convertToAnswer(_ board: String) -> [[CellData]] {
    var result: [[CellData]] = []

    for i in 0..<9 {
      var row: [CellData] = []
      for j in 0..<9 {
        let boardChars = Array(board)
        let valueString = String(boardChars[i * 9 + j])
        let value = Int(valueString) != 0 ? Int(valueString) : nil
        row.append(
          CellData(
            value: value,
            isGiven: value != nil,
            draft: []
          ))
      }
      result.append(row)
    }
    return result
  }

  @objc
  func solve(
    _ boardArray: NSArray,
    answerArray: NSArray,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    // 将NSDictionary数组转换为CellData数组
    var board: [[CellData]] = []
    var answer: [[CellData]] = []
    for i in 0..<boardArray.count {
      guard let row = boardArray[i] as? NSArray else { continue }
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

    for i in 0..<answerArray.count {
      guard let row = answerArray[i] as? NSArray else { continue }
      var cellDataRow: [CellData] = []

      for j in 0..<row.count {
        guard let cellDict = row[j] as? [String: Any] else { continue }

        let value = cellDict["value"] as? Int
        let isGiven = cellDict["isGiven"] as? Bool ?? false
        let draft = cellDict["draft"] as? [Int] ?? []

        let cellData = CellData(value: value, isGiven: isGiven, draft: draft)
        cellDataRow.append(cellData)
      }

      answer.append(cellDataRow)
    }

    // 使用现有逻辑处理转换后的数据
    let solveFunctions:
      [(
        ([[CellData]], CandidateMap, Graph, HyperGraph, GlobalNodeMap, [[CellData]]?) -> [String:
          Any]?
      )] = [
        singleCandidate,
        hiddenSingle,
        blockElimination,
        nakedPair,
        nakedTriple1,
        nakedTriple2,
        hiddenPair,
        hiddenTriple,
        xWing,
        xWingVarient,
        xyWing,
        xyzWing,
        skyscraper,
        skyscraper2,
        nakedQuadruple,
        swordfish,
        jellyfish,
        Loop,
        uniqueRectangle,
        binaryUniversalGrave,
        combinationChain,
        doubleColorChain,
        tripleColorChain,
        trialAndError,
      ]

    var counts = board.reduce(0) { acc, row in
      acc + row.filter { $0.value != nil }.count
    }

    var (candidateMap, graph, hyperGraph, globalNodeMap) = updateCandidateMap(board)
    var result: [String: Any]?

    let startTime = CACurrentMediaTime()
    for i in 0..<solveFunctions.count {
      result = solveFunctions[i](board, candidateMap, graph, hyperGraph, globalNodeMap, answer)
      if result != nil {
        break
      }
    }

    // 返回结果
    if let result = result {
      let endTime = CACurrentMediaTime()
      let duration = (endTime - startTime) * 1000
      print("Time taken: \(duration) 毫秒")
      resolver(result)
    } else {
      resolver(NSNull())
    }
  }

  @objc
  func rate(
    _ boardArray: NSArray,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    var board: [[CellData]] = []
    for i in 0..<boardArray.count {
      guard let row = boardArray[i] as? NSArray else { continue }
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

    board = copyOfficialDraft(board)

    let startTime = CACurrentMediaTime()
    let solveFunctions:
      [(
        ([[CellData]], CandidateMap, Graph, HyperGraph, GlobalNodeMap, [[CellData]]?) -> [String:
          Any]?
      )] = [
        singleCandidate,
        hiddenSingle,
        blockElimination,
        nakedPair,
        nakedTriple1,
        nakedTriple2,
        hiddenPair,
        hiddenTriple,
        xWing,
        xWingVarient,
        xyWing,
        xyzWing,
        skyscraper,
        skyscraper2,
        nakedQuadruple,
        swordfish,
        jellyfish,
        Loop,
        uniqueRectangle,
        binaryUniversalGrave,
        combinationChain,
        doubleColorChain,
        tripleColorChain,
      ]

    var map: [String: Int] = [:]

    var counts = board.reduce(0) { acc, row in
      acc + row.filter { $0.value != nil }.count
    }

    var (candidateMap, graph, hyperGraph, globalNodeMap) = updateCandidateMap(board)
    var result: [String: Any]?

    while counts != 81 {
      var j: Int = 0
      for i in 0..<solveFunctions.count {
        result = solveFunctions[i](board, candidateMap, graph, hyperGraph, globalNodeMap, nil)
        j = i
        if result != nil {
          break
        }
      }

      if result == nil && counts != 81 {
        return
      }

      if let result = result {
        // print(result["method"] as! String)
        // print(result)
        map[result["method"] as! String] = (map[result["method"] as! String] ?? 0) + 1

        if map[SolutionMethods.DOUBLE_COLOR_CHAIN] != nil
          || map[SolutionMethods.TRIPLE_COLOR_CHAIN] != nil
        {
          let endTime = CACurrentMediaTime()
          let duration = (endTime - startTime) * 1000
          print("Time taken: \(duration) 毫秒")
          print("提前终止")
          resolver("e")
          return
        }

        let positionDicts = result["position"] as! [[String: Any]]
        var position: [Position] = []
        for dict in positionDicts {
          let row = dict["row"] as! Int
          let col = dict["col"] as! Int
          position.append(Position(row: row, col: col))
        }
        var target = result["target"] as! [Int]
        let isFill = result["isFill"] as! Bool

        // 如果是XY链，只取最后一个目标值
        if result["method"] as! String == SolutionMethods.XY_WING {
          target = [target.last!]
        }

        if isFill {
          counts += 1
        }

        var newBoard = deepCopyBoard(board)

        // 更新棋盘
        var falseSolutionMap: [Int: String] = [:]

        // 循环遍历position数组（不使用动态扩展的方式）
        for pos in position {
          if isFill {
            // 更新单元格值并清空草稿
            newBoard[pos.row][pos.col].value = target[0]
            newBoard[pos.row][pos.col].draft = []

            // 更新受影响的单元格
            let affectedCells = updateRelatedCellsDraft(
              board: &newBoard, positions: [pos], value: target[0], getCandidates: getCandidates)

            // 将新的受影响单元格添加到position中
            position.append(contentsOf: affectedCells)
          } else {

            // 从草稿中移除目标值
            newBoard[pos.row][pos.col].draft = newBoard[pos.row][pos.col].draft.filter {
              !target.contains($0)
            }
          }
        }

        board = newBoard
        (candidateMap, graph, hyperGraph, globalNodeMap) = updateCandidateMap(board)
        continue
      }

      if counts == 70 {
        break
      }
    }

    let endTime = CACurrentMediaTime()
    let duration = (endTime - startTime) * 1000
    print("Time taken: \(duration) 毫秒")
    print(map)

    // 根据map里的方法区分难度等级
    if map[SolutionMethods.DOUBLE_COLOR_CHAIN] != nil
      || map[SolutionMethods.TRIPLE_COLOR_CHAIN] != nil
    {
      resolver("e")
      return
    }

    if map[SolutionMethods.SKYSCRAPER] != nil || map[SolutionMethods.SKYSCRAPER2] != nil
      || map[SolutionMethods.COMBINATION_CHAIN] != nil || map[SolutionMethods.SWORDFISH_ROW] != nil
      || map[SolutionMethods.SWORDFISH_COLUMN] != nil
      || map[SolutionMethods.SWORDFISH_WITH_FIN_ROW] != nil
      || map[SolutionMethods.SWORDFISH_WITH_FIN_COLUMN] != nil
      || map[SolutionMethods.WXYZ_WING] != nil || map[SolutionMethods.LOOP] != nil
      || map[SolutionMethods.UNIQUE_RECTANGLE] != nil
      || map[SolutionMethods.BINARY_UNIVERSAL_GRAVE] != nil
      || map[SolutionMethods.JELLYFISH_ROW] != nil || map[SolutionMethods.JELLYFISH_COLUMN] != nil
      || map[SolutionMethods.TWO_STRONG_LINKS] != nil
      || map[SolutionMethods.THREE_STRONG_LINKS] != nil || map[SolutionMethods.X_CHAIN] != nil
      || map[SolutionMethods.TWO_STRING_KITE] != nil
    {
      resolver("d")
      return
    }

    if map[SolutionMethods.BLOCK_ELIMINATION_ROW] != nil
      || map[SolutionMethods.BLOCK_ELIMINATION_COLUMN] != nil
      || map[SolutionMethods.BLOCK_ELIMINATION_BOX_ROW] != nil
      || map[SolutionMethods.BLOCK_ELIMINATION_BOX_COLUMN] != nil
      || map[SolutionMethods.NAKED_PAIR_ROW] != nil || map[SolutionMethods.NAKED_PAIR_COLUMN] != nil
      || map[SolutionMethods.NAKED_PAIR_BOX] != nil || map[SolutionMethods.NAKED_TRIPLE_ROW1] != nil
      || map[SolutionMethods.NAKED_TRIPLE_COLUMN1] != nil
      || map[SolutionMethods.NAKED_TRIPLE_BOX1] != nil
      || map[SolutionMethods.NAKED_TRIPLE_ROW2] != nil
      || map[SolutionMethods.NAKED_TRIPLE_COLUMN2] != nil
      || map[SolutionMethods.NAKED_TRIPLE_BOX2] != nil
      || map[SolutionMethods.HIDDEN_PAIR_ROW] != nil
      || map[SolutionMethods.HIDDEN_PAIR_COLUMN] != nil
      || map[SolutionMethods.HIDDEN_PAIR_BOX] != nil
      || map[SolutionMethods.HIDDEN_TRIPLE_ROW] != nil
      || map[SolutionMethods.HIDDEN_TRIPLE_COLUMN] != nil
      || map[SolutionMethods.HIDDEN_TRIPLE_BOX] != nil
      || map[SolutionMethods.NAKED_QUADRUPLE_ROW] != nil
      || map[SolutionMethods.NAKED_QUADRUPLE_COLUMN] != nil
      || map[SolutionMethods.NAKED_QUADRUPLE_BOX] != nil || map[SolutionMethods.X_WING_ROW] != nil
      || map[SolutionMethods.X_WING_COLUMN] != nil || map[SolutionMethods.X_WING_VARIENT_ROW] != nil
      || map[SolutionMethods.X_WING_VARIENT_COLUMN] != nil || map[SolutionMethods.XY_WING] != nil
      || map[SolutionMethods.XYZ_WING] != nil
    {
      resolver("c")
      return
    }

    if map[SolutionMethods.BLOCK_ELIMINATION_ROW] != nil
      || map[SolutionMethods.BLOCK_ELIMINATION_COLUMN] != nil
      || map[SolutionMethods.BLOCK_ELIMINATION_BOX_ROW] != nil
      || map[SolutionMethods.BLOCK_ELIMINATION_BOX_COLUMN] != nil
    {
      resolver("b")
      return
    }

    resolver("a")
  }

}
