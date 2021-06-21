import { useEffect } from "react";
import { CurrentLetterType, StringItemType, State } from "../../types.ts";

export function useAddKeyListener(newState: State, keyClicked: Function) {
  useEffect(() => {
    if (newState.stringLoaded === true) {
      document.addEventListener("keydown", (event) => keyClicked(event));

      return () => {
        document.removeEventListener("keydown", (event) => keyClicked(event));
      };
    }
  }, [newState.stringItem, newState.stringLoaded]);
}
