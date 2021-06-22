import styled from "styled-components";

const StatusItemWrap = styled.div`
  border: 1px solid gray;
  display: grid;
`;

const StatusSpan = styled.div``;

type StatusItemType = {
  name: string;
  value: number;
};

export const StatusItem = (props: StatusItemType) => {
  return (
    <StatusItemWrap>
      <StatusSpan>{props.name}</StatusSpan>
      <StatusSpan>{props.value}</StatusSpan>
    </StatusItemWrap>
  );
};
