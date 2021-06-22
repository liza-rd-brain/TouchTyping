import React, { useEffect, useReducer } from "react";

import styled from "styled-components";

import { initialState, reducer } from "./business/reducer";

import { AppContext } from "./App.provider";

import { StatusList } from "./features/StausList";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 80px 0;
`;

const TrainingField = styled.div`
  display: flex;
  margin: 0 auto;
`;

const TextBlock = styled.div`
  border: 1px solid #000;
  width: 800px;
  height: 300px;

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

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      dispatch({ type: "keyClicked", payload: event.key });
    };
    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  useEffect(() => {
    fetch(
      `https://baconipsum.com/api/?callback=?type=all-meat&paras=1&format=text&t=${new Date()}`
    )
      .then((res) => res.text())
      .then(
        (result) => {
          /*           createInitialState(result, setState); */
          dispatch({ type: "dataLoaded", payload: result });
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(
      () => dispatch({ type: "timeUpdate", payload: state.time }),
      1000
    );
    return () => {
      clearInterval(timerInterval);
    };
  }, [state.stringLoaded]);

  const getTextBlock = () => {
    switch (state.stringLoaded) {
      case false: {
        return null;
      }
      case true: {
        return (
          <TrainingField>
            <TextBlock>
              <FilledSpan>{state.stringItem.filledString}</FilledSpan>
              <CaretSpan isMistaken={state.stringItem.currentLetter.isMistake}>
                {state.stringItem.currentLetter.value}
              </CaretSpan>
              <LeftedSpan id="leftedString">
                {state.stringItem.leftedString}
              </LeftedSpan>
            </TextBlock>
            <StatusList />
          </TrainingField>
        );
      }
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Container id="container">{getTextBlock()}</Container>
    </AppContext.Provider>
  );
};
