import { useState, useEffect } from "react";
import axios from "axios";

export default function AutoComplete() {
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
    <>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nepal College of Information Technology, Balkumari"
      />
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
    </>
  );
}
