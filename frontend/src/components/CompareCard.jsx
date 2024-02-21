import styles from "./compare.module.css";

export default function CompareCard({ collegeData }) {
  console.log(collegeData);
  return (
    <div className={styles["compare-row"]}>
      <div className={styles["item"]}>
        <div className={styles["photo"]}>
          <img
            src={"http://localhost:8000" + collegeData.college_image} // Use the college image from collegeData
            alt="college-photo"
          />
        </div>
        <div className={styles["information"]}>
          <div className={styles["primary-detail"]}>
            <h3>{collegeData.college_name}</h3> <h4>{collegeData.address}</h4>{" "}
          </div>
          <div className={styles["secondary-detail"]}>
            <div className={styles["fee"]}>fee: {collegeData.fee}</div>{" "}
            <div className={styles["review"]}>
              affiliation: {collegeData.affiliation}
            </div>
            <div className={styles["website"]}>
              website:{" "}
              <a href={collegeData.college_website}>
                {collegeData.college_website}
              </a>{" "}
            </div>
          </div>
          <div className={styles["info-buttons"]}>
            <button>View full profile</button>
            <button>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
