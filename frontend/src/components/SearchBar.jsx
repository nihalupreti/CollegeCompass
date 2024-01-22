import { useState, useEffect } from "react";
import axios from "axios";

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/search_colleges/?q=${query}`
        );
        console.log("data", response.data);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelectSuggestion = (selectedSuggestion) => {
    setQuery(selectedSuggestion.name);
    // perform additional actions when a suggestion is selected.
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nepal College of Information Technology, Balkumari"
      />
      <ul className="suggestion-list">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={() => handleSelectSuggestion(suggestion)}
          >
            {suggestion.college_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
          <Autocomplete />
          <button className="search-button">Search</button>
        </div>
      </div>
    </section>
  );
}
