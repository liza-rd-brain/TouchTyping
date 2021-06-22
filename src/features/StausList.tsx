import { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../App.provider";
import { StringItemType } from "../business/types.ts";
import { StatusItem } from "../components/StatusItem";

const StatusListWrap = styled.div`
  display: grid;
  width: 100px;
  height: 300px;
  border: 1px solid black;
  padding: 20px;
`;

/* const StatusItem = styled.div`
  border: 1px solid gray;
  display: grid;
`; */

export const StatusList = () => {
  const { state, dispatch } = useAppContext();
  const { stringItem, amountEnteredLetter, time } = state;

  const speed = getSpeed(stringItem, time);

  return (
    <StatusListWrap>
      <StatusItem name={"скорость"} value={speed}></StatusItem>
      <StatusItem name={"точность"} value={0}></StatusItem>
      <StatusItem
        name={"введено символов"}
        value={state.amountEnteredLetter}
      ></StatusItem>
    </StatusListWrap>
  );
};

/**
 * How many right symbol inputed in minute.
 * Right symbol = filledString
 *
 */
const getSpeed = (stringItem: StringItemType, time: number) => {
  const { filledString } = stringItem;
  const speed = Math.round((filledString.length * 60) / time);
  return speed;
};
