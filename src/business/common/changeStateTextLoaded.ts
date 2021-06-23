import { State } from "../types.ts";

export const changeStateTextLoaded = (
  state: State,
  initialString: string
): State => {
  const leftedString = initialString.substr(1);
  const currentLetter = initialString.charAt(0);

  const initialState: State = {
    ...state,
    stringLoaded: true,
    stringItem: {
      filledString: "",
      leftedString: leftedString,
      currentLetter: {
        ...state.stringItem.currentLetter,
        value: currentLetter,
      },
    },
  };

  return initialState;
};
