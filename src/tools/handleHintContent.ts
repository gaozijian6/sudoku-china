import {Result} from './solution';
import {SOLUTION_METHODS} from '../constans';
import {CellData} from './index';

export const handleHintContent = (
  result: Result,
  board: CellData[][],
  prompts: any,
  setPrompts: any,
  setSelectedNumber: any,
  setPositions: any,
  applyHintHighlight: any,
  updateBoard: any,
): string => {
  const {position, target, method, prompt, isFill} = result;
  let posStr = '';
  let candStr = '';
  let deleteStr = '';
  let promptCandidates = [];
  let uniquePromptCandidates = [];
  let boardWithHighlight = null;
  let hintContent = '';
  if (isFill) {
    setPrompts(target);
    switch (method) {
      case SOLUTION_METHODS.SINGLE_CANDIDATE:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = `注意到单元格R${position[0].row + 1}C${
          position[0].col + 1
        }只剩${target.join(
          ', ',
        )}一个候选数，所以可以确定该单元格的值为${target.join(', ')}`;
        break;
      case SOLUTION_METHODS.HIDDEN_SINGLE_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = `候选数${target.join(',')}在第${
          position[0].row + 1
        }行中，只有一个候选方格，所以可以确定该单元格的值为${target.join(
          ', ',
        )}`;
        break;
      case SOLUTION_METHODS.HIDDEN_SINGLE_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = `候选数${target.join(',')}在第${
          position[0].col + 1
        }列中，只有一个候选方格，所以可以确定该单元格的值为${target.join(
          ', ',
        )}`;
        break;
      case SOLUTION_METHODS.HIDDEN_SINGLE_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = `候选数${target.join(',')}在第${
          Math.floor(position[0].row / 3) * 3 +
          Math.floor(position[0].col / 3) +
          1
        }宫中，只有一个候选方格，所以可以确定该单元格的值为${target.join(
          ', ',
        )}`;
        break;
      case SOLUTION_METHODS.TRIAL_AND_ERROR:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = `尝试向只有两个候选数的方格内填入${target[0]}，若后续无解，则说明填入${target[0]}是错误的，应填入另一个候选数`;
        break;
    }
  } else {
    setPositions(target);
    switch (method) {
      case SOLUTION_METHODS.BLOCK_ELIMINATION_ROW:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，候选数${target.join(
          ',',
        )}只存在${posStr}中，无论存在哪个方格中，这一行上的其他位置都不应出现此候选数${target.join(
          ',',
        )}`;
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');

        setPrompts(target);
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，候选数${target.join(
          ',',
        )}只存在${posStr}中，无论存在哪个方格中，这一列上的其他位置都不应出现此候选数${target.join(
          ',',
        )}`;
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_BOX_ROW:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = `在第${prompt[0].row + 1}行中，候选数${target.join(
          ',',
        )}只存在${posStr}中，无论存在哪个方格中，这一宫中的其他位置都不应出现此候选数${target.join(
          ',',
        )}`;
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_BOX_COLUMN:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = `在第${prompt[0].col + 1}列中，候选数${target.join(
          ',',
        )}只存在${posStr}中，无论存在哪个方格中，这一宫中的其他位置都不应出现此候选数${target.join(
          ',',
        )}`;
        break;
      case SOLUTION_METHODS.NAKED_PAIR_ROW:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          position[0].row + 1
        }行中，因为候选数${candStr}只能出现在${posStr}这两个方格中，所以此行其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_PAIR_COLUMN:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          position[0].col + 1
        }列中，因为候选数${candStr}只能出现在${posStr}这两个方格中，所以此列其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_PAIR_BOX:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，因为候选数${candStr}只能出现在${posStr}这两个方格中，所以此宫其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_ROW1:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          position[0].row + 1
        }行中，因为候选数${candStr}只能出现在${posStr}这三个方格中，所以此行其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_COLUMN1:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          position[0].col + 1
        }列中，因为候选数${candStr}只能出现在${posStr}这三个方格中，所以此列其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_BOX1:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，因为候选数${candStr}只能出现在${posStr}这三个方格中，所以此宫其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_ROW2:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          position[0].row + 1
        }行中，因为候选数${candStr}只能出现在${posStr}这三个方格中，所以此行其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_COLUMN2:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          position[0].col + 1
        }列中，因为候选数${candStr}只能出现在${posStr}这三个方格中，所以此列其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_BOX2:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，因为候选数${candStr}只能出现在${posStr}这三个方格中，所以此宫其他位置都不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        candStr = [...new Set(prompts)].join(',');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}`;
        hintContent = `在第${
          position[0].row + 1
        }行中，因为候选数${candStr}只出现在${posStr}这两个方格中，因此这两个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        candStr = [...new Set(prompts)].join(',');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}`;
        hintContent = `在第${
          position[0].col + 1
        }列中，因为候选数${candStr}只出现在${posStr}这两个方格中，因此这两个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，因为候选数${candStr}只出现在${posStr}这两个方格中，因此这两个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_ROW1:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = `在第${
          position[0].row + 1
        }行中，因为候选数${candStr}只出现在${posStr}这三个方格中，因此这三个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_COLUMN1:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = `在第${
          position[0].col + 1
        }列中，因为候选数${candStr}只出现在${posStr}这三个方格中，因此这三个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_BOX1:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，因为候选数${candStr}只出现在${posStr}这三个方格中，因此这三个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_ROW2:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = `在第${
          position[0].row + 1
        }行中，因为候选数${candStr}只出现在${posStr}这三个方格中，因此这三个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_COLUMN2:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = `在第${
          position[0].col + 1
        }列中，因为候选数${candStr}只出现在${posStr}这三个方格中，因此这三个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_BOX2:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，因为候选数${candStr}只出现在${posStr}这三个方格中，因此这三个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${
          prompt[3].row + 1
        }C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = `在第${
          position[0].row + 1
        }行中，因为候选数${candStr}只出现在${posStr}这四个方格中，因此这四个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${
          prompt[3].row + 1
        }C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = `在第${
          position[0].col + 1
        }列中，因为候选数${candStr}只出现在${posStr}这四个方格中，因此这四个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${
          prompt[3].row + 1
        }C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = `在第${
          Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1
        }宫中，因为候选数${candStr}只出现在${posStr}这四个方格中，因此这四个方格不应出现其他候选数`;
        break;
      case SOLUTION_METHODS.X_WING_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${
          prompt[3].row + 1
        }C${prompt[3].col + 1}`;
        candStr = target.join(',');
        hintContent = `在${prompt[0].row + 1}、${
          prompt[2].row + 1
        }两行中，候选数${candStr}每行都有两个候选方格且他们的列号相同，在这四个候选方格内无论哪两个取值，都会导致这两列其他位置不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.X_WING_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${
          prompt[3].row + 1
        }C${prompt[3].col + 1}`;
        candStr = target.join(',');
        hintContent = `在${prompt[0].row + 1}、${
          prompt[2].col + 1
        }两列中，候选数${candStr}每列都有两个候选方格且他们的行号相同，在这四个候选方格内无论哪两个取值，都会导致这两行其他位置不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.X_WING_VARIENT_COLUMN:
      case SOLUTION_METHODS.X_WING_VARIENT_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length === 5) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}`;
        } else if (prompt.length === 6) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1}`;
        }
        candStr = target.join(',');
        setPrompts(target);
        hintContent = `在${posStr}这${
          prompt.length
        }个候选方格内无论哪两个取${candStr}，都会导致R${position[0].row + 1}C${
          position[0].col + 1
        }内不应出现候选数${candStr}`;
        break;
      case SOLUTION_METHODS.XY_WING:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        if (position.length === 1) {
          hintContent = `无论${posStr}这三个候选方格内如何取值，R${
            position[0].row + 1
          }C${position[0].col + 1}内都不能出现候选数${target[0]}`;
        }
        if (position.length === 1) {
          hintContent = `无论${posStr}这三个候选方格内如何取值，R${
            position[0].row + 1
          }C${position[0].col + 1}内都不能出现候选数${target[0]}`;
        } else if (position.length === 2) {
          hintContent = `无论${posStr}这三个候选方格内如何取值，R${
            position[0].row + 1
          }C${position[0].col + 1}、R${position[1].row + 1}C${
            position[1].col + 1
          }内都不能出现候选数${target[0]}`;
        }
        break;
      case SOLUTION_METHODS.XYZ_WING:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        const candidateCounts = new Map();
        prompt.forEach(cell => {
          const candidates = board[cell.row][cell.col].draft;
          candidates.forEach(num => {
            candidateCounts.set(num, (candidateCounts.get(num) || 0) + 1);
          });
        });
        const twiceAppearingCandidates = Array.from(candidateCounts.keys())
          .filter(num => candidateCounts.get(num) === 2)
          .map(Number);
        setPositions(twiceAppearingCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        if (position.length === 1) {
          hintContent = `无论${posStr}这三个候选方格内如何取值，R${
            position[0].row + 1
          }C${position[0].col + 1}内都不能出现候选数${target[0]}`;
        }
        if (position.length === 1) {
          hintContent = `无论${posStr}这三个候选方格内如何取值，R${
            position[0].row + 1
          }C${position[0].col + 1}内都不能出现候选数${target[0]}`;
        } else if (position.length === 2) {
          hintContent = `无论${posStr}这三个候选方格内如何取值，R${
            position[0].row + 1
          }C${position[0].col + 1}、R${position[1].row + 1}C${
            position[1].col + 1
          }内都不能出现候选数${target[0]}`;
        }
        break;
      case SOLUTION_METHODS.EUREKA:
        setPositions(target);
        setPrompts(target);
        const diffPositions = prompt.filter(
          p => !position.some(pos => pos.row === p.row && pos.col === p.col),
        );
        result.prompt = diffPositions;
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${
          prompt[3].row + 1
        }C${prompt[3].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1}`;

        hintContent = `${posStr}五个方格构成互斥环，假设候选数${
          target[0]
        }只能出现在这五个方格中，则始终会导致有两个互为强连接的候选方格矛盾。因此R${
          position[0].row + 1
        }C${position[0].col + 1}、R${position[1].row + 1}C${
          position[1].col + 1
        }、R${position[2].row + 1}C${position[2].col + 1}内不能同时出现候选数${
          target[0]
        }`;
        break;
      case SOLUTION_METHODS.SKYSCRAPER:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
          prompt[1].row + 1
        }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${
          prompt[3].row + 1
        }C${prompt[3].col + 1}`;
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${
            position[1].row + 1
          }C${position[1].col + 1}`;
        } else if (position.length === 3) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${
            position[1].row + 1
          }C${position[1].col + 1}、R${position[2].row + 1}C${
            position[2].col + 1
          }`;
        }
        hintContent = `${posStr}四个方格构成共轭链，无论R${prompt[0].row + 1}C${
          prompt[0].col + 1
        }还是R${prompt[3].row + 1}C${prompt[3].col + 1}取值为${
          target[0]
        }，${deleteStr}内都不能出现候选数${target[0]}`;
        break;
      case SOLUTION_METHODS.SWORDFISH_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length === 6) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1}`;
        } else if (prompt.length === 7) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
            prompt[5].col + 1
          }、R${prompt[6].row + 1}C${prompt[6].col + 1}`;
        } else if (prompt.length === 8) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
            prompt[5].col + 1
          }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${
            prompt[7].row + 1
          }C${prompt[7].col + 1}`;
        } else if (prompt.length === 9) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
            prompt[5].col + 1
          }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${
            prompt[7].row + 1
          }C${prompt[7].col + 1}、R${prompt[8].row + 1}C${prompt[8].col + 1}`;
        }
        const columns = [...new Set(prompt.map(pos => pos.col + 1))];
        hintContent = `无论${posStr}这${prompt.length}个候选方格哪三个取${
          target[0]
        }，第${columns.join('、')}列内都不能出现候选数${target[0]}`;
        break;
      case SOLUTION_METHODS.SWORDFISH_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length === 6) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1}`;
        } else if (prompt.length === 7) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
            prompt[5].col + 1
          }、R${prompt[6].row + 1}C${prompt[6].col + 1}`;
        } else if (prompt.length === 8) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
            prompt[5].col + 1
          }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${
            prompt[7].row + 1
          }C${prompt[7].col + 1}`;
        } else if (prompt.length === 9) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${
            prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${
            prompt[2].col + 1
          }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${
            prompt[4].row + 1
          }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
            prompt[5].col + 1
          }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${
            prompt[7].row + 1
          }C${prompt[7].col + 1}、R${prompt[8].row + 1}C${prompt[8].col + 1}`;
        }
        const rows = [...new Set(prompt.map(pos => pos.row + 1))];
        hintContent = `无论${posStr}这${prompt.length}个候选方格哪三个取${
          target[0]
        }，第${rows.join('、')}行内都不能出现候选数${target[0]}`;
        break;
    }
  }

  setSelectedNumber(target[0]);
  updateBoard(boardWithHighlight!, `提示：${result.method}`, [], false, false);

  return hintContent;
};
