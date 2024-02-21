import styles from "./Bookmark.module.css";

export default function Bookmark({ bookmarks }) {
  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "11rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            boxSizing: "border-box",
            marginBottom: "15px",
          }}
        ></div>

        <h2 className={styles.name}>{bookmarks.college_name}</h2>
        <div className={styles.title}>{bookmarks.affilation}</div>
        <div className={styles.actions}>
          <div className={styles["follow-info"]}>
            <h2>
              <a href="#">
                <span>12</span>
                <small>Followers</small>
              </a>
            </h2>
            <h2>
              <a href="#">
                <span>1000</span>
                <small>Following</small>
              </a>
            </h2>
          </div>
          <div className={styles["follow-btn"]}>
            <button>Details</button>
          </div>
        </div>
        <div className={styles.desc}>{bookmarks.excerpt}</div>
      </div>
    </div>
  );
}
