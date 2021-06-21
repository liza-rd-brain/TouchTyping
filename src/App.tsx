import { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { CurrentLetterType, StringItemType, State } from "./types.ts";

import { createInitialState, changeText } from "./business/common";
import { useMakeRequest, useAddKeyListener } from "./business/effects/";

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

const FilledSpan = styled.span`
  color: #3855c5;
`;

const LeftedSpan = styled.span`
  color: #808080;
`;

type Carettype = {
  isMistaken?: boolean;
};

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

  useMakeRequest(setState);
  useAddKeyListener(newState, keyClicked);

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
