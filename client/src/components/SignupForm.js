import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupForm = ({ theme }) => {
  const [error, setError] = useState("");
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      setError("Passwords do not match");
    } else {
      try {
        await axios.post("/api/auth", {
          email: email.current.value,
          password: password.current.value,
        });
        navigate("/");
      } catch (err) {
        setError("User already exists");
      }
    }
  }

  return (
    <form className={`loginForm component-${theme}`} onSubmit={handleSubmit}>
      <h1 className="loginTitle">Noted</h1>
      <h2 className="loginSubtitle">Sign up</h2>
      <input
        className="loginFormInput"
        type="email"
        ref={email}
        placeholder="Email"
        required
      />
      <input
        className="loginFormInput"
        type="password"
        ref={password}
        placeholder="Password"
        required
      />
      <input
        className="loginFormInput"
        type="password"
        ref={passwordAgain}
        placeholder="Re-enter password"
        required
      />
      {error.length > 0 && <span className="loginErrorMessage">{error}</span>}
      <button className="loginFormButton" type="submit">
        Sign up
      </button>
      <span className="signupText">
        Already have an account?{" "}
        <Link style={theme === "dark" ? { color: "white" } : {}} to="/login">
          Log in.
        </Link>
      </span>
    </form>
  );
};
