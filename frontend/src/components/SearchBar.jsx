export default function SearchBar() {
  return (
    <section className="search-bar">
      <p>Search for your Dream College</p>
      <div className="search-wrapper">
        <select className="search-dropdown">
          <option value="criteria">criteria</option>
          {/* Additional options */}
        </select>
        <div className="divider"></div>
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Nepal College of Information Technology, Balkumari"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    </section>
  );
}
