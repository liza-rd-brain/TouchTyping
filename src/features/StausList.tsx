import styled from "styled-components";
import { useAppContext } from "../App.provider";
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
  const { state } = useAppContext();
  return (
    <StatusListWrap>
      <StatusItem name={"скорость"} value={0}></StatusItem>
      <StatusItem name={"точность"} value={0}></StatusItem>
      <StatusItem
        name={"введено символов"}
        value={state.amountEnteredLetter}
      ></StatusItem>
    </StatusListWrap>
  );
};
