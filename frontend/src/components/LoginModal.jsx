import "./login.css";
import Modal from "react-modal";

export default function LoginModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          height: "50%", // Set the desired height
          width: "50%", // Set the desired width
          margin: "auto", // Center horizontally
          top: "50%", // Center vertically
          left: "50%",
          transform: "translate(-50%, -50%)", // Adjust for both vertical and horizontal centering
        },
      }}
      // additional props and styles can be added here
    >
      <div className="login-container">
        <header>
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
        <section className="login-form">
          <h2>Welcome to CollegeCompass</h2>
          <div className="input-field">
            <input
              type="text"
              className="username-field"
              placeholder="Username"
            />
            <input
              type="password"
              className="password-field"
              placeholder="Password"
            />
          </div>
        </section>
      </div>
    </Modal>
  );
}
