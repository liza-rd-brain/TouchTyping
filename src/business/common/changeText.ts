import { CurrentLetterType, StringItemType, State } from "../../types.ts";

export const changeText = (
  state: State,
  setState: Function,
  enteredLetter: string
) => {
  const { index, filledString, leftedString, currentLetter } = state.stringItem;
  const isCorrectLetter = checkLetter(currentLetter, enteredLetter);

  switch (isCorrectLetter) {
    case true: {
      const newIndex = index + 1;
      const newCurrentLetter = leftedString.charAt(0);
      const newLeftedString = leftedString.substr(1);
      const newFilledString = filledString + enteredLetter;

      const newState: State = {
        ...state,
        stringItem: {
          index: newIndex,
          filledString: newFilledString,
          leftedString: newLeftedString,
          currentLetter: { isMistake: false, value: newCurrentLetter },
        },
      };
      setState(newState);
      break;
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
      };
      setState(newState);
      break;
    }
    default: {
      break;
    }
  }
};

const checkLetter = (
  currentLetter: CurrentLetterType,
  enteredLetter: string
) => {
  const expectedLetter = currentLetter.value;
  return expectedLetter === enteredLetter;
};
