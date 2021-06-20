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

const TextSpan = styled.span<SpanType>`
  color: ${(props) => {
    switch (props.status) {
      case "leftedString": {
        return "#808080";
      }
      case "filledString": {
        return "#3855c5";
      }
      case "currentLetter": {
        return "white";
      }
      default: {
        return "none";
      }
    }
  }};

  padding: ${(props) => {
    switch (props.status) {
      case "currentLetter": {
        return "1px";
      }
      default: {
        return "none";
      }
    }
  }};
  background-color: ${(props) => {
    switch (props.status) {
      case "currentLetter": {
        return "#3855c5";
      }
      default: {
        return "none";
      }
    }
  }};

  border: ${(props) => {
    switch (props.status) {
      case "currentLetter": {
        return "1px solid #3855c5";
      }
      default: {
        return "none";
      }
    }
  }};
  border-radius: 3px;
`;

type SpanType = {
  status: "filledString" | "leftedString" | "currentLetter";
};

type State = {
  stringLoaded: boolean;
  stringItem: {
    index: number;
    filledString: string;
    leftedString: string;
    currentLetter: string;
  };
};

const initialtState: State = {
  stringLoaded: false,
  stringItem: {
    index: 0,
    filledString: "",
    leftedString: "",
    currentLetter: "",
  },
};

export const App = () => {
  const [newState, setState] = useState(initialtState);

  const keyClicked = (event: KeyboardEvent) => {
    const enteredLetter: string = event.key;
    console.log(enteredLetter);
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

  const getTextBlock = () => {
    switch (newState.stringLoaded) {
      case false: {
        return null;
      }
      case true: {
        return (
          <TextBlock>
            <TextSpan status={"filledString"}>
              {newState.stringItem.filledString}
            </TextSpan>
            <TextSpan status={"currentLetter"}>
              {newState.stringItem.currentLetter}
            </TextSpan>
            <TextSpan status={"leftedString"} id="leftedString">
              {newState.stringItem.leftedString}
            </TextSpan>
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
      currentLetter: currentLetter,
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

      const newState = {
        index: newIndex,
        filledString: newFilledString,
        leftedString: newLeftedString,
        currentLetter: newCurrentLetter,
      };
      setState(newState);
      break;
    }
    case false: {
      break;
    }
    default: {
      break;
    }
  }
};

const checkLetter = (currentLetter: string, enteredLetter: string) => {
  const expectedLetter = currentLetter;
  return expectedLetter === enteredLetter;
};
