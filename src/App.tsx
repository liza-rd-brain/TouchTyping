import { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 80px 0;
`;

const TextBlock = styled.div`
  border: 1px solid #000;
  width: 800px;
  height: 300px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.8px;
`;

type Carettype = {
  isMistaken?: boolean;
};

const FilledSpan = styled.span`
  color: #3855c5;
`;

const LeftedSpan = styled.span`
  color: #808080;
`;

const CaretSpan = styled.span<Carettype>`
  color: #ffffff;
  padding: 1px;
  background-color: ${(props) => {
    switch (props.isMistaken) {
      case true: {
        return "red";
      }
      case false: {
        return "#3855c5";
      }
      default: {
        return "none";
      }
    }
  }};
  border: ${(props) => {
    switch (props.isMistaken) {
      case true: {
        return "1px solid red;";
      }
      case false: {
        return "1px solid #3855c5;";
      }
      default: {
        return "none";
      }
    }
  }};

  border-radius: 3px;
`;

type CurrentLetterType = {
  value: string;
  isMistake: boolean;
};

type StringItemType = {
  index: number;
  filledString: string;
  leftedString: string;
  currentLetter: CurrentLetterType;
};

type State = {
  stringLoaded: boolean;
  stringItem: StringItemType;
};

const initialtState: State = {
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
};

export const App = () => {
  const [newState, setState] = useState(initialtState);

  const keyClicked = (event: KeyboardEvent) => {
    const enteredLetter: string = event.key;
    changeText(newState, setState, enteredLetter);
  };

  useEffect(() => {
    if (newState.stringLoaded === true) {
      document.addEventListener("keydown", keyClicked);

      return () => {
        document.removeEventListener("keydown", keyClicked);
      };
    }
  }, [newState.stringItem, newState.stringLoaded]);

  useEffect(() => {
    fetch(
      `https://baconipsum.com/api/?callback=?type=all-meat&paras=1&format=text&t=${new Date()}`
    )
      .then((res) => res.text())
      .then(
        (result) => {
          createInitialState(result, setState);
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {}, [newState.stringItem.currentLetter.isMistake]);

  const getTextBlock = () => {
    switch (newState.stringLoaded) {
      case false: {
        return null;
      }
      case true: {
        return (
          <TextBlock>
            <FilledSpan>{newState.stringItem.filledString}</FilledSpan>
            <CaretSpan isMistaken={newState.stringItem.currentLetter.isMistake}>
              {newState.stringItem.currentLetter.value}
            </CaretSpan>
            <LeftedSpan id="leftedString">
              {newState.stringItem.leftedString}
            </LeftedSpan>
          </TextBlock>
        );
      }
    }
  };

  return <Container id="container">{getTextBlock()}</Container>;
};

/**
 * 1. We need check out is input right letter?
 * 2. If its right we need increment index.
 *    Then first letter from  leftedString add to filledString
 *    and removing from leftedString simultaniously.
 *
 */

const createInitialState = (initialString: string, setState: Function) => {
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
  };
  setState(initialState);
};

const changeText = (
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
