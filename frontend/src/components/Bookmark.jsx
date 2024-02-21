import styles from "./Bookmark.module.css";

function truncateText(text) {
  const maxLength = 4 * 40; // Assuming average line length of 40 characters
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + " ..."; // Truncate and add ellipsis
  }
  return text;
}

export default function Bookmark({ bookmarks }) {
  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <div
          style={{
            backgroundImage:
              "url(http://localhost:8000" + bookmarks.college_image + ")",

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
        <div className={styles.title}>{bookmarks.address}</div>
        <div className={styles.actions}>
          <div className={styles["follow-btn"]}>
            <button>Details</button>
          </div>
        </div>
        <div>
          <div className={styles.desc}>{truncateText(bookmarks.excerpt)}</div>
        </div>
      </div>
    </div>
  );
}
