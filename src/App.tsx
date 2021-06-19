import { useState, BaseSyntheticEvent, SyntheticEvent } from "react";

import styled from "styled-components";
import { check } from "yargs";

const Container = styled.div`
  display: flex;
`;

type State = {
  index: number;
  filledString: string;
  leftedString: string;
};

const text: string = "Lorem ipsum dolor";

let state: State = {
  index: 0,
  filledString: "",
  leftedString: text,
};

const TextInput = styled.textarea`
  border: 1px solid #000;
  width: 800px;
  height: 300px;
`;

const initilstate = state;
export const App = () => {
  const [newState, setState] = useState(initilstate);
  return (
    <Container>
      <TextInput
        defaultValue={getString(state)}
        onKeyDown={(event) => {
          event.preventDefault();
          const enteredLetter: string = event.key;
          console.log(enteredLetter);
          changeText(newState, setState, enteredLetter);
        }}
      ></TextInput>
    </Container>
  );
};

const getString = (state: State) => {
  const { filledString, leftedString } = state;
  const fullString = filledString + leftedString;
  return fullString;
};

/**
 * 1. We need check out is input right letter?
 * 2. If its right we need increment index.
 *    Then first letter from  leftedString add to filledString
 *    and removing from leftedString simultaniously.
 *
 */

const changeText = (
  state: State,
  setState: Function,
  enteredLetter: string
) => {
  const { index, filledString, leftedString } = state;
  const isCorrectLetter = checkLetter(leftedString, enteredLetter);

  switch (isCorrectLetter) {
    case true: {
      console.log("дать следующую букву");
      const newIndex = index + 1;
      const newLeftedString = leftedString.substr(1);
      const newFilledString = filledString + enteredLetter;
      console.log(newFilledString, newLeftedString);
      const newState = {
        index: newIndex,
        filledString: newFilledString,
        leftedString: newLeftedString,
      };
      setState(newState);
      break;
    }
    case false: {
      console.log("Неверно");
      break;
    }
    default: {
      break;
    }
  }
};

const checkLetter = (leftedString: string, enteredLetter: string) => {
  const expectedLetter = leftedString.charAt(0);
  return expectedLetter === enteredLetter;
};
