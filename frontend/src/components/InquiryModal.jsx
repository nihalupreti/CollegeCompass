import { useState } from "react";
import Modal from "react-modal";
import styles from "./InquiryModal.module.css";

export default function InquiryModal({ isOpen, onRequestClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const messageStyle = {
    paddingLeft: "0px",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "8px",
          border: "none",
          width: "auto", // Adjust width automatically
          height: "auto", // Adjust height automatically
          overflow: "auto", // Enable scrolling if content exceeds dimensions
        },
      }}
    >
      <div className={styles["content"]}>
        <div className={styles["container"]}>
          <div className={styles["row"]}>
            <div className={styles["col-md-12"]}>
              <div
                className={`${styles["form"]} ${styles["h-100"]} ${styles["contact-wrap"]} ${styles["p-5"]}`}
              >
                <h3 className={`${styles["text-center"]}`}>Inquiry</h3>
                <form
                  onSubmit={handleSubmit}
                  className={`${styles["mb-5"]}`}
                  id="contactForm"
                >
                  <div className={styles["row"]}>
                    <div
                      className={`${styles["col-md-12"]} ${styles["form-group"]} ${styles["mb-3"]}`}
                    >
                      <label
                        htmlFor="subject"
                        className={`${styles["col-form-label"]}`}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        className={`${styles["form-control"]}`}
                        name="subject"
                        id="subject"
                        placeholder="Your subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles["row mb-5"]}>
                    <div
                      className={`${styles["col-md-12"]} ${styles["form-group"]} ${styles["mb-3"]}`}
                      style={messageStyle}
                    >
                      <label
                        htmlFor="message"
                        className={`${styles["col-form-label"]}`}
                      >
                        Message *
                      </label>
                      <textarea
                        className={`${styles["form-control"]}`}
                        name="message"
                        id="message"
                        cols="30"
                        rows="4"
                        placeholder="Write your message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className={styles["row justify-content-center"]}>
                    <div
                      className={`${styles["col-md-5"]} ${styles["form-group"]} ${styles["text-center"]}`}
                    >
                      <input
                        type="submit"
                        value="Send Message"
                        className={`${styles["btn"]} ${styles["btn-block"]} ${styles["btn-primary"]} ${styles["rounded-0"]} ${styles["py-2"]} ${styles["px-4"]}`}
                      />
                      <span className={styles["submitting"]}></span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
