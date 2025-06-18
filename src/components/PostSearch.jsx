import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce"; // Import du hook useDebounce

function PostSearch({
  onSearch,
  // Les props onTagSelect, availableTags, selectedTag
  // seront utilisées dans les exercices futurs
}) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchInput, 300); // Utilisation du hook useDebounce

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // Appelle la fonction onSearch passée par App.js
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onSearch(""); // Réinitialise la recherche
  };
  // useEffect pour effectuer la recherche après le délai de debounce
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {/* Bouton pour effacer la recherche */}
            {searchInput && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleClearSearch}
                aria-label="Effacer la recherche"
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSearch;
