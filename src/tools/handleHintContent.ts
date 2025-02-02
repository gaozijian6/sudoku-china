import { Result } from './solution';
import { SOLUTION_METHODS } from '../constans';
import { CellData } from './index';
import { TFunction } from 'i18next';

export const handleHintContent = (
  result: Result,
  board: CellData[][],
  prompts: any,
  setPrompts: any,
  setSelectedNumber: any,
  setPositions: any,
  applyHintHighlight: any,
  updateBoard: any,
  t: TFunction,
): string => {
  const { position, target, method, prompt, isFill, isWeakLink, chainStructure,label } =
    result;
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
          box:
            Math.floor(position[0].row / 3) * 3 +
            Math.floor(position[0].col / 3) +
            1,
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
        if(label==='3-2-2'){
          let nodeStr1=`R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1}C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`
          let nodeStr2=`R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1}`
          let nodeStr3=`R${prompt[5].row + 1}C${prompt[5].col + 1}、R${prompt[6].row + 1}C${prompt[6].col + 1}`
          hintContent = t('hints.LOOP_3_2_2', {
            target: target[0],
            nodeStr1,
            nodeStr2,
            nodeStr3,
            rootNodeStr: `R${position[0].row + 1}C${position[0].col + 1}`
          });
        }

        break;
    }
  } else {
    setPositions(target);
    switch (method) {
      case SOLUTION_METHODS.BLOCK_ELIMINATION_ROW:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = t('hints.BLOCK_ELIMINATION_ROW', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        }
        hintContent = t('hints.BLOCK_ELIMINATION_COLUMN', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.BLOCK_ELIMINATION_BOX_ROW:
        setPrompts(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length == 2) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
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
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
        } else if (prompt.length == 3) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        hintContent = t('hints.NAKED_PAIR_BOX', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_ROW1:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_BOX1', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_TRIPLE_ROW2:
        setPrompts(target);
        setPositions(target);
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        hintContent = t('hints.NAKED_TRIPLE_BOX2', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          target: target.join(','),
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        candStr = [...new Set(prompts)].join(',');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        hintContent = t('hints.HIDDEN_PAIR_ROW', {
          row: position[0].row + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        candStr = [...new Set(prompts)].join(',');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        hintContent = t('hints.HIDDEN_PAIR_COLUMN', {
          col: position[0].col + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_PAIR_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = t('hints.HIDDEN_PAIR_BOX', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_ROW1:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_ROW1', {
          row: position[0].row + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_COLUMN1:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_COLUMN1', {
          col: position[0].col + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_BOX1:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_BOX1', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_ROW2:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_ROW2', {
          row: position[0].row + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_COLUMN2:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_COLUMN2', {
          col: position[0].col + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.HIDDEN_TRIPLE_BOX2:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        promptCandidates = [
          ...new Set(prompt.flatMap(p => board[p.row]?.[p.col]?.draft ?? [])),
        ];
        uniquePromptCandidates = promptCandidates.filter(
          cand => !target.includes(cand),
        );

        setPrompts(uniquePromptCandidates);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = [...new Set(prompts)].join(',');
        hintContent = t('hints.HIDDEN_TRIPLE_BOX2', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
          }C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = t('hints.NAKED_QUADRUPLE_ROW', {
          row: position[0].row + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
          }C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = t('hints.NAKED_QUADRUPLE_COLUMN', {
          col: position[0].col + 1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.NAKED_QUADRUPLE_BOX:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
          }C${prompt[3].col + 1}`;
        candStr = [...new Set(target)].join(',');
        hintContent = t('hints.NAKED_QUADRUPLE_BOX', {
          box:
            Math.floor(prompt[0].row / 3) * 3 +
            Math.floor(prompt[0].col / 3) +
            1,
          candStr,
          positions: posStr,
        });
        break;
      case SOLUTION_METHODS.X_WING_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
          }C${prompt[3].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
          }C${prompt[3].col + 1}`;
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
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}`;
        } else if (prompt.length === 6) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}`;
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
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}`;
        candStr = target.join(',');
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}`;
        }
        hintContent = t('hints.XYZ_WING', {
          positions: posStr,
          candStr,
          deleteStr,
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.SKYSCRAPER:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPrompts(target);
        posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
          }C${prompt[3].col + 1}`;
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}`;
        } else if (position.length === 3) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}、R${position[2].row + 1}C${position[2].col + 1
            }`;
        }
        hintContent = t('hints.SKYSCRAPER', {
          positions: posStr,
          row1: prompt[0].row + 1,
          col1: prompt[0].col + 1,
          row2: prompt[3].row + 1,
          col2: prompt[3].col + 1,
          deleteStr,
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.SKYSCRAPER2:
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}`;
        } else if (position.length === 3) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}、R${position[2].row + 1}C${position[2].col + 1
            }`;
        } else if (position.length === 4) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}、R${position[2].row + 1}C${position[2].col + 1
            }、R${position[3].row + 1}C${position[3].col + 1}`;
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
        break;
      case SOLUTION_METHODS.REMOTE_PAIR:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPositions(target);
        setPrompts(target);
        const posStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[prompt.length - 1].row + 1
          }C${prompt[prompt.length - 1].col + 1}`;
        let posStr2 = '';
        if (position.length === 1) {
          posStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          posStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}`;
        } else if (position.length === 3) {
          posStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}、R${position[2].row + 1}C${position[2].col + 1
            }`;
        }
        if (prompt.length === 4) {
          posStr2 = `R${prompt[1].row + 1}C${prompt[1].col + 1}、R${prompt[2].row + 1
            }C${prompt[2].col + 1}`;
        } else if (prompt.length === 6) {
          posStr2 = `R${prompt[1].row + 1}C${prompt[1].col + 1}、R${prompt[2].row + 1
            }C${prompt[2].col + 1}、R${prompt[3].row + 1}C${prompt[3].col + 1
            }、R${prompt[4].row + 1}C${prompt[4].col + 1}`;
        }
        hintContent = t('hints.REMOTE_PAIR', {
          posStr,
          posStr1,
          posStr2,
          target: target[0],
        });
        break;
      case SOLUTION_METHODS.COMBINATION_CHAIN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPositions(target);
        setPrompts(target);
        if (position.length === 1) {
          posStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          posStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}`;
        }
        // 组合方格
        let candStr1 = '';
        // 组合方格的配对
        let candStr2 = '';
        // 另外一组强链
        let candStr3 = '';
        let candStr4 = '';
        let pivotStr = '';
        let pivotStr1 = '';
        let pivotStr2 = '';

        if (!isWeakLink && chainStructure === '3-2-1') {
          candStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr2 = `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
            }C${prompt[3].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1}`;
          candStr4 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1}`;
          hintContent = t('hints.COMBINATION_CHAIN_3_2_1_STRONG', {
            candStr1,
            candStr2,
            candStr4,
            posStr,
            target: target[0],
          });
        } else if (isWeakLink && chainStructure === '3-2-1') {
          candStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr2 = `R${prompt[2].row + 1}C${prompt[2].col + 1}`;
          candStr3 = `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}`;
          pivotStr = `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
            }C${prompt[3].col + 1}`;
          candStr4 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1}`;
          hintContent = t('hints.COMBINATION_CHAIN_3_2_1_WEAK', {
            candStr1,
            candStr2,
            candStr3,
            pivotStr,
            candStr4,
            posStr,
            target: target[0],
          });
        } else if (isWeakLink && chainStructure === '3-2-2') {
          candStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr2 = `R${prompt[2].row + 1}C${prompt[2].col + 1}`;
          candStr3 = `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}`;
          pivotStr1 = `R${prompt[3].row + 1}C${prompt[3].col + 1}`;
          pivotStr2 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr4 = `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}`;
          hintContent = t('hints.COMBINATION_CHAIN_3_2_2_WEAK', {
            candStr1,
            candStr2,
            candStr3,
            pivotStr1,
            pivotStr2,
            candStr4,
            posStr,
            target: target[0],
          });
        } else if (!isWeakLink && chainStructure === '3-2-2') {
          candStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr2 = `R${prompt[2].row + 1}C${prompt[2].col + 1}`;
          candStr3 = `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}`;
          pivotStr1 = `R${prompt[3].row + 1}C${prompt[3].col + 1}`;
          pivotStr2 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr4 = `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}`;
          hintContent = t('hints.COMBINATION_CHAIN_3_2_2_STRONG', {
            candStr1,
            candStr2,
            candStr3,
            pivotStr1,
            pivotStr2,
            candStr4,
            posStr,
            target: target[0],
          });
        } else if (!isWeakLink && chainStructure === '3-4-1') {
          candStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr2 = `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
            }C${prompt[3].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1
            }、R${prompt[5].row + 1}C${prompt[5].col + 1}、R${prompt[6].row + 1
            }C${prompt[6].col + 1}`;
          candStr4 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1}`;
          hintContent = t('hints.COMBINATION_CHAIN_3_2_1_STRONG', {
            candStr1,
            candStr2,
            candStr4,
            posStr,
            target: target[0],
          });
        } else if (isWeakLink && chainStructure === '3-4-1') {
          candStr1 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}`;
          candStr2 = `R${prompt[2].row + 1}C${prompt[2].col + 1}`;
          candStr3 = `R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1
            }、R${prompt[6].row + 1}C${prompt[6].col + 1}`;
          pivotStr = `R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
            }C${prompt[3].col + 1}`;
          candStr4 = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[4].row + 1}C${prompt[4].col + 1}`;
          hintContent = t('hints.COMBINATION_CHAIN_3_2_1_WEAK', {
            candStr1,
            candStr2,
            candStr3,
            pivotStr,
            candStr4,
            posStr,
            target: target[0],
          });
        }
        break;
      case SOLUTION_METHODS.SWORDFISH_ROW:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length === 6) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1}`;
        } else if (prompt.length === 7) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1
            }、R${prompt[6].row + 1}C${prompt[6].col + 1}`;
        } else if (prompt.length === 8) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1
            }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${prompt[7].row + 1
            }C${prompt[7].col + 1}`;
        } else if (prompt.length === 9) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1
            }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${prompt[7].row + 1
            }C${prompt[7].col + 1}、R${prompt[8].row + 1}C${prompt[8].col + 1}`;
        }
        const columns = [...new Set(prompt.map(pos => pos.col + 1))];
        hintContent = t('hints.SWORDFISH_ROW', {
          posStr,
          length: prompt.length,
          target: target[0],
          columns: columns.join(','),
        });
        break;
      case SOLUTION_METHODS.SWORDFISH_COLUMN:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        if (prompt.length === 6) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1}`;
        } else if (prompt.length === 7) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1
            }、R${prompt[6].row + 1}C${prompt[6].col + 1}`;
        } else if (prompt.length === 8) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1
            }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${prompt[7].row + 1
            }C${prompt[7].col + 1}`;
        } else if (prompt.length === 9) {
          posStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
            }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1
            }、R${prompt[3].row + 1}C${prompt[3].col + 1}、R${prompt[4].row + 1
            }C${prompt[4].col + 1}、R${prompt[5].row + 1}C${prompt[5].col + 1
            }、R${prompt[6].row + 1}C${prompt[6].col + 1}、R${prompt[7].row + 1
            }C${prompt[7].col + 1}、R${prompt[8].row + 1}C${prompt[8].col + 1}`;
        }
        const rows = [...new Set(prompt.map(pos => pos.row + 1))];
        hintContent = t('hints.SWORDFISH_COLUMN', {
          posStr,
          length: prompt.length,
          target: target[0],
          rows: rows.join(','),
        });
        break;
      case SOLUTION_METHODS.WXYZ_WING:
        boardWithHighlight = applyHintHighlight(board, result, 'both');
        setPositions(target);
        setPrompts(target);
        candStr = `R${prompt[0].row + 1}C${prompt[0].col + 1}、R${prompt[1].row + 1
          }C${prompt[1].col + 1}、R${prompt[2].row + 1}C${prompt[2].col + 1}、R${prompt[3].row + 1
          }C${prompt[3].col + 1}`;
        if (position.length === 1) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}`;
        } else if (position.length === 2) {
          deleteStr = `R${position[0].row + 1}C${position[0].col + 1}、R${position[1].row + 1
            }C${position[1].col + 1}`;
        }
        hintContent = t('hints.WXYZ_WING', {
          candStr,
          deleteStr,
          target: target[0],
          row1: prompt[0].row + 1,
          col1: prompt[0].col + 1,
        });
        break;

    }
  }

  setSelectedNumber(target[0]);
  updateBoard(boardWithHighlight!, `提示：${result.method}`, false);

  return hintContent;
};
