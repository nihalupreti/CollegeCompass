import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ useHandleSelectSuggestion, onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/search_colleges/?q=${query}`
        );
        console.log("data", response.data);
        const formattedSuggestions = response.data.map((suggestion) => ({
          ...suggestion,
          college_name:
            suggestion.college_name.charAt(0).toUpperCase() +
            suggestion.college_name.slice(1).toLowerCase(),
        }));

        setSuggestions(formattedSuggestions);
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
    if (useHandleSelectSuggestion) {
      const url = `http://localhost:8000/college/${selectedSuggestion.id}/`;
      window.open(url, "_blank");
      setSuggestions([]);
      // perform actions when a suggestion is selected.
    } else {
      console.log(selectedSuggestion);
      onSelect(selectedSuggestion);
    }
  };

  return (
    <>
      <section className="search-bar">
        <p>Search for your Dream College</p>
        <div className="search-wrapper">
          <div className="search">
            <div className="search-field">
              <input
                type="text"
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nepal College of Information Technology, Balkumari"
              />
              <button className="search-button">Search</button>
            </div>
            <div className="autocomplete">
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
          </div>
        </div>
      </section>
    </>
  );
}
