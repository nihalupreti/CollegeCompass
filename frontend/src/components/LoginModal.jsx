import Modal from "react-modal";
import styles from "./AuthModal.module.css";
import axios from "axios";
import { useState } from "react";

export default function LoginModal({ isOpen, onRequestClose, onLoginSuccess }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login_credentials/",
        {
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Call the callback function to notify the parent component about the successful login
        onLoginSuccess();
        onRequestClose(); // Close the modal
      } else {
        // Handle unsuccessful login
        console.error("Login failed");
      }

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
        overlay: {
          backgroundColor: "rgb(0 0 0 / 79%)", // Set the background color for the overlay
        },
        content: {
          height: "auto",
          width: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          borderRadius: "10px",
          overflow: "none ",
          maxWidth: "430px",
        },
      }}
    >
      <div className={`${styles.form} ${styles.login}`}>
        <div className={styles.formContent}>
          <header className={styles.header__title}>Login</header>
          <form action="#">
            <div className={`${styles.field} ${styles.inputField}`}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className={`${styles.field} ${styles.inputField}`}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.password}
                onChange={handleChange}
              />
              <i className={`bx bx-hide ${styles.eyeIcon}`}></i>
            </div>

            <div className={styles.formLink}>
              <a href="#" className={styles.forgotPass}>
                Forgot password?
              </a>
            </div>

            <div className={`${styles.field} ${styles.buttonField}`}>
              <button onClick={handleSubmit}>Login</button>
            </div>
          </form>

          <div className={styles.formLink}>
            <span>
              Dont have an account?
              <a href="#" className={`${styles.link} ${styles.signupLink}`}>
                Signup
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
