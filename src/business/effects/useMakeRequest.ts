import { useEffect } from "react";

import { createInitialState } from "../common";

export function useMakeRequest(setState: Function) {
  useEffect(() => {
    fetch(
      `https://baconipsum.com/api/?callback=?type=all-meat&paras=1&format=text&t=${new Date()}`
    )
      .then((res) => res.text())
      .then(
        (result) => {
          createInitialState(result, setState);
        },

        (error) => {
          console.log(error);
        }
      );
  }, []);
}
