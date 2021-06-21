export const createInitialState = (initialString: string, setState: Function) => {
    const leftedString = initialString.substr(1);
    const currentLetter = initialString.charAt(0);
    const initialState = {
      stringLoaded: true,
      stringItem: {
        index: 0,
        filledString: "",
        leftedString: leftedString,
        currentLetter: { isMistake: false, value: currentLetter },
      },
    };
    setState(initialState);
  };
  