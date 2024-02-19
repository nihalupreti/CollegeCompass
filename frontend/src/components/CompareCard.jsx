import styles from "./compare.module.css";

export default function CompareCard({ collegeData }) {
  console.log(collegeData);
  return (
    <div className={styles["compare-row"]}>
      <div className={styles["item"]}>
        <div className={styles["photo"]}>
          <img
            src={collegeData.college_image} // Use the college image from collegeData
            alt="college-photo"
          />
        </div>
        <div className={styles["information"]}>
          <div className={styles["primary-detail"]}>
            <h3>{collegeData.college_name}</h3>{" "}
            {/* Use the college name from collegeData */}
            <h4>{collegeData.address}</h4>{" "}
            {/* Use the college address from collegeData */}
          </div>
          <div className={styles["secondary-detail"]}>
            <div className={styles["fee"]}>fee: {collegeData.fee}</div>{" "}
            {/* Use the college fee from collegeData */}
            <div className={styles["review"]}>review-section-pending</div>
            <div className={styles["website"]}>
              website: <a href={collegeData.website}>{collegeData.website}</a>{" "}
              {/* Use the college website from collegeData */}
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
