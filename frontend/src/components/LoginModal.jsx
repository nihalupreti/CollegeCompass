import Modal from "react-modal";
import styles from "./LoginModal.module.css";
import axios from "axios";
import { useState } from "react";

export default function LoginModal({ isOpen, onRequestClose }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/login_credentials/",
        {
          username: userData.username,
          password: userData.password,
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          height: "85%",
          width: "45%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          borderRadius: "10px",
        },
      }}
    >
      <div>
        <header className={styles.header}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
          <h3>Log in or sign up</h3>
        </header>
        <section className={styles.loginForm}>
          <h2>Welcome to CollegeCompass</h2>
          <div className={styles.inputField}>
            <input
              type="text"
              className={styles.usernameField}
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              className={`${styles.passwordField} ${styles.usernameField}`}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={styles.formSubmit}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </section>
      </div>
    </Modal>
  );
}
