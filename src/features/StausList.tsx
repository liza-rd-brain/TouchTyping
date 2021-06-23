import styled from "styled-components";
import { useAppContext } from "../App.provider";
import { StringItemType } from "../business/types.ts";
import { StatusItem } from "../components/StatusItem";

const StatusListWrap = styled.div`
  display: grid;
  width: 124px;
  height: 240px;
  padding: 30px 45px 30px 0;
`;

export const StatusList = () => {
  const { state, dispatch } = useAppContext();
  const { stringItem, amountEnteredLetter, time } = state;

  const speed = getSpeed(stringItem, time);
  const accuracy = getAccuracy(stringItem, amountEnteredLetter);
  return (
    <StatusListWrap>
      <StatusItem
        name={"скорость"}
        value={speed}
        measure={"зн./мин"}
      ></StatusItem>
      <StatusItem name={"точность"} value={accuracy} measure={"%"}></StatusItem>
    </StatusListWrap>
  );
};

const getSpeed = (stringItem: StringItemType, time: number) => {
  const { filledString } = stringItem;
  const speed = Math.round((filledString.length * 60) / time);
  return speed || 0;
};

const getAccuracy = (
  stringItem: StringItemType,
  amountEnteredLetter: number
): number => {
  const { filledString, leftedString } = stringItem;

  const textString = filledString + leftedString;

  const accuracyStep = Number((100 / textString.length).toFixed(1));

  const accuracy =
    100 - (amountEnteredLetter - filledString.length) * accuracyStep;

  return accuracy;
};
