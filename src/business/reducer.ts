import { changeText, createInitialState } from "./common";
import { ActionType, State } from "./types.ts";

export const initialState: State = {
  stringLoaded: false,
  stringItem: {
    index: 0,
    filledString: "",
    leftedString: "",
    currentLetter: {
      value: "",
      isMistake: false,
    },
  },
  amountEnteredLetter: 0,
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case "dataLoaded": {
      return createInitialState(state, action);
    }
    case "keyClicked": {
      return changeText(state, action);
    }
    default:
      return state;
  }
};
