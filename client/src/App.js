import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { Signup } from "./pages/Signup";

function App() {
  const { loadUser, user, isFetching } = useContext(AuthContext);
  const { loadTheme, theme } = useContext(ThemeContext);

  useEffect(() => {
    loadUser();
    loadTheme();
  }, []);

  return (
    <div className={`App page-${theme}`}>
      <Router>
        <Topbar theme={theme} />

        {!isFetching && (
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Notes /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              exact
              path="/register"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
