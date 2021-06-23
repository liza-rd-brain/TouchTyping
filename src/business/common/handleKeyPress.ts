import {
  CurrentLetterType,
  StringItemType,
  State,
  ActionType,
} from "../types.ts";

export const handleKeyPress = (state: State, enteredLetter: string) => {
  const { filledString, leftedString, currentLetter } = state.stringItem;

  /**
   * Any symbol with lenght 1
   */
  const ishHandledKey = enteredLetter.length === 1;

  const isCorrectLetter = currentLetter.value === enteredLetter;
  const isFirstKeyPress = state.amountEnteredLetter === 0;
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
          switch (isFirstKeyPress) {
            case true: {
              return {
                ...newState,
                time: Date.now(),
                timeStarted: true,
              };
            }
            case false:
              return newState;
          }
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
          switch (isFirstKeyPress) {
            case true: {
              return {
                ...newState,
                time: Date.now(),
                timeStarted: true,
              };
            }
            case false:
              return newState;
          }
        }
        default: {
          return state;
        }
      }
    }
  }
};
