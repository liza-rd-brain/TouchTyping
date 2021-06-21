import { useAppContext } from "../App.provider";

export const Comp1 = () => {
  const { state } = useAppContext();
  return <div>{state.stringItem.index}</div>;
};
