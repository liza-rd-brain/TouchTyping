import styled from "styled-components";

const StatusItemWrap = styled.div`
  display: grid;
`;

const StatusBlock = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0.8px;
  color: #b5bbc2;
`;

const StatusValueWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StatusName = styled(StatusBlock)`
  text-align: center;
`;

const StatusValue = styled(StatusBlock)`
  font-size: 30px;
  color: rgb(85, 197, 255);
`;

const StatusMeasure = styled(StatusBlock)`
  font-size: 18px;
  flex-wrap: nowrap;
  letter-spacing: -1.5px;
  padding-left: 2px;
  line-height: 46px;
  color: rgb(85, 197, 255);
`;

type StatusItemType = {
  name: string;
  value: number;
  measure: string;
};

export const StatusItem = (props: StatusItemType) => {
  return (
    <StatusItemWrap>
      <StatusName>{props.name.toUpperCase()}</StatusName>
      <StatusValueWrap>
        <StatusValue>{props.value}</StatusValue>
        <StatusMeasure>{props.measure}</StatusMeasure>
      </StatusValueWrap>
    </StatusItemWrap>
  );
};
