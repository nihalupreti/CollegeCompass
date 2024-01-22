export default function Filter() {
  return (
    <div className="filter-section">
      <div className="filter-header">
        <div className="filter-title">Filter</div>
        <span className="clear-filters">Clear all</span>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">Prices</div>
        <label>
          <input type="checkbox" name="price" value="1" />$ (Less than $90)
        </label>
        <label>
          <input type="checkbox" name="price" value="2" checked />
          $$ ($90 to $130)
        </label>
        <label>
          <input type="checkbox" name="price" value="3" />
          $$$ ($130 to $150)
        </label>
        <label>
          <input type="checkbox" name="price" value="4" />
          $$$$ (More than $150)
        </label>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">Gender</div>
        <label>
          <input type="checkbox" name="gender" value="male" />
          Male
        </label>
        <label>
          <input type="checkbox" name="gender" value="female" />
          Female
        </label>
        <label>
          <input type="checkbox" name="gender" value="non-binary" checked />
          Non-Binary
        </label>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">Therapy Type</div>
        <label>
          <input type="checkbox" name="therapy" value="couple" />
          Couple Counselling
        </label>
        <label>
          <input type="checkbox" name="therapy" value="family" />
          Family Therapy
        </label>
        <label>
          <input type="checkbox" name="therapy" value="cognitive" checked />
          Cognitive Behavioral
        </label>
        <label>
          <input type="checkbox" name="therapy" value="play" />
          Play therapy
        </label>
        <label>
          <input type="checkbox" name="therapy" value="trauma" />
          Trauma Forced
        </label>
      </div>
    </div>
  );
}
