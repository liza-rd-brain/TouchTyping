export type CurrentLetterType = {
  value: string;
  isMistake: boolean;
};

export type StringItemType = {
  index: number;
  filledString: string;
  leftedString: string;
  currentLetter: CurrentLetterType;
};

export type State = {
  stringLoaded: boolean;
  stringItem: StringItemType;
  amountEnteredLetter: number;
};

export type ActionType =
  | { type: "dataLoaded"; payload: string }
  | { type: "keyClicked"; payload: string };
