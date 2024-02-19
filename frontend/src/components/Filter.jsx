import { useState } from "react";
import MapModal from "./MapModal";

export default function Filter({ onFilterChange }) {
  const [sliderValue, setSliderValue] = useState(1000000);
  const [formattedSliderValue, setFormattedSliderValue] = useState("599,999");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    const formattedValue = value.toLocaleString();
    setSliderValue(value);
    setFormattedSliderValue(formattedValue);
    onFilterChange({ sliderValue: value }); // Notify parent component about slider value change
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange({ [name]: checked }); // Notify parent component about checkbox change
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
          <input
            type="checkbox"
            name="engineering"
            onChange={handleCheckboxChange}
          />
          Engineering
        </label>
        <label>
          <input
            type="checkbox"
            name="commerce"
            onChange={handleCheckboxChange}
          />
          Commerce
        </label>
        <label>
          <input
            type="checkbox"
            name="medical"
            onChange={handleCheckboxChange}
          />
          Medical
        </label>
        <label>
          <input
            type="checkbox"
            name="all"
            defaultChecked
            onChange={handleCheckboxChange}
          />
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
