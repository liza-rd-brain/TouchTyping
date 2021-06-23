import { handleKeyPress, changeStateTextLoaded } from "./common";
import { getTime } from "./common/changeTime";
import { ActionType, State } from "./types.ts";

export const initialState: State = {
  timeStarted: false,
  stringLoaded: false,
  stringItem: {
    filledString: "",
    leftedString: "",
    currentLetter: {
      value: "",
      isMistake: false,
    },
  },
  amountEnteredLetter: 0,
  time: 0,
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case "dataLoaded": {
      const initialString = action.payload;
      return changeStateTextLoaded(state, initialString);
    }
    case "keyClicked": {
      const enteredLetter = action.payload;
      return handleKeyPress(state, enteredLetter);
    }
    case "timeUpdate": {
      const initialTime = action.payload;
      return getTime(state, initialTime);
    }
    default:
      return state;
  }
};
