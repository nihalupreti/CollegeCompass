import "./compare.css";

export default function Compare() {
  return (
    <div className="total-container">
      <div className="page__info">
        <div>
          <img src="compare.svg" alt="compare-illustration" />
        </div>
        <div className="page__info-text">
          <h1>College Compare Tool</h1>
          <p>
            Compare Colleges side by side to find the right College for you! Add
            up to four College to compare location, fee....
          </p>
        </div>
      </div>
      {/* <AutoComplete /> */}
      <input
        type="text"
        id="college-name"
        name="college-name"
        value="Add a college to compare."
      />
      <div className="compare-row">
        <div className="item1">
          <div className="photo">
            <img
              src="https://www.collegeinfonepal.com/wp-content/uploads/2023/07/Nepal-College-of-Information-Technology-NCIT-Photo-1.jpg"
              alt="college-photo"
            />
          </div>
          <div className="primary-detail">
            <h3>Nepal College of Information tec</h3>
            <h4>Balkumari, Lalitpur</h4>
          </div>
          <div className="secondary-detail">
            <div className="fee">fee:2134234</div>
            <div className="review">review-section-pending</div>
            <div className="website">website:https://ncit.edu.np</div>
          </div>
          <div className="info-buttons">
            <button>View full profile</button>
            <button>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
