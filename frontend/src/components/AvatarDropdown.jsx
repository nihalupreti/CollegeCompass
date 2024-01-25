import { useState } from "react";
import styles from "./AvatarDropdown.module.css";

export default function AvatarDropdown() {
  const [isMenuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
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
              <div id={styles.profileName}>Nihal Upreti</div>
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
            <a className={`${styles.userMenuLink}`} href="#">
              <i
                className="bi bi-bookmark-check"
                style={{ fontSize: "20px", width: "20px", height: "20px" }}
              ></i>
              <div>Bookmarks</div>
            </a>
          </li>
          <div className={`${styles.footer}`}>
            <li className={`${styles.userMenuLink}`}>
              <a className={`${styles.userMenuLink}`} href="#">
                <i
                  className="bi bi-gear"
                  style={{ fontSize: "20px", width: "20px", height: "20px" }}
                ></i>
                <div>Settings</div>
              </a>
            </li>
            <li className={`${styles.userMenuLink}`}>
              <a
                className={`${styles.userMenuLink}`}
                href="#"
                style={{ color: "#F44336" }}
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
