import React, { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { SignupForm } from "../components/SignupForm";
import "./signup.css";

export const Signup = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`signup page-${theme}`}>
      <div className={`signupFormWrapper component-${theme}`}>
        <SignupForm theme={theme} />
      </div>
    </div>
  );
};
