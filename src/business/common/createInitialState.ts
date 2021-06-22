import { ActionType, State } from "../types.ts";

export const createInitialState = (state: State, initialString: string) => {
  const leftedString = initialString.substr(1);
  const currentLetter = initialString.charAt(0);
  const initialState = {
    stringLoaded: true,
    stringItem: {
      index: 0,
      filledString: "",
      leftedString: leftedString,
      currentLetter: { isMistake: false, value: currentLetter },
    },
    amountEnteredLetter: 0,
    //We keep time since app started
    time: Date.now(),
  };
  return initialState;
};
