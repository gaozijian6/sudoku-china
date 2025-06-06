import { SOLUTION_METHODS } from '../constans';
import { TFunction } from 'i18next';

const handleHintMethod = (method: string, t: TFunction) => {
  switch (method) {
    case SOLUTION_METHODS.CHECK_CANDIDATE:
      return t('CHECK_CANDIDATE');
    case SOLUTION_METHODS.SINGLE_CANDIDATE:
      return t('SINGLE_CANDIDATE');
    case SOLUTION_METHODS.HIDDEN_SINGLE_ROW:
      return t('HIDDEN_SINGLE_ROW');
    case SOLUTION_METHODS.HIDDEN_SINGLE_COLUMN:
      return t('HIDDEN_SINGLE_COLUMN');
    case SOLUTION_METHODS.HIDDEN_SINGLE_BOX:
      return t('HIDDEN_SINGLE_BOX');
    case SOLUTION_METHODS.BLOCK_ELIMINATION_ROW:
      return t('BLOCK_ELIMINATION_ROW');
    case SOLUTION_METHODS.BLOCK_ELIMINATION_COLUMN:
      return t('BLOCK_ELIMINATION_COLUMN');
    case SOLUTION_METHODS.BLOCK_ELIMINATION_BOX_ROW:
      return t('BLOCK_ELIMINATION_BOX_ROW');
    case SOLUTION_METHODS.BLOCK_ELIMINATION_BOX_COLUMN:
      return t('BLOCK_ELIMINATION_BOX_COLUMN');
    case SOLUTION_METHODS.NAKED_PAIR_ROW:
      return t('NAKED_PAIR_ROW');
    case SOLUTION_METHODS.NAKED_PAIR_COLUMN:
      return t('NAKED_PAIR_COLUMN');
    case SOLUTION_METHODS.NAKED_PAIR_BOX:
      return t('NAKED_PAIR_BOX');
    case SOLUTION_METHODS.NAKED_TRIPLE_ROW1:
      return t('NAKED_TRIPLE_ROW1');
    case SOLUTION_METHODS.NAKED_TRIPLE_COLUMN1:
      return t('NAKED_TRIPLE_COLUMN1');
    case SOLUTION_METHODS.NAKED_TRIPLE_BOX1:
      return t('NAKED_TRIPLE_BOX1');
    case SOLUTION_METHODS.NAKED_TRIPLE_ROW2:
      return t('NAKED_TRIPLE_ROW2');
    case SOLUTION_METHODS.NAKED_TRIPLE_COLUMN2:
      return t('NAKED_TRIPLE_COLUMN2');
    case SOLUTION_METHODS.NAKED_TRIPLE_BOX2:
      return t('NAKED_TRIPLE_BOX2');
    case SOLUTION_METHODS.HIDDEN_PAIR_ROW:
      return t('HIDDEN_PAIR_ROW');
    case SOLUTION_METHODS.HIDDEN_PAIR_COLUMN:
      return t('HIDDEN_PAIR_COLUMN');
    case SOLUTION_METHODS.HIDDEN_PAIR_BOX:
      return t('HIDDEN_PAIR_BOX');
    case SOLUTION_METHODS.HIDDEN_TRIPLE_ROW:
      return t('HIDDEN_TRIPLE_ROW');
    case SOLUTION_METHODS.HIDDEN_TRIPLE_COLUMN:
      return t('HIDDEN_TRIPLE_COLUMN');
    case SOLUTION_METHODS.HIDDEN_TRIPLE_BOX:
      return t('HIDDEN_TRIPLE_BOX');
    case SOLUTION_METHODS.NAKED_QUADRUPLE_ROW:
      return t('NAKED_QUADRUPLE_ROW');
    case SOLUTION_METHODS.NAKED_QUADRUPLE_COLUMN:
      return t('NAKED_QUADRUPLE_COLUMN');
    case SOLUTION_METHODS.NAKED_QUADRUPLE_BOX:
      return t('NAKED_QUADRUPLE_BOX');
    case SOLUTION_METHODS.X_WING_ROW:
      return t('X_WING_ROW');
    case SOLUTION_METHODS.X_WING_COLUMN:
      return t('X_WING_COLUMN');
    case SOLUTION_METHODS.X_WING_VARIENT_ROW:
      return t('X_WING_VARIENT_ROW');
    case SOLUTION_METHODS.X_WING_VARIENT_COLUMN:
      return t('X_WING_VARIENT_COLUMN');
    case SOLUTION_METHODS.XY_WING:
      return t('XY_WING');
    case SOLUTION_METHODS.XYZ_WING:
      return t('XYZ_WING');
    case SOLUTION_METHODS.SKYSCRAPER:
      return t('SKYSCRAPER');
    case SOLUTION_METHODS.SKYSCRAPER2:
      return t('SKYSCRAPER2');
    case SOLUTION_METHODS.COMBINATION_CHAIN:
      return t('COMBINATION_CHAIN');
    case SOLUTION_METHODS.SWORDFISH_ROW:
      return t('SWORDFISH_ROW');
    case SOLUTION_METHODS.SWORDFISH_COLUMN:
      return t('SWORDFISH_COLUMN');
    case SOLUTION_METHODS.WXYZ_WING:
      return t('WXYZ_WING');
    case SOLUTION_METHODS.LOOP:
      return t('LOOP');
    case SOLUTION_METHODS.TRIAL_AND_ERROR:
      return t('TRIAL_AND_ERROR');
    case SOLUTION_METHODS.UNIQUE_RECTANGLE:
      return t('UNIQUE_RECTANGLE');
    case SOLUTION_METHODS.BINARY_UNIVERSAL_GRAVE:
      return t('BINARY_UNIVERSAL_GRAVE');
    case SOLUTION_METHODS.DOUBLE_COLOR_CHAIN:
      return t('DOUBLE_COLOR_CHAIN');
    case SOLUTION_METHODS.JELLYFISH_ROW:
      return t('JELLYFISH_ROW');
    case SOLUTION_METHODS.JELLYFISH_COLUMN:
      return t('JELLYFISH_COLUMN');
    case SOLUTION_METHODS.TRIPLE_COLOR_CHAIN:
      return t('TRIPLE_COLOR_CHAIN');
    case SOLUTION_METHODS.TWO_STRONG_LINKS:
      return t('SKYSCRAPER2');
    case SOLUTION_METHODS.THREE_STRONG_LINKS:
      return t('THREESTRONGLINKS');
    case SOLUTION_METHODS.X_CHAIN:
      return t('XCHAIN');
    case SOLUTION_METHODS.TWO_STRING_KITE:
      return t('TWO_STRING_KITE');
  }
  return '';
};

export default handleHintMethod;
