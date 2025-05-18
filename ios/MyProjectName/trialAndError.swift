// 试数法(DIY版本)
func trialAndErrorDIY(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap
) -> [String: Any]? {
  var minLength = 10
  var minPosition: Position? = nil
  var minValue: Int? = nil

  for row in 0..<9 {
    for col in 0..<9 {
      let cell = board[row][col]
      if cell.value == nil && !cell.draft.isEmpty {
        if cell.draft.count < minLength {
          minLength = cell.draft.count
          minPosition = Position(row: row, col: col)
          minValue = board[row][col].draft[0]
        }
      }
    }
  }

  if let minPosition = minPosition, let minValue = minValue {
    return [
      "position": [["row": minPosition.row, "col": minPosition.col]],
      "prompt": [["row": minPosition.row, "col": minPosition.col]],
      "method": SolutionMethods.TRIAL_AND_ERROR,
      "target": [minValue],
      "isFill": true,
    ]
  }

  return nil
}

// 试数法(答案辅助版本)
func trialAndError(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  guard let answerBoard = answerBoard else { return nil }

  var minLength = 10
  var minPosition: Position? = nil
  var minValue: Int? = nil

  for row in 0..<9 {
    for col in 0..<9 {
      let cell = board[row][col]
      if cell.value == nil && !cell.draft.isEmpty {
        if cell.draft.count < minLength {
          minLength = cell.draft.count
          minPosition = Position(row: row, col: col)
          minValue = answerBoard[row][col].value
        }
      }
    }
  }

  if let minPosition = minPosition, let minValue = minValue {
    return [
      "position": [["row": minPosition.row, "col": minPosition.col]],
      "prompt": [["row": minPosition.row, "col": minPosition.col]],
      "method": SolutionMethods.TRIAL_AND_ERROR,
      "target": [minValue],
      "isFill": true,
    ]
  }

  return nil
}
