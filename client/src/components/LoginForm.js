import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./loginform.css";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm({ theme }) {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { login, error, dispatch } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    login(email.current.value, password.current.value)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  }

  return (
    <form className={`loginForm component-${theme}`} onSubmit={handleSubmit}>
      <h1 className="loginTitle">Noted</h1>
      <h2 className="loginSubtitle">Login</h2>
      <input
        className="loginFormInput"
        type="email"
        ref={email}
        placeholder="Email"
      />
      <input
        className="loginFormInput"
        type="password"
        ref={password}
        placeholder="Password"
      />
      {error && (
        <span className="loginErrorMessage">
          Incorrect username or password
        </span>
      )}
      <button className="loginFormButton" type="submit">
        Login
      </button>
      <span className="signupText">
        Don't have an account?{" "}
        <Link style={theme === "dark" ? { color: "white" } : {}} to="/register">
          Sign up.
        </Link>
      </span>
    </form>
  );
}
