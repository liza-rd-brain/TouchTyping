import { useEffect, useReducer } from "react";
import styled from "styled-components";

import { initialState, reducer } from "./business/reducer";

import { AppContext } from "./App.provider";
import { StatusList } from "./features/StausList";
import "./index.css";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const TrainingField = styled.div`
  display: flex;
  align-items: stretch;
  margin: 150px auto 0 auto;
  height: 420px;
  border-radius: 14px;
  background-color: white;
`;

const TextBlock = styled.div`
  width: 780px;
  padding: 30px 45px;
  font-family: sans-serif;
  font-size: 24px;
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
          dispatch({ type: "dataLoaded", payload: result });
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (state.timeStarted)
        dispatch({ type: "timeUpdate", payload: state.time });
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [state.timeStarted]);

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
