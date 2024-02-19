import { useState } from "react";
import MapModal from "./MapModal"; // Assuming you have a MapModal component

export default function Filter() {
  const [sliderValue, setSliderValue] = useState(1000000);
  const [formattedSliderValue, setFormattedSliderValue] = useState("599,999");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false); // State to track if the map modal is open

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    const formattedValue = value.toLocaleString(); // Format number with commas
    setSliderValue(value);
    setFormattedSliderValue(formattedValue); // Update the formatted value state
  };

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  return (
    <div className="filter-section">
      <div className="filter-header">
        <div className="filter-title">Filter</div>
        <span className="clear-filters">Clear all</span>
      </div>

      <div className="filter-group">
        <div className="slider-container">
          <div className="filter-group-header">Prices</div>
          <input
            type="range"
            max={1000000}
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider-input"
            style={{
              width: "100%",
              appearance: "none",
              background: "blue",
              height: "5px",
              borderRadius: "5px",
              outline: "none",
              margin: "10px 0",
            }}
          />
          <div className="slider-value">{`Npr ${formattedSliderValue}`}</div>
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">Type</div>
        <label>
          <input type="checkbox" name="field" value="Engineering" />
          Engineering
        </label>
        <label>
          <input type="checkbox" name="field" value="Commerce" />
          Commerce
        </label>
        <label>
          <input type="checkbox" name="field" value="Medical" />
          Medical
        </label>
        <label>
          <input type="checkbox" name="field" value="All" checked />
          All
        </label>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">By Location</div>
      </div>
      <button className="mapButton" onClick={openMapModal}>
        Open Map
      </button>
      <MapModal isOpen={isMapModalOpen} onRequestClose={closeMapModal} />
    </div>
  );
}
