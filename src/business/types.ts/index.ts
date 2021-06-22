export type CurrentLetterType = {
  value: string;
  isMistake: boolean;
};

export type StringItemType = {
  filledString: string;
  leftedString: string;
  currentLetter: CurrentLetterType;
};

export type State = {
  stringLoaded: boolean;
  stringItem: StringItemType;
  amountEnteredLetter: number;
  time: number;
};

export type ActionType =
  | { type: "dataLoaded"; payload: string }
  | { type: "keyClicked"; payload: string }
  | { type: "timeUpdate"; payload: number };
