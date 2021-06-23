import styled from "styled-components";
import { useAppContext } from "../App.provider";
import { StringItemType } from "../business/types.ts";
import { StatusItem } from "../components/StatusItem";

const TextBlockWrap = styled.div`
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

export const TextBlock = () => {
  const { state, dispatch } = useAppContext();
  return (
    <TextBlockWrap>
      <FilledSpan>{state.stringItem.filledString}</FilledSpan>
      <CaretSpan isMistaken={state.stringItem.currentLetter.isMistake}>
        {state.stringItem.currentLetter.value}
      </CaretSpan>
      <LeftedSpan id="leftedString">{state.stringItem.leftedString}</LeftedSpan>
    </TextBlockWrap>
  );
};
