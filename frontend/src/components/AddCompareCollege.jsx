import styles from "./compare.module.css";

export default function AddCompareCollege() {
  return (
    <div className={styles["compare-row"]}>
      <div className={`${styles["item"]} ${styles["empty-card"]}`}>
        <div className={styles["box-icon"]}>
          <i className="bi bi-plus-circle" style={{ fontSize: "4rem" }}></i>
        </div>
      </div>
    </div>
  );
}
