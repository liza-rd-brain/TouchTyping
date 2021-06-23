import { useEffect, useReducer } from "react";
import styled from "styled-components";

import { initialState, reducer } from "./business/reducer";

import { AppContext } from "./App.provider";
import { StatusList, TextBlock } from "./features";
import "./index.css";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const TrainingField = styled.div`
  display: flex;
  align-items: stretch;
  margin: 150px auto 0 auto;

  border-radius: 14px;
  background-color: white;
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
            <TextBlock></TextBlock>
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
