// 唯一矩形算法
func uniqueRectangle(
  board: [[CellData]],
  candidateMap: CandidateMap,
  graph: Graph,
  hyperGraph: HyperGraph,
  globalNodeMap: GlobalNodeMap,
  answerBoard: [[CellData]]?
) -> [String: Any]? {
  for num in 1...9 {
    // 标准型: ab-ab-ab-abc
    for row in 0..<9 {
      if let rowStats = candidateMap[num]?.row[row], rowStats.count == 2 {
        let cell1 = rowStats.positions.first
        let cell2 = rowStats.positions.last

        if let cell1 = cell1, let cell2 = cell2,
          cell1.candidates.count == 2 && cell2.candidates.count == 2,
          cell1.candidates == cell2.candidates
        {

          let col1 = cell1.col
          let col2 = cell2.col
          let a = cell1.candidates[0]
          let b = cell1.candidates[1]

          if (candidateMap[num]?.col[col1]?.count == 2)
            || (candidateMap[num]?.col[col2]?.count == 2)
          {

            var cell3: Candidate?
            var cell4: Candidate?

            if candidateMap[num]?.col[col1]?.count == 2 {
              if candidateMap[num]?.col[col1]?.positions[0].row == cell1.row {
                cell3 = candidateMap[num]?.col[col1]?.positions[1]
                if let cell3Row = cell3?.row {
                  cell4 = Candidate(
                    row: cell3Row,
                    col: cell2.col,
                    candidates: board[cell3Row][cell2.col].draft
                  )
                }
              } else {
                cell3 = candidateMap[num]?.col[col1]?.positions[0]
                if let cell3Row = cell3?.row {
                  cell4 = Candidate(
                    row: cell3Row,
                    col: cell2.col,
                    candidates: board[cell3Row][cell2.col].draft
                  )
                }
              }
            } else if candidateMap[num]?.col[col2]?.count == 2 {
              if candidateMap[num]?.col[col2]?.positions[0].row == cell2.row {
                cell3 = candidateMap[num]?.col[col2]?.positions[1]
                if let cell3Row = cell3?.row {
                  cell4 = Candidate(
                    row: cell3Row,
                    col: cell1.col,
                    candidates: board[cell3Row][cell1.col].draft
                  )
                }
              } else {
                cell3 = candidateMap[num]?.col[col2]?.positions[0]
                if let cell3Row = cell3?.row {
                  cell4 = Candidate(
                    row: cell3Row,
                    col: cell1.col,
                    candidates: board[cell3Row][cell1.col].draft
                  )
                }
              }
            }

            if cell3?.row != cell4?.row { continue }

            if let cell3 = cell3, let cell4 = cell4 {
              let box1 = (cell1.row / 3) * 3 + (cell1.col / 3)
              let box2 = (cell2.row / 3) * 3 + (cell2.col / 3)
              let box3 = (cell3.row / 3) * 3 + (cell3.col / 3)
              let box4 = (cell4.row / 3) * 3 + (cell4.col / 3)
              let boxArray = [box1, box2, box3, box4]
              let boxSet = Set(boxArray)

              if cell3.candidates == cell1.candidates && cell4.candidates.contains(a)
                && cell4.candidates.contains(b) && cell4.candidates.count > 2 && boxSet.count == 2
              {

                let positionDicts = [["row": cell4.row, "col": cell4.col]]
                let promptDicts = [
                  ["row": cell1.row, "col": cell1.col],
                  ["row": cell2.row, "col": cell2.col],
                  ["row": cell3.row, "col": cell3.col],
                ]

                return [
                  "isFill": false,
                  "position": positionDicts,
                  "prompt": promptDicts,
                  "method": SolutionMethods.UNIQUE_RECTANGLE,
                  "target": [a, b],
                  "label": "ab-ab-ab-abc",
                ]
              }
            }
          }
        }
      }
    }

    // ab-ab-abc-abc行
    for row in 0..<9 {
      if let rowStats = candidateMap[num]?.row[row], rowStats.count == 2 {
        let cell1 = rowStats.positions.first
        let cell2 = rowStats.positions.last

        if let cell1 = cell1, let cell2 = cell2,
          cell1.candidates.count == 2 && cell2.candidates.count == 2,
          cell1.candidates == cell2.candidates
        {

          let col1 = cell1.col
          let col2 = cell2.col
          let a = cell1.candidates[0]
          let b = cell1.candidates[1]

          for row2 in 0..<9 {
            if row2 == row { continue }

            if board[row2][col1].draft.count == 3
              && board[row2][col1].draft == board[row2][col2].draft
              && board[row2][col1].draft.contains(a) && board[row2][col2].draft.contains(b)
            {

              let cell3 = Candidate(
                row: row2,
                col: col1,
                candidates: board[row2][col1].draft
              )

              let cell4 = Candidate(
                row: row2,
                col: col2,
                candidates: board[row2][col2].draft
              )

              guard let c = cell3.candidates.first(where: { $0 != a && $0 != b }) else { continue }

              let affectedCells = findCommonAffectedPositions(
                pos1: Position(row: cell3.row, col: cell3.col),
                pos2: Position(row: cell4.row, col: cell4.col),
                board: board,
                num: c
              )

              var deleteCells: [Position] = []
              for cell in affectedCells {
                if board[cell.row][cell.col].draft.contains(c) {
                  deleteCells.append(cell)
                }
              }

              let box1 = (cell1.row / 3) * 3 + (cell1.col / 3)
              let box2 = (cell2.row / 3) * 3 + (cell2.col / 3)
              let box3 = (cell3.row / 3) * 3 + (cell3.col / 3)
              let box4 = (cell4.row / 3) * 3 + (cell4.col / 3)
              let boxArray = [box1, box2, box3, box4]
              let boxSet = Set(boxArray)

              if !deleteCells.isEmpty && boxSet.count == 2 {
                var positionDicts = [[String: Int]]()
                for pos in deleteCells {
                  positionDicts.append(["row": pos.row, "col": pos.col])
                }

                let promptDicts = [
                  ["row": cell1.row, "col": cell1.col],
                  ["row": cell2.row, "col": cell2.col],
                  ["row": cell3.row, "col": cell3.col],
                  ["row": cell4.row, "col": cell4.col],
                ]

                return [
                  "isFill": false,
                  "position": positionDicts,
                  "prompt": promptDicts,
                  "method": SolutionMethods.UNIQUE_RECTANGLE,
                  "target": [c],
                  "label": "ab-ab-abc-abc",
                ]
              }
            }
          }
        }
      }
    }

    // ab-ab-abc-abc列
    for col in 0..<9 {
      if let colStats = candidateMap[num]?.col[col], colStats.count == 2 {
        let cell1 = colStats.positions.first
        let cell2 = colStats.positions.last

        if let cell1 = cell1, let cell2 = cell2,
          cell1.candidates.count == 2 && cell2.candidates.count == 2,
          cell1.candidates == cell2.candidates
        {

          let row1 = cell1.row
          let row2 = cell2.row
          let a = cell1.candidates[0]
          let b = cell1.candidates[1]

          for col2 in 0..<9 {
            if col2 == col { continue }

            if board[row1][col2].draft.count == 3
              && board[row1][col2].draft == board[row2][col2].draft
              && board[row1][col2].draft.contains(a) && board[row2][col2].draft.contains(b)
            {

              let cell3 = Candidate(
                row: row1,
                col: col2,
                candidates: board[row1][col2].draft
              )

              let cell4 = Candidate(
                row: row2,
                col: col2,
                candidates: board[row2][col2].draft
              )

              guard let c = cell3.candidates.first(where: { $0 != a && $0 != b }) else { continue }

              let affectedCells = findCommonAffectedPositions(
                pos1: Position(row: cell3.row, col: cell3.col),
                pos2: Position(row: cell4.row, col: cell4.col),
                board: board,
                num: c
              )

              var deleteCells: [Position] = []
              for cell in affectedCells {
                if board[cell.row][cell.col].draft.contains(c) {
                  deleteCells.append(cell)
                }
              }

              let box1 = (cell1.row / 3) * 3 + (cell1.col / 3)
              let box2 = (cell2.row / 3) * 3 + (cell2.col / 3)
              let box3 = (cell3.row / 3) * 3 + (cell3.col / 3)
              let box4 = (cell4.row / 3) * 3 + (cell4.col / 3)
              let boxArray = [box1, box2, box3, box4]
              let boxSet = Set(boxArray)

              if !deleteCells.isEmpty && boxSet.count == 2 {
                var positionDicts = [[String: Int]]()
                for pos in deleteCells {
                  positionDicts.append(["row": pos.row, "col": pos.col])
                }

                let promptDicts = [
                  ["row": cell1.row, "col": cell1.col],
                  ["row": cell2.row, "col": cell2.col],
                  ["row": cell3.row, "col": cell3.col],
                  ["row": cell4.row, "col": cell4.col],
                ]

                return [
                  "isFill": false,
                  "position": positionDicts,
                  "prompt": promptDicts,
                  "method": SolutionMethods.UNIQUE_RECTANGLE,
                  "target": [c],
                  "label": "ab-ab-abc-abc",
                ]
              }
            }
          }
        }
      }
    }

    // ab-ab-abc-abcd行
    for row in 0..<9 {
      if let rowStats = candidateMap[num]?.row[row], rowStats.count == 2 {
        let cell1 = rowStats.positions.first
        let cell2 = rowStats.positions.last

        if let cell1 = cell1, let cell2 = cell2,
          cell1.candidates.count == 2 && cell2.candidates.count == 2,
          cell1.candidates == cell2.candidates
        {

          let col1 = cell1.col
          let col2 = cell2.col
          let a = cell1.candidates[0]
          let b = cell1.candidates[1]

          for row2 in 0..<9 {
            if row2 == row { continue }

            var cell3: Candidate?
            var cell4: Candidate?

            // 检查第一种情况
            if board[row2][col1].draft.count == 3 && board[row2][col1].draft.contains(a)
              && board[row2][col1].draft.contains(b)
            {

              cell3 = Candidate(
                row: row2,
                col: col1,
                candidates: board[row2][col1].draft
              )
              cell4 = Candidate(
                row: row2,
                col: col2,
                candidates: board[row2][col2].draft
              )
            }
            // 检查第二种情况
            else if board[row2][col2].draft.count == 3 && board[row2][col2].draft.contains(a)
              && board[row2][col2].draft.contains(b)
            {

              cell3 = Candidate(
                row: row2,
                col: col2,
                candidates: board[row2][col2].draft
              )
              cell4 = Candidate(
                row: row2,
                col: col1,
                candidates: board[row2][col1].draft
              )
            }

            if let cell3 = cell3, let cell4 = cell4,
              let other = cell3.candidates.first(where: { $0 != a && $0 != b })
            {

              if cell4.candidates.count == 4 &&
                cell4.candidates.contains(other)
              {

                let remainingCandidates1 = cell4.candidates.filter { $0 != a && $0 != b }
                let remainingCandidates2 = cell3.candidates.filter { $0 != a && $0 != b }

                if remainingCandidates1.count == 2
                  && remainingCandidates1.contains(remainingCandidates2[0])
                {
                  let c = remainingCandidates1[0]
                  let d = remainingCandidates1[1]

                  // 获取行中的空格
                  let affectedCells_Row = getEmptyCellsInRow(row: cell3.row, board: board)
                  var deleteCells: [Position] = []
                  var cell5: Candidate?

                  for cell in affectedCells_Row {
                    if (cell.row == cell3.row && cell.col == cell3.col)
                      || (cell.row == cell4.row && cell.col == cell4.col)
                    {
                      continue
                    }

                    if board[cell.row][cell.col].draft.contains(c)
                      && board[cell.row][cell.col].draft.contains(d)
                      && board[cell.row][cell.col].draft.count == 2
                    {

                      cell5 = Candidate(
                        row: cell.row,
                        col: cell.col,
                        candidates: board[cell.row][cell.col].draft
                      )
                      continue
                    }

                    if board[cell.row][cell.col].draft.count >= 2
                      && (board[cell.row][cell.col].draft.contains(c)
                        || board[cell.row][cell.col].draft.contains(d))
                    {

                      deleteCells.append(cell)
                    }
                  }

                  let box1 = (cell1.row / 3) * 3 + (cell1.col / 3)
                  let box2 = (cell2.row / 3) * 3 + (cell2.col / 3)
                  let box3 = (cell3.row / 3) * 3 + (cell3.col / 3)
                  let box4 = (cell4.row / 3) * 3 + (cell4.col / 3)
                  var boxArray = [box1, box2, box3, box4]
                  var boxSet = Set(boxArray)

                  if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                    var positionDicts = [[String: Int]]()
                    for pos in deleteCells {
                      positionDicts.append(["row": pos.row, "col": pos.col])
                    }

                    let promptDicts = [
                      ["row": cell1.row, "col": cell1.col],
                      ["row": cell2.row, "col": cell2.col],
                      ["row": cell3.row, "col": cell3.col],
                      ["row": cell4.row, "col": cell4.col],
                      ["row": cell5.row, "col": cell5.col],
                    ]

                    return [
                      "isFill": false,
                      "position": positionDicts,
                      "prompt": promptDicts,
                      "method": SolutionMethods.UNIQUE_RECTANGLE,
                      "target": [c, d],
                      "label": "ab-ab-abc-abcd",
                    ]
                  }

                  // 检查宫内的情况
                  deleteCells = []
                  cell5 = nil
                  let affectedCells_Box = getEmptyCellsInBox(
                    pos1: Position(row: cell3.row, col: cell3.col),
                    pos2: Position(row: cell4.row, col: cell4.col),
                    board: board
                  )

                  for cell in affectedCells_Box {
                    if (cell.row == cell3.row && cell.col == cell3.col)
                      || (cell.row == cell4.row && cell.col == cell4.col)
                    {
                      continue
                    }

                    if board[cell.row][cell.col].draft.contains(c)
                      && board[cell.row][cell.col].draft.contains(d)
                      && board[cell.row][cell.col].draft.count == 2
                    {

                      cell5 = Candidate(
                        row: cell.row,
                        col: cell.col,
                        candidates: board[cell.row][cell.col].draft
                      )
                      continue
                    }

                    if board[cell.row][cell.col].draft.count >= 2
                      && (board[cell.row][cell.col].draft.contains(c)
                        || board[cell.row][cell.col].draft.contains(d))
                    {

                      deleteCells.append(cell)
                    }
                  }

                  boxArray = [box1, box2, box3, box4]
                  boxSet = Set(boxArray)

                  if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                    var positionDicts = [[String: Int]]()
                    for pos in deleteCells {
                      positionDicts.append(["row": pos.row, "col": pos.col])
                    }

                    let promptDicts = [
                      ["row": cell1.row, "col": cell1.col],
                      ["row": cell2.row, "col": cell2.col],
                      ["row": cell3.row, "col": cell3.col],
                      ["row": cell4.row, "col": cell4.col],
                      ["row": cell5.row, "col": cell5.col],
                    ]

                    return [
                      "isFill": false,
                      "position": positionDicts,
                      "prompt": promptDicts,
                      "method": SolutionMethods.UNIQUE_RECTANGLE,
                      "target": [c, d],
                      "label": "ab-ab-abc-abcd",
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }

    // ab-ab-abc-abcd列
    for col in 0..<9 {
      if let colStats = candidateMap[num]?.col[col], colStats.count == 2 {
        let cell1 = colStats.positions.first
        let cell2 = colStats.positions.last

        if let cell1 = cell1, let cell2 = cell2,
          cell1.candidates.count == 2 && cell2.candidates.count == 2,
          cell1.candidates == cell2.candidates
        {

          let row1 = cell1.row
          let row2 = cell2.row
          let a = cell1.candidates[0]
          let b = cell1.candidates[1]

          for col2 in 0..<9 {
            if col2 == col { continue }

            var cell3: Candidate?
            var cell4: Candidate?

            // 检查第一种情况
            if board[row1][col2].draft.count == 3 && board[row1][col2].draft.contains(a)
              && board[row1][col2].draft.contains(b)
            {

              cell3 = Candidate(
                row: row1,
                col: col2,
                candidates: board[row1][col2].draft
              )
              cell4 = Candidate(
                row: row2,
                col: col2,
                candidates: board[row2][col2].draft
              )
            }
            // 检查第二种情况
            else if board[row2][col2].draft.count == 3 && board[row2][col2].draft.contains(a)
              && board[row2][col2].draft.contains(b)
            {

              cell3 = Candidate(
                row: row2,
                col: col2,
                candidates: board[row2][col2].draft
              )
              cell4 = Candidate(
                row: row1,
                col: col2,
                candidates: board[row1][col2].draft
              )
            }

            if let cell3 = cell3, let cell4 = cell4,
              let other = cell3.candidates.first(where: { $0 != a && $0 != b })
            {

              if cell4.candidates.count == 4 &&
                cell4.candidates.contains(other)
              {

                let remainingCandidates1 = cell4.candidates.filter { $0 != a && $0 != b }
                let remainingCandidates2 = cell3.candidates.filter { $0 != a && $0 != b }

                if remainingCandidates1.count == 2
                  && remainingCandidates1.contains(remainingCandidates2[0])
                {
                  let c = remainingCandidates1[0]
                  let d = remainingCandidates1[1]

                  // 获取列中的空格
                  let affectedCells_Col = getEmptyCellsInCol(col: cell3.col, board: board)
                  var deleteCells: [Position] = []
                  var cell5: Candidate?

                  for cell in affectedCells_Col {
                    if (cell.row == cell3.row && cell.col == cell3.col)
                      || (cell.row == cell4.row && cell.col == cell4.col)
                    {
                      continue
                    }

                    if board[cell.row][cell.col].draft.contains(c)
                      && board[cell.row][cell.col].draft.contains(d)
                      && board[cell.row][cell.col].draft.count == 2
                    {

                      cell5 = Candidate(
                        row: cell.row,
                        col: cell.col,
                        candidates: board[cell.row][cell.col].draft
                      )
                      continue
                    }

                    if board[cell.row][cell.col].draft.count >= 2
                      && (board[cell.row][cell.col].draft.contains(c)
                        || board[cell.row][cell.col].draft.contains(d))
                    {

                      deleteCells.append(cell)
                    }
                  }

                  let box1 = (cell1.row / 3) * 3 + (cell1.col / 3)
                  let box2 = (cell2.row / 3) * 3 + (cell2.col / 3)
                  let box3 = (cell3.row / 3) * 3 + (cell3.col / 3)
                  let box4 = (cell4.row / 3) * 3 + (cell4.col / 3)
                  var boxArray = [box1, box2, box3, box4]
                  var boxSet = Set(boxArray)

                  if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                    var positionDicts = [[String: Int]]()
                    for pos in deleteCells {
                      positionDicts.append(["row": pos.row, "col": pos.col])
                    }

                    let promptDicts = [
                      ["row": cell1.row, "col": cell1.col],
                      ["row": cell2.row, "col": cell2.col],
                      ["row": cell3.row, "col": cell3.col],
                      ["row": cell4.row, "col": cell4.col],
                      ["row": cell5.row, "col": cell5.col],
                    ]

                    return [
                      "isFill": false,
                      "position": positionDicts,
                      "prompt": promptDicts,
                      "method": SolutionMethods.UNIQUE_RECTANGLE,
                      "target": [c, d],
                      "label": "ab-ab-abc-abcd",
                    ]
                  }

                  // 检查宫内的情况
                  deleteCells = []
                  cell5 = nil
                  let affectedCells_Box = getEmptyCellsInBox(
                    pos1: Position(row: cell3.row, col: cell3.col),
                    pos2: Position(row: cell4.row, col: cell4.col),
                    board: board
                  )

                  for cell in affectedCells_Box {
                    if (cell.row == cell3.row && cell.col == cell3.col)
                      || (cell.row == cell4.row && cell.col == cell4.col)
                    {
                      continue
                    }

                    if board[cell.row][cell.col].draft.contains(c)
                      && board[cell.row][cell.col].draft.contains(d)
                      && board[cell.row][cell.col].draft.count == 2
                    {

                      cell5 = Candidate(
                        row: cell.row,
                        col: cell.col,
                        candidates: board[cell.row][cell.col].draft
                      )
                      continue
                    }

                    if board[cell.row][cell.col].draft.count >= 2
                      && (board[cell.row][cell.col].draft.contains(c)
                        || board[cell.row][cell.col].draft.contains(d))
                    {

                      deleteCells.append(cell)
                    }
                  }

                  boxArray = [box1, box2, box3, box4]
                  boxSet = Set(boxArray)

                  if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                    var positionDicts = [[String: Int]]()
                    for pos in deleteCells {
                      positionDicts.append(["row": pos.row, "col": pos.col])
                    }

                    let promptDicts = [
                      ["row": cell1.row, "col": cell1.col],
                      ["row": cell2.row, "col": cell2.col],
                      ["row": cell3.row, "col": cell3.col],
                      ["row": cell4.row, "col": cell4.col],
                      ["row": cell5.row, "col": cell5.col],
                    ]

                    return [
                      "isFill": false,
                      "position": positionDicts,
                      "prompt": promptDicts,
                      "method": SolutionMethods.UNIQUE_RECTANGLE,
                      "target": [c, d],
                      "label": "ab-ab-abc-abcd",
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }

    // ab-abc-ab-abc
    for row in 0..<8 {
      for col in 0..<9 {
        let cell1 = board[row][col]
        if cell1.draft.count == 2 {
          let a = cell1.draft[0]
          let b = cell1.draft[1]

          for row2 in (row + 1)..<9 {
            for col2 in 0..<9 {
              if col2 == col { continue }

              let cell2 = board[row2][col2]
              if cell2.draft.count == 2 && cell2.draft.contains(a) && cell2.draft.contains(b) {
                let cell3 = board[row][col2]
                let cell4 = board[row2][col]

                if cell3.draft.count == 3 && cell3.draft.contains(a) && cell3.draft.contains(b)
                  && cell3.draft == cell4.draft
                {

                  guard let c = cell3.draft.first(where: { $0 != a && $0 != b }) else { continue }

                  let box1 = (row / 3) * 3 + (col / 3)
                  let box2 = (row2 / 3) * 3 + (col2 / 3)
                  let box3 = (row / 3) * 3 + (col2 / 3)
                  let box4 = (row2 / 3) * 3 + (col / 3)
                  let boxArray = [box1, box2, box3, box4]
                  let boxSet = Set(boxArray)

                  if boxSet.count == 2 {
                    let commonAffectedCells = findCommonAffectedPositions(
                      pos1: Position(row: row, col: col2),
                      pos2: Position(row: row2, col: col),
                      board: board,
                      num: c
                    )

                    var deleteCells: [Position] = []
                    for cell in commonAffectedCells {
                      if board[cell.row][cell.col].draft.contains(c) {
                        deleteCells.append(cell)
                      }
                    }

                    if !deleteCells.isEmpty {
                      var positionDicts = [[String: Int]]()
                      for pos in deleteCells {
                        positionDicts.append(["row": pos.row, "col": pos.col])
                      }

                      let promptDicts = [
                        ["row": row, "col": col],
                        ["row": row2, "col": col2],
                        ["row": row, "col": col2],
                        ["row": row2, "col": col],
                      ]

                      return [
                        "isFill": false,
                        "position": positionDicts,
                        "prompt": promptDicts,
                        "method": SolutionMethods.UNIQUE_RECTANGLE,
                        "target": [c],
                        "label": "ab-abc-ab-abc",
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

    // ab-ab-abc-abd行
    for row in 0..<9 {
      if let rowStats = candidateMap[num]?.row[row], rowStats.count == 2 {
        let cell1 = rowStats.positions.first
        let cell2 = rowStats.positions.last
        
        if let cell1 = cell1, let cell2 = cell2,
           cell1.candidates.count == 2 && cell2.candidates.count == 2,
           cell1.candidates == cell2.candidates 
        {
          let col1 = cell1.col
          let col2 = cell2.col
          let a = cell1.candidates[0]
          let b = cell1.candidates[1]
          
          var cell3: Candidate?
          var cell4: Candidate?
          
          for row2 in 0..<9 {
            if row2 == row { continue }
            
            if board[row2][col1].draft.count == 3 && board[row2][col1].draft.contains(a)
               && board[row2][col1].draft.contains(b) {
               
              cell3 = Candidate(row: row2, col: col1, candidates: board[row2][col1].draft)
              cell4 = Candidate(row: row2, col: col2, candidates: board[row2][col2].draft)
            } 
            else if board[row2][col2].draft.count == 3 && board[row2][col2].draft.contains(a)
                    && board[row2][col2].draft.contains(b) {
                    
              cell3 = Candidate(row: row2, col: col2, candidates: board[row2][col2].draft)
              cell4 = Candidate(row: row2, col: col1, candidates: board[row2][col1].draft)
            }
            
            if let cell3 = cell3, let cell4 = cell4, let other = cell3.candidates.first(where: { $0 != a && $0 != b }) {
              if cell4.candidates.count == 3 && cell4.candidates.contains(a) 
                 && cell4.candidates.contains(b) && !cell4.candidates.contains(other) {
                 
                let remainingCandidates1 = cell4.candidates.filter { $0 != a && $0 != b }
                let remainingCandidates2 = cell3.candidates.filter { $0 != a && $0 != b }
                
                let c = remainingCandidates1[0]
                let d = remainingCandidates2[0]
                
                // 检查行中的情况
                let affectedCells_Row = getEmptyCellsInRow(row: cell3.row, board: board)
                var deleteCells: [Position] = []
                var cell5: Candidate?
                
                for cell in affectedCells_Row {
                  if (cell.row == cell3.row && cell.col == cell3.col) ||
                     (cell.row == cell4.row && cell.col == cell4.col) {
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.contains(c) && 
                     board[cell.row][cell.col].draft.contains(d) &&
                     board[cell.row][cell.col].draft.count == 2 {
                     
                    cell5 = Candidate(row: cell.row, col: cell.col, candidates: board[cell.row][cell.col].draft)
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.count >= 2 &&
                     (board[cell.row][cell.col].draft.contains(c) || 
                      board[cell.row][cell.col].draft.contains(d)) {
                      
                    deleteCells.append(cell)
                  }
                }
                
                // 计算宫的关系
                let box1 = (cell1.row / 3) * 3 + (cell1.col / 3)
                let box2 = (cell2.row / 3) * 3 + (cell2.col / 3)
                let box3 = (cell3.row / 3) * 3 + (cell3.col / 3)
                let box4 = (cell4.row / 3) * 3 + (cell4.col / 3)
                var boxArray = [box1, box2, box3, box4]
                var boxSet = Set(boxArray)
                
                if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                  var positionDicts = [[String: Int]]()
                  for pos in deleteCells {
                    positionDicts.append(["row": pos.row, "col": pos.col])
                  }
                  
                  let promptDicts = [
                    ["row": cell1.row, "col": cell1.col],
                    ["row": cell2.row, "col": cell2.col],
                    ["row": cell3.row, "col": cell3.col],
                    ["row": cell4.row, "col": cell4.col],
                    ["row": cell5.row, "col": cell5.col],
                  ]
                  
                  return [
                    "isFill": false,
                    "position": positionDicts,
                    "prompt": promptDicts,
                    "method": SolutionMethods.UNIQUE_RECTANGLE,
                    "target": [c, d],
                    "label": "ab-ab-abc-abcd",
                  ]
                }
                
                // 检查宫内的情况
                deleteCells = []
                cell5 = nil
                let affectedCells_Box = getEmptyCellsInBox(
                  pos1: Position(row: cell3.row, col: cell3.col),
                  pos2: Position(row: cell4.row, col: cell4.col),
                  board: board
                )
                
                for cell in affectedCells_Box {
                  if (cell.row == cell3.row && cell.col == cell3.col) ||
                     (cell.row == cell4.row && cell.col == cell4.col) {
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.contains(c) &&
                     board[cell.row][cell.col].draft.contains(d) &&
                     board[cell.row][cell.col].draft.count == 2 {
                     
                    cell5 = Candidate(row: cell.row, col: cell.col, candidates: board[cell.row][cell.col].draft)
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.count >= 2 &&
                     (board[cell.row][cell.col].draft.contains(c) ||
                      board[cell.row][cell.col].draft.contains(d)) {
                      
                    deleteCells.append(cell)
                  }
                }
                
                boxArray = [box1, box2, box3, box4]
                boxSet = Set(boxArray)
                
                if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                  var positionDicts = [[String: Int]]()
                  for pos in deleteCells {
                    positionDicts.append(["row": pos.row, "col": pos.col])
                  }
                  
                  let promptDicts = [
                    ["row": cell1.row, "col": cell1.col],
                    ["row": cell2.row, "col": cell2.col],
                    ["row": cell3.row, "col": cell3.col],
                    ["row": cell4.row, "col": cell4.col],
                    ["row": cell5.row, "col": cell5.col],
                  ]
                  
                  return [
                    "isFill": false,
                    "position": positionDicts,
                    "prompt": promptDicts,
                    "method": SolutionMethods.UNIQUE_RECTANGLE,
                    "target": [c, d],
                    "label": "ab-ab-abc-abcd",
                  ]
                }
              }
            }
          }
        }
      }
    }

    // ab-ab-abc-abd列
    for col in 0..<9 {
      if let colStats = candidateMap[num]?.col[col], colStats.count == 2 {
        let cell1 = colStats.positions.first
        let cell2 = colStats.positions.last
        
        if let cell1 = cell1, let cell2 = cell2,
           cell1.candidates.count == 2 && cell2.candidates.count == 2,
           cell1.candidates == cell2.candidates 
        {
          let row1 = cell1.row
          let row2 = cell2.row
          let a = cell1.candidates[0]
          let b = cell1.candidates[1]
          
          var cell3: Candidate?
          var cell4: Candidate?
          
          for col2 in 0..<9 {
            if col2 == col { continue }
            
            if board[row1][col2].draft.count == 3 && board[row1][col2].draft.contains(a)
               && board[row1][col2].draft.contains(b) {
               
              cell3 = Candidate(row: row1, col: col2, candidates: board[row1][col2].draft)
              cell4 = Candidate(row: row2, col: col2, candidates: board[row2][col2].draft)
            } 
            else if board[row2][col2].draft.count == 3 && board[row2][col2].draft.contains(a)
                    && board[row2][col2].draft.contains(b) {
                    
              cell3 = Candidate(row: row2, col: col2, candidates: board[row2][col2].draft)
              cell4 = Candidate(row: row1, col: col2, candidates: board[row1][col2].draft)
            }
            
            if let cell3 = cell3, let cell4 = cell4, let other = cell3.candidates.first(where: { $0 != a && $0 != b }) {
              if cell4.candidates.count == 3 && cell4.candidates.contains(a) 
                 && cell4.candidates.contains(b) && !cell4.candidates.contains(other) {
                 
                let remainingCandidates1 = cell4.candidates.filter { $0 != a && $0 != b }
                let remainingCandidates2 = cell3.candidates.filter { $0 != a && $0 != b }
                
                let c = remainingCandidates1[0]
                let d = remainingCandidates2[0]
                
                // 检查列中的情况
                let affectedCells_Col = getEmptyCellsInCol(col: cell3.col, board: board)
                var deleteCells: [Position] = []
                var cell5: Candidate?
                
                for cell in affectedCells_Col {
                  if (cell.row == cell3.row && cell.col == cell3.col) ||
                     (cell.row == cell4.row && cell.col == cell4.col) {
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.contains(c) && 
                     board[cell.row][cell.col].draft.contains(d) &&
                     board[cell.row][cell.col].draft.count == 2 {
                     
                    cell5 = Candidate(row: cell.row, col: cell.col, candidates: board[cell.row][cell.col].draft)
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.count >= 2 &&
                     (board[cell.row][cell.col].draft.contains(c) || 
                      board[cell.row][cell.col].draft.contains(d)) {
                      
                    deleteCells.append(cell)
                  }
                }
                
                // 计算宫的关系
                let box1 = (cell1.row / 3) * 3 + (cell1.col / 3)
                let box2 = (cell2.row / 3) * 3 + (cell2.col / 3)
                let box3 = (cell3.row / 3) * 3 + (cell3.col / 3)
                let box4 = (cell4.row / 3) * 3 + (cell4.col / 3)
                var boxArray = [box1, box2, box3, box4]
                var boxSet = Set(boxArray)
                
                if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                  var positionDicts = [[String: Int]]()
                  for pos in deleteCells {
                    positionDicts.append(["row": pos.row, "col": pos.col])
                  }
                  
                  let promptDicts = [
                    ["row": cell1.row, "col": cell1.col],
                    ["row": cell2.row, "col": cell2.col],
                    ["row": cell3.row, "col": cell3.col],
                    ["row": cell4.row, "col": cell4.col],
                    ["row": cell5.row, "col": cell5.col],
                  ]
                  
                  return [
                    "isFill": false,
                    "position": positionDicts,
                    "prompt": promptDicts,
                    "method": SolutionMethods.UNIQUE_RECTANGLE,
                    "target": [c, d],
                    "label": "ab-ab-abc-abcd",
                  ]
                }
                
                // 检查宫内的情况
                deleteCells = []
                cell5 = nil
                let affectedCells_Box = getEmptyCellsInBox(
                  pos1: Position(row: cell3.row, col: cell3.col),
                  pos2: Position(row: cell4.row, col: cell4.col),
                  board: board
                )
                
                for cell in affectedCells_Box {
                  if (cell.row == cell3.row && cell.col == cell3.col) ||
                     (cell.row == cell4.row && cell.col == cell4.col) {
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.contains(c) &&
                     board[cell.row][cell.col].draft.contains(d) &&
                     board[cell.row][cell.col].draft.count == 2 {
                     
                    cell5 = Candidate(row: cell.row, col: cell.col, candidates: board[cell.row][cell.col].draft)
                    continue
                  }
                  
                  if board[cell.row][cell.col].draft.count >= 2 &&
                     (board[cell.row][cell.col].draft.contains(c) ||
                      board[cell.row][cell.col].draft.contains(d)) {
                      
                    deleteCells.append(cell)
                  }
                }
                
                boxArray = [box1, box2, box3, box4]
                boxSet = Set(boxArray)
                
                if !deleteCells.isEmpty, let cell5 = cell5, boxSet.count == 2 {
                  var positionDicts = [[String: Int]]()
                  for pos in deleteCells {
                    positionDicts.append(["row": pos.row, "col": pos.col])
                  }
                  
                  let promptDicts = [
                    ["row": cell1.row, "col": cell1.col],
                    ["row": cell2.row, "col": cell2.col],
                    ["row": cell3.row, "col": cell3.col],
                    ["row": cell4.row, "col": cell4.col],
                    ["row": cell5.row, "col": cell5.col],
                  ]
                  
                  return [
                    "isFill": false,
                    "position": positionDicts,
                    "prompt": promptDicts,
                    "method": SolutionMethods.UNIQUE_RECTANGLE,
                    "target": [c, d],
                    "label": "ab-ab-abc-abcd",
                  ]
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
