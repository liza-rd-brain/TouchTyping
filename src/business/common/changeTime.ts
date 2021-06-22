import { State } from "../types.ts";

export const getTime = (state: State, initialTime: number): State => {
  const currTime = Date.now();
  const timeInterval = Math.round((currTime - initialTime) / 1000);
  return { ...state, time: timeInterval };
};
