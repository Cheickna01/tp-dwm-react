import React, { useState, useCallback, useEffect, memo } from "react";
import useDebounce from "../hooks/useDebounce";
import { useTheme } from "../context/ThemeContext";

function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = "",
}) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchInput, 300);
  const { theme } = useTheme();

  const handleSearchChange = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleTagChange = useCallback(
    (e) => {
      onTagSelect(e.target.value);
    },
    [onTagSelect]
  );
  const handleClearSearch = () => {
    setSearchInput("");
    onSearch(""); // Réinitialise la recherche
  };

  const themeClasses = theme === "light" ? "bg-light" : "bg-dark text-white";

  return (
    <div className={`mb-4`}>
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
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

        {/* Sélecteur de tags */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedTag}
            onChange={handleTagChange}
          >
            <option value="">Tous les tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default memo(PostSearch);
