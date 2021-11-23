import React, { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import "./login.css";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`login page-${theme}`}>
      <div className={`loginFormWrapper page-${theme}`}>
        <LoginForm theme={theme} />
      </div>
    </div>
  );
}
