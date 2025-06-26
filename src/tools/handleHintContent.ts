import { Result } from './solution';
import { SOLUTION_METHODS } from '../constans';
import { CellData } from './index';
import { t, TFunction } from 'i18next';

export const handleHintContent = (
  result: Result,
  board: CellData[][],
  prompts: any,
  setPrompts: any,
  setSelectedNumber: any,
  setPositions: any,
  applyHintHighlight: any,
  updateBoard: any,
  t: TFunction
): string => {
  const {
    position,
    target,
    method,
    prompt,
    isFill,
    label,
    label1,
    label2,
    highlightPromts1,
    highlightPromts2,
    highlightPromts3,
    highlightDeletes,
  } = result;
  let posStr = '';
  let posStr1 = '';
  let posStr2 = '';
  let posStr3 = '';
  let posStr4 = '';
  let posStr5 = '';
  let posStr6 = '';
  let candStr = '';
  let deleteStr = '';
  let promptCandidates: number[] = [];
  let uniquePromptCandidates: number[] = [];
  let boardWithHighlight = null;
  let hintContent = '';
  let arr1: number[] = [];
  let arr2: number[] = [];
  let arr3: number[] = [];
  let set: Set<number> = new Set();

  if (isFill) {
    setPrompts(target);
    switch (method) {
      case SOLUTION_METHODS.SINGLE_CANDIDATE:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = t('hints.SINGLE_CANDIDATE', {
          row: position[0].row + 1,
          col: position[0].col + 1,
          target: target.join(','),
        });
        break;
      case SOLUTION_METHODS.HIDDEN_SINGLE_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = t('hints.HIDDEN_SINGLE_ROW', {
          target: target.join(','),
          row: position[0].row + 1,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_SINGLE_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = t('hints.HIDDEN_SINGLE_COLUMN', {
          target: target.join(','),
          col: position[0].col + 1,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_SINGLE_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = t('hints.HIDDEN_SINGLE_BOX', {
          target: target.join(','),
          box: Math.floor(position[0].row / 3) * 3 + Math.floor(position[0].col / 3) + 1,
        });
        break;
      case SOLUTION_METHODS.TRIAL_AND_ERROR:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = t('hints.TRIAL_AND_ERROR', {
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.LOOP:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (label === '3-2') {
          const nodeStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
          const nodeStr2 = `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1}C${
            prompt[4].col + 1
          }`;
          hintContent = t('hints.LOOP_3_2', {
            target: target[0],
            nodeStr1,
            nodeStr2,
            rootNodeStr: `R${position[0].row + 1}C${position[0].col + 1}`,
          });
        } else if (label === '3-4') {
          const nodeStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
          const nodeStr2 = `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1}C${
            prompt[4].col + 1
          }、R${prompt[5].row + 1}C${prompt[5].col + 1}、R${prompt[6].row + 1}C${
            prompt[6].col + 1
          }`;
          hintContent = t('hints.LOOP_3_2', {
            target: target[0],
            nodeStr1,
            nodeStr2,
            rootNodeStr: `R${position[0].row + 1}C${position[0].col + 1}`,
          });
        } else if (label === '3-2-2') {
          const nodeStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
          const nodeStr2 = `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1}C${
            prompt[4].col + 1
          }`;
          const nodeStr3 = `R${prompt[5].row + 1}C${prompt[5].col + 1}、R${prompt[6].row + 1}C${
            prompt[6].col + 1
          }`;
          hintContent = t('hints.LOOP_3_2_2', {
            target: target[0],
            nodeStr1,
            nodeStr2,
            nodeStr3,
            rootNodeStr: `R${position[0].row + 1}C${position[0].col + 1}`,
          });
        }
        break;
      case SOLUTION_METHODS.BINARY_UNIVERSAL_GRAVE:
        boardWithHighlight = applyHintHighlight(board, result, 'prompt');
        hintContent = t('hints.BINARY_UNIVERSAL_GRAVE', {
          target: target[0],
          posStr: `R${position[0].row + 1}C${position[0].col + 1}`,
        });
        break;
    }
  } else {
    setPositions(target);
    switch (method) {
      case SOLUTION_METHODS.BLOCK_ELIMINATION_ROW:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = t('hints.BLOCK_ELIMINATION_ROW', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = t('hints.BLOCK_ELIMINATION_COLUMN', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_BOX_ROW:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = t('hints.BLOCK_ELIMINATION_BOX_ROW', {
          row: prompt[0].row + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_BOX_COLUMN:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = t('hints.BLOCK_ELIMINATION_BOX_COLUMN', {
          col: prompt[0].col + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_PAIR_ROW:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }`;
        hintContent = t('hints.NAKED_PAIR_ROW', {
          row: position[0].row + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_PAIR_COLUMN:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }`;
        hintContent = t('hints.NAKED_PAIR_COLUMN', {
          col: position[0].col + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_PAIR_BOX:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }`;
        hintContent = t('hints.NAKED_PAIR_BOX', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_ROW1:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_ROW1', {
          row: position[0].row + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_COLUMN1:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_COLUMN1', {
          col: position[0].col + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_BOX1:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_BOX1', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_ROW2:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_ROW2', {
          row: position[0].row + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_COLUMN2:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_COLUMN2', {
          col: position[0].col + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_BOX2:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_BOX2', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? []))];
        uniquePromptCandidates = promptCandidates.filter(cand => !target.includes(cand));

        setPrompts(uniquePromptCandidates);
        arr1 = board[prompt[0].row][prompt[0].col].draft.filter(cand => !target.includes(cand));
        arr2 = board[prompt[1].row][prompt[1].col].draft.filter(cand => !target.includes(cand));
        set = new Set([...arr1, ...arr2]);
        candStr = [...set].join(',');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }`;
        hintContent = t('hints.HIDDEN_PAIR_ROW', {
          row: position[0].row + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? []))];
        uniquePromptCandidates = promptCandidates.filter(cand => !target.includes(cand));

        setPrompts(uniquePromptCandidates);
        arr1 = board[prompt[0].row][prompt[0].col].draft.filter(cand => !target.includes(cand));
        arr2 = board[prompt[1].row][prompt[1].col].draft.filter(cand => !target.includes(cand));
        set = new Set([...arr1, ...arr2]);
        candStr = [...set].join(',');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }`;
        hintContent = t('hints.HIDDEN_PAIR_COLUMN', {
          col: position[0].col + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? []))];
        uniquePromptCandidates = promptCandidates.filter(cand => !target.includes(cand));

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }`;
        arr1 = board[prompt[0].row][prompt[0].col].draft.filter(cand => !target.includes(cand));
        arr2 = board[prompt[1].row][prompt[1].col].draft.filter(cand => !target.includes(cand));
        set = new Set([...arr1, ...arr2]);
        candStr = [...set].join(',');
        hintContent = t('hints.HIDDEN_PAIR_BOX', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? []))];
        uniquePromptCandidates = promptCandidates.filter(cand => !target.includes(cand));

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        arr1 = board[prompt[0].row][prompt[0].col].draft.filter(cand => !target.includes(cand));
        arr2 = board[prompt[1].row][prompt[1].col].draft.filter(cand => !target.includes(cand));
        arr3 = board[prompt[2].row][prompt[2].col].draft.filter(cand => !target.includes(cand));
        set = new Set([...arr1, ...arr2, ...arr3]);
        candStr = [...set].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_ROW', {
          row: position[0].row + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? []))];
        uniquePromptCandidates = promptCandidates.filter(cand => !target.includes(cand));

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        arr1 = board[prompt[0].row][prompt[0].col].draft.filter(cand => !target.includes(cand));
        arr2 = board[prompt[1].row][prompt[1].col].draft.filter(cand => !target.includes(cand));
        arr3 = board[prompt[2].row][prompt[2].col].draft.filter(cand => !target.includes(cand));
        set = new Set([...arr1, ...arr2, ...arr3]);
        candStr = [...set].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_COLUMN', {
          col: position[0].col + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? []))];
        uniquePromptCandidates = promptCandidates.filter(cand => !target.includes(cand));

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        arr1 = board[prompt[0].row][prompt[0].col].draft.filter(cand => !target.includes(cand));
        arr2 = board[prompt[1].row][prompt[1].col].draft.filter(cand => !target.includes(cand));
        arr3 = board[prompt[2].row][prompt[2].col].draft.filter(cand => !target.includes(cand));
        set = new Set([...arr1, ...arr2, ...arr3]);
        candStr = [...set].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_BOX', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_ROW:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = t('hints.NAKED_QUADRUPLE_ROW', {
          row: position[0].row + 1,
          candStr,
          positions: posStr,
          target: target.join(','),
        });
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_COLUMN:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = t('hints.NAKED_QUADRUPLE_COLUMN', {
          col: position[0].col + 1,
          candStr,
          positions: posStr,
          target: target.join(','),
        });
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_BOX:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = t('hints.NAKED_QUADRUPLE_BOX', {
          box: Math.floor(prompt[0].row / 3) * 3 + Math.floor(prompt[0].col / 3) + 1,
          candStr,
          positions: posStr,
          target: target.join(','),
        });
        break;
      case SOLUTION_METHODS.X_WING_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${prompt[3].col + 1}`;
        candStr = target.join(',');
        hintContent = t('hints.X_WING_ROW', {
          row1: prompt[0].row + 1,
          row2: prompt[2].row + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.X_WING_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${prompt[3].col + 1}`;
        candStr = target.join(',');
        hintContent = t('hints.X_WING_COLUMN', {
          col1: prompt[0].col + 1,
          col2: prompt[2].col + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.X_WING_VARIENT_COLUMN:
      case SOLUTION_METHODS.X_WING_VARIENT_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length === 5) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
            prompt[3].col + 1
          }、R${prompt[4].row + 1}C${prompt[4].col + 1}`;
        } else if (prompt.length === 6) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
            prompt[1].col + 1
          }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
            prompt[3].col + 1
          }、R${prompt[4].row + 1}C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
            prompt[5].col + 1
          }`;
        }
        candStr = target.join(',');
        setPrompts(target);
        hintContent = t('hints.X_WING_VARIENT_ROW', {
          positions: posStr,
          length: prompt.length,
          candStr,
          row: position[0].row + 1,
          col: position[0].col + 1,
        });
        break;
      case SOLUTION_METHODS.XY_WING:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1}C${
            position[1].col + 1
          }`;
        }
        hintContent = t('hints.XY_WING', {
          positions: posStr,
          candStr,
          deleteStr,
        });
        break;
      case SOLUTION_METHODS.XYZ_WING:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPositions(target);
        setPrompts(target);
        const candidateCounts = new Map();
        prompt.forEach(cell => {
          const candidates = board[cell.row][cell.col].draft;
          candidates.forEach(num => {
            candidateCounts.set(num, (candidateCounts.get(num) || 0) + 1);
          });
        });
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1}C${
            position[1].col + 1
          }`;
        }
        hintContent = t('hints.XYZ_WING', {
          positions: posStr,
          candStr,
          deleteStr,
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.SKYSCRAPER:
      case SOLUTION_METHODS.TWO_STRING_KITE:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = prompt.map(p => `R${p.row + 1}C${p.col + 1}`).join('、');
        deleteStr = position.map(p => `R${p.row + 1}C${p.col + 1}`).join('、');
        if (prompt.length === 4) {
          hintContent = t('hints.SKYSCRAPER', {
            positions: posStr,
            row1: prompt[0].row + 1,
            col1: prompt[0].col + 1,
            row2: prompt[3].row + 1,
            col2: prompt[3].col + 1,
            deleteStr,
            target: target[0],
          });
        }
        break;
      case SOLUTION_METHODS.X_CHAIN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = prompt.map(p => `R${p.row + 1}C${p.col + 1}`).join('、');
        deleteStr = position.map(p => `R${p.row + 1}C${p.col + 1}`).join('、');
        if (prompt.length === 6) {
          hintContent = t('hints.SKYSCRAPER', {
            positions: posStr,
            row1: prompt[0].row + 1,
            col1: prompt[0].col + 1,
            row2: prompt[5].row + 1,
            col2: prompt[5].col + 1,
            deleteStr,
            target: target[0],
          });
        }
        break;
      case SOLUTION_METHODS.SKYSCRAPER2:
        if (label2 && label2.length === 5) {
          if (label2[1] === '弱' && label2[3] === '弱') {
            hintContent = t('hints.SKYSCRAPER2_2', {
              As: `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
                prompt[1].col + 1
              }`,
              Bs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              Cs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              A: `R${prompt[0].row + 1}C${prompt[0].col + 1}`,
              B: `R${prompt[prompt.length - 1].row + 1}C${prompt[prompt.length - 1].col + 1}`,
            });
          } else if (label2[1] === '弱') {
            hintContent = t('hints.SKYSCRAPER2_1', {
              As: `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
                prompt[1].col + 1
              }`,
              Bs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }、R${prompt[4].row + 1}C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
                prompt[5].col + 1
              }`,
              Cs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              A: `R${prompt[0].row + 1}C${prompt[0].col + 1}`,
              B: `R${prompt[prompt.length - 1].row + 1}C${prompt[prompt.length - 1].col + 1}`,
            });
          } else if (label2[3] === '弱') {
            hintContent = t('hints.SKYSCRAPER2_1', {
              As: `R${prompt[4].row + 1}C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
                prompt[5].col + 1
              }`,
              Bs: `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
                prompt[1].col + 1
              }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              Cs: `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1}C${
                prompt[4].col + 1
              }`,
              A: `R${prompt[0].row + 1}C${prompt[0].col + 1}`,
              B: `R${prompt[prompt.length - 1].row + 1}C${prompt[prompt.length - 1].col + 1}`,
            });
          }
          boardWithHighlight = applyHintHighlight(board, result, 'both');
          setPrompts(target);
        } else if (!label2) {
          if (position.length === 1) {
            deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
          } else if (position.length === 2) {
            deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1}C${
              position[1].col + 1
            }`;
          } else if (position.length === 3) {
            deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1}C${
              position[1].col + 1
            }、R${position[2].row + 1}C${position[2].col + 1}`;
          } else if (position.length === 4) {
            deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1}C${
              position[1].col + 1
            }、R${position[2].row + 1}C${position[2].col + 1}、R${position[3].row + 1}C${
              position[3].col + 1
            }`;
          }
          boardWithHighlight = applyHintHighlight(board, result, 'both');
          setPrompts(target);
          hintContent = t('hints.SKYSCRAPER2', {
            positions: posStr,
            deleteStr,
            row1: prompt[0].row + 1,
            col1: prompt[0].col + 1,
            row2: prompt[1].row + 1,
            col2: prompt[1].col + 1,
            row3: prompt[2].row + 1,
            col3: prompt[2].col + 1,
            row4: prompt[3].row + 1,
            col4: prompt[3].col + 1,
            target: target[0],
          });
        }
        break;
      case SOLUTION_METHODS.TWO_STRONG_LINKS:
        if (label2 && label2.length === 5) {
          if (label2[1] === '弱') {
            hintContent = t('hints.SKYSCRAPER2_1', {
              As: `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
                prompt[1].col + 1
              }`,
              Bs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }、R${prompt[4].row + 1}C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
                prompt[5].col + 1
              }`,
              Cs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              A: `R${prompt[0].row + 1}C${prompt[0].col + 1}`,
              B: `R${prompt[prompt.length - 1].row + 1}C${prompt[prompt.length - 1].col + 1}`,
            });
          } else if (label2[3] === '弱') {
            hintContent = t('hints.SKYSCRAPER2_1', {
              As: `R${prompt[4].row + 1}C${prompt[4].col + 1}、R${prompt[5].row + 1}C${
                prompt[5].col + 1
              }`,
              Bs: `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
                prompt[1].col + 1
              }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              Cs: `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1}C${
                prompt[4].col + 1
              }`,
              A: `R${prompt[0].row + 1}C${prompt[0].col + 1}`,
              B: `R${prompt[prompt.length - 1].row + 1}C${prompt[prompt.length - 1].col + 1}`,
            });
          }
          boardWithHighlight = applyHintHighlight(board, result, 'both');
          setPrompts(target);
        }
        break;
      case SOLUTION_METHODS.THREE_STRONG_LINKS:
        if (label2 && label2.length === 5) {
          if (label2[1] === '弱' && label2[3] === '弱') {
            hintContent = t('hints.SKYSCRAPER2_2', {
              As: `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
                prompt[1].col + 1
              }`,
              Bs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              Cs: `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${
                prompt[3].col + 1
              }`,
              A: `R${prompt[0].row + 1}C${prompt[0].col + 1}`,
              B: `R${prompt[prompt.length - 1].row + 1}C${prompt[prompt.length - 1].col + 1}`,
            });
          }
          boardWithHighlight = applyHintHighlight(board, result, 'both');
          setPrompts(target);
        }
        break;
      case SOLUTION_METHODS.COMBINATION_CHAIN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPositions(target);
        setPrompts(target);
        let words = '';
        let A = '';
        let B = '';
        let A_index = 0;
        let B_index = 1;
        for (let i = 0; i < label2.length; i++) {
          switch (label2[i]) {
            case '强':
              switch (label1[i]) {
                case '单':
                  A = `R${prompt[A_index].row + 1}C${prompt[A_index].col + 1}`;
                  A_index++;
                  break;
                case '二':
                  A = `(R${prompt[A_index].row + 1}C${prompt[A_index].col + 1}&R${
                    prompt[A_index + 1].row + 1
                  }C${prompt[A_index + 1].col + 1})`;
                  A_index += 2;
                  break;
                case '三':
                  A = `(R${prompt[A_index].row + 1}C${prompt[A_index].col + 1}&R${
                    prompt[A_index + 1].row + 1
                  }C${prompt[A_index + 1].col + 1}&R${prompt[A_index + 2].row + 1}C${
                    prompt[A_index + 2].col + 1
                  })`;
                  A_index += 3;
                  break;
              }
              switch (label1[i + 1]) {
                case '单':
                  B = `R${prompt[B_index].row + 1}C${prompt[B_index].col + 1}`;
                  B_index++;
                  break;
                case '二':
                  B = `(R${prompt[B_index].row + 1}C${prompt[B_index].col + 1}&R${
                    prompt[B_index + 1].row + 1
                  }C${prompt[B_index + 1].col + 1})`;
                  B_index += 2;
                  break;
                case '三':
                  B = `(R${prompt[B_index].row + 1}C${prompt[B_index].col + 1}&R${
                    prompt[B_index + 1].row + 1
                  }C${prompt[B_index + 1].col + 1}&R${prompt[B_index + 2].row + 1}C${
                    prompt[B_index + 2].col + 1
                  })`;
                  B_index += 3;
                  break;
              }
              words += t('hints.COMBINATION_CHAIN_AB_STRONG', {
                A,
                B,
              });
              break;
            case '弱':
              switch (label1[i]) {
                case '单':
                  A = `R${prompt[A_index].row + 1}C${prompt[A_index].col + 1}`;
                  A_index++;
                  break;
                case '二':
                  A = `(R${prompt[A_index].row + 1}C${prompt[A_index].col + 1}&R${
                    prompt[A_index + 1].row + 1
                  }C${prompt[A_index + 1].col + 1})`;
                  A_index += 2;
                  break;
                case '三':
                  A = `(R${prompt[A_index].row + 1}C${prompt[A_index].col + 1}&R${
                    prompt[A_index + 1].row + 1
                  }C${prompt[A_index + 1].col + 1}&R${prompt[A_index + 2].row + 1}C${
                    prompt[A_index + 2].col + 1
                  })`;
                  A_index += 3;
                  break;
              }
              switch (label1[i + 1]) {
                case '单':
                  B = `R${prompt[B_index].row + 1}C${prompt[B_index].col + 1}`;
                  B_index++;
                  break;
                case '二':
                  B = `(R${prompt[B_index].row + 1}C${prompt[B_index].col + 1}&R${
                    prompt[B_index + 1].row + 1
                  }C${prompt[B_index + 1].col + 1})`;
                  B_index += 2;
                  break;
                case '三':
                  B = `(R${prompt[B_index].row + 1}C${prompt[B_index].col + 1}&R${
                    prompt[B_index + 1].row + 1
                  }C${prompt[B_index + 1].col + 1}&R${prompt[B_index + 2].row + 1}C${
                    prompt[B_index + 2].col + 1
                  })`;
                  B_index += 3;
                  break;
              }
              words += t('hints.COMBINATION_CHAIN_AB_WEAK', {
                A,
                B,
              });
              break;
          }
          words += t('comma');
        }
        switch (label1[label1.length - 1]) {
          case '单':
            B = `R${prompt[prompt.length - 1].row + 1}C${prompt[prompt.length - 1].col + 1}`;
            break;
          case '二':
            B = `(R${prompt[prompt.length - 2].row + 1}C${prompt[prompt.length - 2].col + 1}&R${
              prompt[prompt.length - 1].row + 1
            }C${prompt[prompt.length - 1].col + 1})`;
            break;
          case '三':
            B = `(R${prompt[prompt.length - 3].row + 1}C${prompt[prompt.length - 3].col + 1}&R${
              prompt[prompt.length - 2].row + 1
            }C${prompt[prompt.length - 2].col + 1}&R${prompt[prompt.length - 1].row + 1}C${
              prompt[prompt.length - 1].col + 1
            })`;
            break;
        }
        words += t('hints.COMBINATION_CHAIN_END', {
          A: `R${prompt[0].row + 1}C${prompt[0].col + 1}`,
          B,
        });
        hintContent = words;
        break;
      case SOLUTION_METHODS.WXYZ_WING:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPositions(target);
        setPrompts(target);
        candStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
          prompt[1].col + 1
        }、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1}C${prompt[3].col + 1}`;
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1}C${
            position[1].col + 1
          }`;
        }
        hintContent = t('hints.WXYZ_WING', {
          candStr,
          deleteStr,
          target: target[0],
          row1: prompt[0].row + 1,
          col1: prompt[0].col + 1,
        });
        break;
      case SOLUTION_METHODS.UNIQUE_RECTANGLE:
        setPositions(target);
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        let nodeStr = '';
        switch (label) {
          case 'ab-ab-ab-abc':
            posStr = `R${position[0].row + 1}C${position[0].col + 1}`;
            nodeStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${
              prompt[1].col + 1
            }、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
            hintContent = t('hints.UNIQUE_RECTANGLE1', {
              deleteStr: posStr,
              posStr,
              nodeStr,
              target: `${target[0]},${target[1]}`,
            });
            break;
          case 'ab-ab-abc-abc':
            posStr = position.map(pos => `R${pos.row + 1}C${pos.col + 1}`).join('、');
            nodeStr = prompt.map(pos => `R${pos.row + 1}C${pos.col + 1}`).join('、');
            hintContent = t('hints.UNIQUE_RECTANGLE2', {
              deleteStr: posStr,
              posStr,
              nodeStr,
              target: target[0],
            });
            break;
          case 'ab-ab-abc-abcd':
            posStr = position.map(pos => `R${pos.row + 1}C${pos.col + 1}`).join('、');
            nodeStr = prompt
              .slice(0, -1)
              .map(pos => `R${pos.row + 1}C${pos.col + 1}`)
              .join('、');
            const [c, d] = target;
            let isC = false;
            let isD = false;
            for (const pos of position) {
              if (board[pos.row][pos.col].draft.includes(c)) {
                isC = true;
              }
              if (board[pos.row][pos.col].draft.includes(d)) {
                isD = true;
              }
            }
            let finalTarget = '';
            if (isC && isD) {
              finalTarget = `${c},${d}`;
            } else if (isC) {
              finalTarget = `${c}`;
            } else if (isD) {
              finalTarget = `${d}`;
            }
            hintContent = t('hints.UNIQUE_RECTANGLE2', {
              deleteStr: posStr,
              posStr,
              nodeStr,
              target: finalTarget,
            });
            break;
          case 'ab-abc-ab-abc':
            posStr = position.map(pos => `R${pos.row + 1}C${pos.col + 1}`).join('、');
            nodeStr = prompt.map(pos => `R${pos.row + 1}C${pos.col + 1}`).join('、');
            hintContent = t('hints.UNIQUE_RECTANGLE2', {
              deleteStr: posStr,
              posStr,
              nodeStr,
              target: target[0],
            });
            break;
          case 'ab-abc-ab-abd':
            posStr = position.map(pos => `R${pos.row + 1}C${pos.col + 1}`).join('、');
            nodeStr = prompt.map(pos => `R${pos.row + 1}C${pos.col + 1}`).join('、');
            hintContent = t('hints.UNIQUE_RECTANGLE2', {
              deleteStr: posStr,
              posStr,
              nodeStr,
              target: target[0],
            });
            break;
        }
        break;
      case SOLUTION_METHODS.DOUBLE_COLOR_CHAIN:
        setPositions([target[target.length - 1]]);
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        deleteStr = position.join('、');
        hintContent += t('case1');

        if (label) {
          let [label1, label2] = label.substring(1).split('-');
          console.log('label1', label1, 'label2', label2);

          if (label1 === '') {
            const startPos = `R${highlightPromts1[0].row + 1}C${highlightPromts1[0].col + 1}`;
            const deleteTarget = highlightDeletes[0].value;
            hintContent += t('hints.DOUBLE_COLOR_CHAIN_delete', {
              posStr: startPos,
              target1: highlightPromts1[0].value,
              target2: deleteTarget,
            });
            hintContent += t('period');
            hintContent += t('case2');
            for (let i = 0; i < label2.length; i++) {
              switch (label2[i]) {
                case '双':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_s', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    target1: highlightPromts2[i].value,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target2: highlightPromts2[i + 1].value,
                  });
                  break;
                case '弱':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_r', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target: highlightPromts2[i].value,
                  });
                  break;
                case '强':
                  if (i === 0) {
                    hintContent += t('hints.DOUBLE_COLOR_CHAIN_q_start', {
                      posStr: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                      target1: highlightPromts2[i].value,
                      target2: highlightPromts2[i + 1].value,
                    });
                    hintContent += t('comma');
                  }
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_q', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target: highlightPromts2[i + 1].value,
                  });
                  break;
              }
              hintContent += t('comma');
            }
            hintContent += t('end2', {
              target: target.join(','),
            });
          } else if (label2 === '') {
            const startPos = `R${highlightPromts2[0].row + 1}C${highlightPromts2[0].col + 1}`;
            const deleteTarget = highlightDeletes[0].value;
            hintContent += t('hints.DOUBLE_COLOR_CHAIN_delete', {
              posStr: startPos,
              target1: highlightPromts2[0].value,
              target2: deleteTarget,
            });
            hintContent += t('period');
            hintContent += t('case2');
            for (let i = 0; i < label1.length; i++) {
              switch (label1[i]) {
                case '双':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_s', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    target1: highlightPromts1[i].value,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target2: highlightPromts1[i + 1].value,
                  });
                  break;
                case '弱':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_r', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target: highlightPromts1[i].value,
                  });
                  break;
                case '强':
                  if (i === 0) {
                    hintContent += t('hints.DOUBLE_COLOR_CHAIN_q_start', {
                      posStr: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                      target1: highlightPromts1[i].value,
                      target2: highlightPromts1[i + 1].value,
                    });
                    hintContent += t('comma');
                  }
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_q', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target: highlightPromts1[i + 1].value,
                  });
                  break;
              }
              hintContent += t('comma');
            }
            hintContent += t('end2', {
              target: target.join(','),
            });
          } else {
            for (let i = 0; i < label1.length; i++) {
              switch (label1[i]) {
                case '双':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_s', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    target1: highlightPromts1[i].value,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target2: highlightPromts1[i + 1].value,
                  });
                  break;
                case '弱':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_r', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target: highlightPromts1[i].value,
                  });
                  break;
                case '强':
                  if (i === 0) {
                    hintContent += t('hints.DOUBLE_COLOR_CHAIN_q_start', {
                      posStr: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                      target1: highlightPromts1[i].value,
                      target2: highlightPromts1[i + 1].value,
                    });
                    hintContent += t('comma');
                  }
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_q', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target: highlightPromts1[i + 1].value,
                  });
                  break;
              }
              hintContent += t('comma');
            }
            hintContent += t('end1', {
              target: target.join(','),
            });
            hintContent += t('period');
            hintContent += t('case2');
            for (let i = 0; i < label2.length; i++) {
              switch (label2[i]) {
                case '双':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_s', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    target1: highlightPromts2[i].value,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target2: highlightPromts2[i + 1].value,
                  });
                  break;
                case '弱':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_r', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target: highlightPromts2[i].value,
                  });
                  break;
                case '强':
                  if (i === 0) {
                    hintContent += t('hints.DOUBLE_COLOR_CHAIN_q_start', {
                      posStr: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                      target1: highlightPromts2[i].value,
                      target2: highlightPromts2[i + 1].value,
                    });
                    hintContent += t('comma');
                  }
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_q', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target: highlightPromts2[i + 1].value,
                  });
                  break;
              }
              hintContent += t('comma');
            }
            hintContent += t('end2', {
              target: target.join(','),
            });
          }
        }
        break;
      case SOLUTION_METHODS.SWORDFISH_ROW:
        setPositions(target);
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        hintContent = t('hints.SWORDFISH_ROW', {
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.SWORDFISH_COLUMN:
        setPositions(target);
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        hintContent = t('hints.SWORDFISH_COLUMN', {
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.JELLYFISH_ROW:
        setPositions(target);
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        hintContent = t('hints.JELLYFISH_ROW', {
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.JELLYFISH_COLUMN:
        setPositions(target);
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        hintContent = t('hints.JELLYFISH_COLUMN', {
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.TRIPLE_COLOR_CHAIN:
        setPositions(target);
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (label) {
          let [label1, label2, label3] = label.substring(1).split('-');
          hintContent += t('case1');
          if (label1 === '') {
            const startPos = `R${highlightPromts1[0].row + 1}C${highlightPromts1[0].col + 1}`;
            const deleteTarget = highlightDeletes[0].value;
            hintContent += t('hints.DOUBLE_COLOR_CHAIN_delete', {
              posStr: startPos,
              target1: highlightPromts1[0].value,
              target2: deleteTarget,
            });
          } else {
            for (let i = 0; i < label1.length; i++) {
              switch (label1[i]) {
                case '双':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_s', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    target1: highlightPromts1[i].value,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target2: highlightPromts1[i + 1].value,
                  });
                  break;
                case '弱':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_r', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target: highlightPromts1[i].value,
                  });
                  break;
                case '强':
                  if (i === 0) {
                    hintContent += t('hints.DOUBLE_COLOR_CHAIN_q_start', {
                      posStr: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                      target1: highlightPromts1[i].value,
                      target2: highlightPromts1[i + 1].value,
                    });
                    hintContent += t('comma');
                  }
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_q', {
                    posStr1: `R${highlightPromts1[i].row + 1}C${highlightPromts1[i].col + 1}`,
                    posStr2: `R${highlightPromts1[i + 1].row + 1}C${
                      highlightPromts1[i + 1].col + 1
                    }`,
                    target: highlightPromts1[i + 1].value,
                  });
                  break;
              }
              hintContent += t('comma');
            }
            hintContent += t('end1', {
              target: target.join(','),
            });
          }
          hintContent += t('period');
          hintContent += t('case2');
          if (label2 === '') {
            const startPos = `R${highlightPromts2[0].row + 1}C${highlightPromts2[0].col + 1}`;
            const deleteTarget = highlightDeletes[0].value;
            hintContent += t('hints.DOUBLE_COLOR_CHAIN_delete', {
              posStr: startPos,
              target1: highlightPromts2[0].value,
              target2: deleteTarget,
            });
          } else {
            for (let i = 0; i < label2.length; i++) {
              switch (label2[i]) {
                case '双':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_s', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    target1: highlightPromts2[i].value,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target2: highlightPromts2[i + 1].value,
                  });
                  break;
                case '弱':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_r', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target: highlightPromts2[i].value,
                  });
                  break;
                case '强':
                  if (i === 0) {
                    hintContent += t('hints.DOUBLE_COLOR_CHAIN_q_start', {
                      posStr: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                      target1: highlightPromts2[i].value,
                      target2: highlightPromts2[i + 1].value,
                    });
                    hintContent += t('comma');
                  }
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_q', {
                    posStr1: `R${highlightPromts2[i].row + 1}C${highlightPromts2[i].col + 1}`,
                    posStr2: `R${highlightPromts2[i + 1].row + 1}C${
                      highlightPromts2[i + 1].col + 1
                    }`,
                    target: highlightPromts2[i + 1].value,
                  });
                  break;
              }
              hintContent += t('comma');
            }
            hintContent += t('end1', {
              target: target.join(','),
            });
          }
          hintContent += t('period');
          hintContent += t('case3');
          if (label3 === '') {
            const startPos = `R${highlightPromts3[0].row + 1}C${highlightPromts3[0].col + 1}`;
            const deleteTarget = highlightDeletes[0].value;
            hintContent += t('hints.DOUBLE_COLOR_CHAIN_delete', {
              posStr: startPos,
              target1: highlightPromts3[0].value,
              target2: deleteTarget,
            });
          } else {
            for (let i = 0; i < label3.length; i++) {
              switch (label3[i]) {
                case '双':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_s', {
                    posStr1: `R${highlightPromts3[i].row + 1}C${highlightPromts3[i].col + 1}`,
                    target1: highlightPromts3[i].value,
                    posStr2: `R${highlightPromts3[i + 1].row + 1}C${
                      highlightPromts3[i + 1].col + 1
                    }`,
                    target2: highlightPromts3[i + 1].value,
                  });
                  break;
                case '弱':
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_r', {
                    posStr1: `R${highlightPromts3[i].row + 1}C${highlightPromts3[i].col + 1}`,
                    posStr2: `R${highlightPromts3[i + 1].row + 1}C${
                      highlightPromts3[i + 1].col + 1
                    }`,
                    target: highlightPromts3[i].value,
                  });
                  break;
                case '强':
                  if (i === 0) {
                    hintContent += t('hints.DOUBLE_COLOR_CHAIN_q_start', {
                      posStr: `R${highlightPromts3[i].row + 1}C${highlightPromts3[i].col + 1}`,
                      target1: highlightPromts3[i].value,
                      target2: highlightPromts3[i + 1].value,
                    });
                    hintContent += t('comma');
                  }
                  hintContent += t('hints.DOUBLE_COLOR_CHAIN_q', {
                    posStr1: `R${highlightPromts3[i].row + 1}C${highlightPromts3[i].col + 1}`,
                    posStr2: `R${highlightPromts3[i + 1].row + 1}C${
                      highlightPromts3[i + 1].col + 1
                    }`,
                    target: highlightPromts3[i + 1].value,
                  });
                  break;
              }
              hintContent += t('comma');
            }
            hintContent += t('end2', {
              target: target.join(','),
            });
          }
        }
        break;
    }
  }
  setSelectedNumber(target[0]);
  updateBoard(boardWithHighlight!, `提示：${result.method}`, false);
  return hintContent;
};
