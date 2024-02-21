import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./avatardropdown.module.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function AvatarDropdown({ onLogout }) {
  const [isMenuActive, setMenuActive] = useState(false);
  const [userName, setUserName] = useState(null);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const fetchUserName = async () => {
    try {
      const response = await axios.get("http://localhost:8000/username", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserName(response.data.username);
      } else {
        console.error("Failed to fetch user name");
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    const csrfToken = Cookies.get("csrftoken");
    try {
      const response = await axios.post("http://localhost:8000/logout/", null, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      if (response.status === 200) {
        console.log("Logout successful");
        onLogout();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={styles.userMenuWrap}>
      <a className={styles.miniPhotoWrapper} href="#" onClick={toggleMenu}>
        <img
          className={styles.miniPhoto}
          src="../public/avatar.jpg"
          width="36"
          height="36"
          alt="User Avatar"
        />
      </a>

      <div
        className={`${styles.menuContainer} ${
          isMenuActive ? styles.active : ""
        }`}
      >
        <ul className={`${styles.userMenu}`}>
          <div className={`${styles.profileHighlight}`}>
            <img
              src="../public/avatar.jpg"
              alt="profile-img"
              width="36"
              height="36"
            />
            <div className={`${styles.details}`}>
              <div id={styles.profileName}>{userName}</div>
            </div>
          </div>
          <li className={`${styles.userMenuLink}`}>
            <a className={`${styles.userMenuLink}`} href="#">
              <i
                className="bi bi-bell"
                style={{ fontSize: "20px", width: "20px", height: "20px" }}
              ></i>

              <div>Notifications</div>
            </a>
          </li>
          <li className={`${styles.userMenuLink}`}>
            <Link to="/bookmarks" className={styles.userMenuLink}>
              <i
                className="bi bi-bookmark-check"
                style={{ fontSize: "20px", width: "20px", height: "20px" }}
              ></i>
              <div>Bookmarks</div>
            </Link>
          </li>
          <div className={`${styles.footer}`}>
            {/* <li className={`${styles.userMenuLink}`}>
              <a className={`${styles.userMenuLink}`} href="#">
                <i
                  className="bi bi-gear"
                  style={{ fontSize: "20px", width: "20px", height: "20px" }}
                ></i>
                <div>Settings</div>
              </a>
            </li> */}
            <li className={`${styles.userMenuLink}`}>
              <a
                className={`${styles.userMenuLink}`}
                href="#"
                style={{ color: "#F44336" }}
                onClick={handleLogout}
              >
                <i
                  className="bi bi-box-arrow-in-left"
                  style={{ fontSize: "20px", width: "20px", height: "20px" }}
                ></i>
                <div>Logout</div>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
