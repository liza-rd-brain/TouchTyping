import {
  CurrentLetterType,
  StringItemType,
  State,
  ActionType,
} from "../types.ts";

export const changeText = (state: State, enteredLetter: string) => {
  const { filledString, leftedString, currentLetter } = state.stringItem;

  /**
   * Any symbol with lenght 1
   */
  const ishHandledKey = enteredLetter.length === 1;

  const isCorrectLetter = currentLetter.value === enteredLetter;

  switch (ishHandledKey) {
    case false: {
      return state;
    }
    case true: {
      switch (isCorrectLetter) {
        case true: {
          const newCurrentLetter = leftedString.charAt(0);
          const newLeftedString = leftedString.substr(1);
          const newFilledString = filledString + enteredLetter;

          const newState: State = {
            ...state,
            stringItem: {
              filledString: newFilledString,
              leftedString: newLeftedString,
              currentLetter: { isMistake: false, value: newCurrentLetter },
            },
            amountEnteredLetter: state.amountEnteredLetter + 1,
          };
          return newState;
        }
        case false: {
          const newState: State = {
            ...state,
            stringItem: {
              ...state.stringItem,
              currentLetter: {
                ...state.stringItem.currentLetter,
                isMistake: true,
              },
            },
            amountEnteredLetter: state.amountEnteredLetter + 1,
          };
          return newState;
        }
        default: {
          return state;
        }
      }
    }
  }
};
