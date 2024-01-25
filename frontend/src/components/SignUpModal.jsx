import Modal from "react-modal";
import styles from "./AuthModal.module.css";
import axios from "axios";
import { useState } from "react";

export default function SignUpModal({ isOpen, onRequestClose }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/signup_credentials/",
        {
          email: userData.email,
          password: userData.password,
          confirm_password: userData.confirmPassword,
          user_name: userData.userName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        onRequestClose(); // Call the onRequestClose prop to close the modal
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgb(0 0 0 / 79%)",
        },
        content: {
          height: "auto",
          width: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          borderRadius: "10px",
          overflow: "none",
          maxWidth: "430px",
        },
      }}
    >
      <div className={`${styles.form} ${styles.login}`}>
        <div className={styles.formContent}>
          <header className={styles.header__title}>Signup</header>
          <form action="#">
            <div className={` ${styles.field} ${styles.inputField}`}>
              <input
                type="text"
                name="userName"
                placeholder="username"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles.field} ${styles.inputField}`}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className={` ${styles.field} ${styles.inputField}`}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.password}
                onChange={handleChange}
              />
            </div>

            <div className={`${styles.field} ${styles.inputField}`}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={styles.password}
                onChange={handleChange}
              />
              <i className={`bx bx-hide ${styles.eyeIcon}`}></i>
            </div>

            <div className={`${styles.field} ${styles.buttonField}`}>
              <button onClick={handleSubmit}>Signup</button>
            </div>
          </form>

          <div className={styles.formLink}>
            <span>
              Already have an account?
              <a href="#" className={`${styles.link} ${styles.loginLink}`}>
                Login
              </a>
            </span>
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.mediaOptions}>
          <a href="#" className={`${styles.field} ${styles.google}`}>
            <img
              src="../public/google.png"
              alt=""
              className={styles.googleImg}
            />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </Modal>
  );
}
