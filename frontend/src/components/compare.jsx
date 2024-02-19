import { useState } from "react";
import styles from "./compare.module.css";
import CompareCard from "./CompareCard";
import AddCompareCollege from "./AddCompareCollege";
import SearchBar from "./SearchBar";

export default function Compare() {
  const [selectedColleges, setSelectedColleges] = useState([]);

  const handleAddCollege = (collegeData) => {
    setSelectedColleges([...selectedColleges, collegeData]);
  };

  const handleSearchBarSelect = (selectedCollege) => {
    handleAddCollege(selectedCollege);
  };

  return (
    <div className={styles["total-container"]}>
      <div className={styles["page__info"]}>
        <div>
          <img src="compare.svg" alt="compare-illustration" />
        </div>
        <div className={styles["page__info-text"]}>
          <h1>College Compare Tool</h1>
          <p>
            Compare Colleges side by side to find the right College for you! Add
            up to four College to compare location, fee....
          </p>
        </div>
      </div>
      <SearchBar
        useHandleSelectSuggestion={false}
        onSelect={handleSearchBarSelect}
      />

      <div className={styles["compare"]}>
        {[...Array(4)].map((_, index) =>
          selectedColleges[index] ? (
            <CompareCard key={index} collegeData={selectedColleges[index]} />
          ) : (
            <AddCompareCollege key={index} onAddCollege={handleAddCollege} />
          )
        )}
      </div>
    </div>
  );
}
