import React, { useContext } from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

import "./topbar.css";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Topbar({ theme }) {
  const { user, logout } = useContext(AuthContext);
  const { changeTheme } = useContext(ThemeContext);

  return (
    <div className="topbar">
      <div className="topbarLeft">
        <ul className="topbarLeftItems">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <li className="topbarBrand">Noted</li>
          </Link>
        </ul>
      </div>
      <div className="topbarMiddle">
        <span className="topbarUser">{user && user.email}</span>
      </div>
      <div className="topbarRight">
        <ul className="topbarRightItems">
          <li className="topbarRightThemeToggle" onClick={changeTheme}>
            {theme === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
          </li>
          {user && (
            <li className="topbarRightLogout" onClick={logout}>
              <MdLogout />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
