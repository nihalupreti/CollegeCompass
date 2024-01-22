import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";

export default function NavigationBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");

  const location = useLocation(); //gives route path
  console.log(location.pathname);

  const temporaryStyle = {
    fontFamily: "Roboto, sans-serif",
    color: "#828282",
  };

  const headerHeight = location.pathname === "/colleges" ? "350px" : "100px";

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
              <Link to="/about" onClick={() => setActivePage("About")}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <button className="auth-button" onClick={() => setIsModalOpen(true)}>
          Log In
        </button>
        <LoginModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      </section>
      {location.pathname === "/colleges" ? (
        <div>
          <div className="nav-text">
            <p style={temporaryStyle}>Home &gt; New York &gt; New York</p>
          </div>
          <div className="background-image"></div>
          <SearchBar />{" "}
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
