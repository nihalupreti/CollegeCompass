import { useState } from "react";

import LoginModal from "./LoginModal";

export default function NavigationBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const temporaryStyle = {
    fontFamily: "Roboto, sans-serif",
    color: "#828282",
  };
  return (
    <header className="main-header">
      <section className="top-bar__section">
        <div className="brand">
          <a href="#">
            <img src="logo.png" alt="brand logo" className="brand-logo" />
            <h1 className="brand-name">Psycozi</h1>
          </a>
        </div>
        <nav>
          <ul className="nav-items">
            <li className="nav-item">
              <a href="">Find a therapist</a>
            </li>
            <li className="nav-item">
              <a href="">Get Help</a>
            </li>
            <li className="nav-item">
              <a href="">Magazine</a>
            </li>
            <li className="nav-item">
              <a href="">Today</a>
            </li>
          </ul>
        </nav>
        <button
          className="auth-button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Log In
        </button>
        <LoginModal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
        />
      </section>
      <div className="nav-text">
        {/* <!-- just a dummy value. will be changed later --> */}
        <p style={temporaryStyle}>Home &gt; New York &gt; New York</p>
      </div>
      <div className="background-image"></div>
      <section className="search-bar">
        <p>Search fo your Dream College</p>

        <div className="search-wrapper">
          <select className="search-dropdown">
            <option value="therapist">criteria</option>
            {/* <!-- Add more options here if needed --> */}
          </select>
          <div className="divider"></div>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Nepal College of Inforamtion Technology, Balkumari"
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>
    </header>
  );
}
