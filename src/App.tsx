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
};

const text: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, laudantium ut corrupti culpa delectus amet. Reprehenderit porro dolorum, totam pariatur ipsa dignissimos esse accusamus atque consequatur earum blanditiis impedit molestias voluptas quaerat incidunt voluptatibus perspiciatis qui debitis ratione quia. Maxime fuga autem quod! Non assumenda accusamus obcaecati, ullam ea, cum eos minus vel corporis pariatur dolor nulla, illo velit aliquam quia tempore atque saepe dolorum sapiente quasi eum hic quam laboriosam fugiat. Aperiam vero doloribus nam, quisquam temporibus molestias odit quos iste dolore facilis eligendi vitae necessitatibus recusandae eum atque tempore. Enim, ipsum! Quam quasi facilis eos laboriosam placeat molestias quibusdam, at quos, culpa obcaecati laborum illo magni ex ea voluptate repellendus nemo amet. Est et nesciunt quibusdam illum facilis voluptatem magni quos doloremque distinctio quo culpa ducimus, nihil odit similique at! Labore nobis quaerat quas similique maxime fugiat eum animi totam illum a aliquam nam eius, est assumenda error voluptatibus fugit quasi voluptatum nostrum earum, mollitia perspiciatis deleniti recusandae modi? Beatae fuga quas eos iusto quibusdam nam minus nemo ipsa autem nesciunt reiciendis impedit ut, provident cupiditate suscipit molestias enim optio consequatur saepe illo in sit! Alias delectus repellat illo voluptatibus dicta impedit ratione tempora consequuntur, sit qui reiciendis";

let state: State = {
  index: 0,
  filledString: "",
  leftedString: text,
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
`;

const TextSpan = styled.span``;

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
        <TextSpan>{newState.filledString}</TextSpan>
        <TextSpan>//</TextSpan>
        <TextSpan>{newState.leftedString}</TextSpan>
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
  const { index, filledString, leftedString } = state;
  const isCorrectLetter = checkLetter(leftedString, enteredLetter);

  switch (isCorrectLetter) {
    case true: {
      console.log("дать следующую букву");
      const newIndex = index + 1;
      const newLeftedString = leftedString.substr(1);
      const newFilledString = filledString + enteredLetter;
      console.log(newFilledString, newLeftedString);
      const newState = {
        index: newIndex,
        filledString: newFilledString,
        leftedString: newLeftedString,
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

const checkLetter = (leftedString: string, enteredLetter: string) => {
  const expectedLetter = leftedString.charAt(0);
  return expectedLetter === enteredLetter;
};

document.onclick = (e) => {
  document.getElementById("textArea")?.focus();
};
