import { useState, BaseSyntheticEvent, SyntheticEvent } from "react";

import styled from "styled-components";
import { check } from "yargs";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 80px 0;
`;

type State = {
  index: number;
  filledString: string;
  leftedString: string;
  currentLetter: string;
};

type SpanType = {
  status: "filledString" | "leftedString" | "currentLetter";
};

const text: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deserunt quae aliquid iusto ducimus? Consequuntur autem sequi suscipit assumenda. Ea, dolorum eum enim distinctio asperiores soluta explicabo dolore, tenetur deserunt obcaecati iste minus quo cumque recusandae fugiat! Fuga quos nisi explicabo soluta odit. Nemo repellat fugit veritatis reiciendis ipsam voluptates, laboriosam asperiores vero ea aperiam quod expedita in quidem dicta. Obcaecati dolor fuga molestias quisquam eligendi consequatur culpa iure. Itaque accusamus, facere quidem totam vitae corrupti at inventore quasi est, doloremque expedita architecto ea. Delectus libero quam, ipsum suscipit eos eius cupiditate laborum tenetur eum inventore corrupti commodi soluta impedit";

const russiaString =
  "Таким образом консультация с широким активом требуют определения и уточнения систем массового участия. Задача организации, в особенности же новая модель организационной деятельности позволяет оценить значение существенных финансовых и административных условий. Товарищи! консультация с широким активом способствует подготовки и реализации систем массового участия. Таким образом консультация с широким активом позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач.";
const leftedString = russiaString.substr(1);
console.log(leftedString);
const currentLetter = russiaString.charAt(0);

let state: State = {
  index: 0,
  filledString: "",
  leftedString: leftedString,
  currentLetter: currentLetter,
};

const TextArea = styled.textarea`
  position: absolute;
  width: 800px;
  height: 300px;
  caret-color: transparent;
  border: none;
  resize: none;
  color: transparent;
  background-color: transparent;
  cursor: default;
  outline: none;
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

  /*   &:after {
    content: "";
    z-index: 5;
    position: absolute;

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
  } */
`;

const HighlightBlock = styled.span`
  width: 10px;
  height: 10px;
  background-color: #3855c5;
`;

const initilstate = state;
export const App = () => {
  const [newState, setState] = useState(initilstate);
  return (
    <Container id="container">
      <TextArea
        id="textArea"
        autoFocus
        onKeyDown={(event) => {
          event.preventDefault();
          const enteredLetter: string = event.key;
          console.log(enteredLetter);
          changeText(newState, setState, enteredLetter);
        }}
      ></TextArea>
      <TextBlock>
        <TextSpan status={"filledString"}>{newState.filledString}</TextSpan>
        <TextSpan status={"currentLetter"}>{newState.currentLetter}</TextSpan>
        <TextSpan status={"leftedString"} id="leftedString">
          {newState.leftedString}
        </TextSpan>
      </TextBlock>
    </Container>
  );
};

{
  /* const getString = (state: State) => {
  const { filledString, leftedString } = state;
  const fullString = filledString + leftedString;
  return fullString;
}; */
}

/**
 * 1. We need check out is input right letter?
 * 2. If its right we need increment index.
 *    Then first letter from  leftedString add to filledString
 *    and removing from leftedString simultaniously.
 *
 */

const changeText = (
  state: State,
  setState: Function,
  enteredLetter: string
) => {
  const { index, filledString, leftedString, currentLetter } = state;
  const isCorrectLetter = checkLetter(currentLetter, enteredLetter);

  switch (isCorrectLetter) {
    case true: {
      console.log("дать следующую букву");
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
      console.log("Неверно");
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

document.onclick = (e) => {
  document.getElementById("textArea")?.focus();
};
