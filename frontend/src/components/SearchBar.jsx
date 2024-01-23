import AutoComplete from "./AutoComplete";

export default function SearchBar() {
  return (
    <section className="search-bar">
      <p>Search for your Dream College</p>
      <div className="search-wrapper">
        <select className="search-dropdown">
          <option value="therapist">criteria</option>
        </select>
        <div className="divider"></div>
        <div className="search">
          <AutoComplete />
          <button className="search-button">Search</button>
        </div>
      </div>
    </section>
  );
}
