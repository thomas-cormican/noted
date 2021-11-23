import { React, createContext, useState } from "react";

const INITIAL_STATE = {
  theme: localStorage.getItem("theme") || "light",
  loadTheme: () => {},
  changeTheme: () => {},
};

export const ThemeContext = createContext(INITIAL_STATE);

export const ThemeContextProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  function handleChangeTheme() {
    if (localStorage.theme) {
      if (state === "light") {
        setState("dark");
        localStorage.setItem("theme", "dark");
      } else {
        setState("light");
        localStorage.setItem("theme", "light");
      }
    } else {
      setState("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  function handleLoadTheme() {
    let loadedTheme;
    localStorage.getItem("theme")
      ? (loadedTheme = localStorage.getItem("theme"))
      : (loadedTheme = "light");
    localStorage.setItem("theme", loadedTheme);
    setState(loadedTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: state,
        loadTheme: handleLoadTheme,
        changeTheme: handleChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
