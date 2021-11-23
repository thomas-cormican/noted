import { useReducer, createContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  token: null,
  refreshToken: null,
  user: null,
  isFetching: true,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const loadUser = async () => {
    if (localStorage.token) {
      let decoded;
      try {
        decoded = jwt_decode(localStorage.token);
        // Check if the token is expired and if there is a valid refresh token renew both tokens
        if (decoded.exp * 1000 < new Date().getTime()) {
          if (localStorage.refreshToken) {
            try {
              const res = await axios.post("/api/auth/refresh", {
                token: localStorage.getItem("refreshToken"),
              });
              const newToken = res.data.token;
              const newRefreshToken = res.data.refreshToken;

              await dispatch({
                type: "LOADED_USER",
                payload: {
                  token: newToken,
                  user: decoded.user,
                  refreshToken: newRefreshToken,
                },
              });
              localStorage.setItem("token", newToken);
              localStorage.setItem("refreshToken", newRefreshToken);
            } catch (err) {
              console.log("invalid refresh token");
              dispatch({ type: "LOGOUT" });
            }
          } else {
            dispatch({ type: "LOGOUT" });
          }
        } else {
          dispatch({
            type: "LOADED_USER",
            payload: {
              token: localStorage.token,
              user: decoded.user,
              refreshToken: localStorage.refreshToken || null,
            },
          });
        }
      } catch (err) {
        console.log("invalid token");
        dispatch({ type: "LOGOUT" });
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      await dispatch({ payload: res.data, type: "LOGIN_SUCCESS" });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      // await login(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isFetching: state.isFetching,
        error: state.err,
        dispatch,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
