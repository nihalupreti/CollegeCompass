import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import SignUpModal from "./SignUpModal";
import AvatarDropdown from "./AvatarDropdown";

export default function NavigationBar({ isLogged, setIsLogged }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");

  const location = useLocation(); //gives route path

  const temporaryStyle = {
    fontFamily: "Roboto, sans-serif",
    color: "#828282",
  };

  const headerHeight = location.pathname === "/colleges" ? "320px" : "0px";

  const handleLoginSuccess = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <header className="main-header" style={{ height: headerHeight }}>
      <section className="top-bar__section">
        <div className="brand">
          <Link to="/">
            <img src="logo.png" alt="brand logo" className="brand-logo" />
            <h1 className="brand-name">CollegeCompass</h1>
          </Link>
        </div>
        <nav>
          <ul className="nav-items">
            <li className={`nav-item ${activePage === "Home" ? "active" : ""}`}>
              <Link to="/" onClick={() => setActivePage("Home")}>
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                activePage === "Colleges" ? "active" : ""
              }`}
            >
              <Link to="/colleges" onClick={() => setActivePage("Colleges")}>
                Colleges
              </Link>
            </li>
            <li
              className={`nav-item ${activePage === "Compare" ? "active" : ""}`}
            >
              <Link to="/compare" onClick={() => setActivePage("Compare")}>
                Compare
              </Link>
            </li>
            <li
              className={`nav-item ${activePage === "About" ? "active" : ""}`}
            >
              <Link to="/bookmarks" onClick={() => setActivePage("Bookmarks")}>
                Bookmarks
              </Link>
            </li>
          </ul>
        </nav>
        <div className="auth">
          {isLogged ? (
            <AvatarDropdown onLogout={handleLogout} /> // Render AvatarComponent if user is logged in
          ) : (
            <>
              <button
                className="auth-button signup-button"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Sign Up
              </button>
              <button
                className="auth-button signin-button"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Log In
              </button>
            </>
          )}
        </div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onRequestClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <SignUpModal
          isOpen={isSignupModalOpen}
          onRequestClose={() => setIsSignupModalOpen(false)}
        />
      </section>
      {location.pathname === "/colleges" ? (
        <div className="location-section">
          <div className="nav-text">
            <p style={temporaryStyle}>Home &gt; Colleges </p>
          </div>
          <div className="background-image"></div>
          <SearchBar useHandleSelectSuggestion={true} />{" "}
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
