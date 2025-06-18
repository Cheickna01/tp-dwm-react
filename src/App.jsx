import React, { useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import usePosts from "./hooks/usePosts";
import useLocalStorage from "./hooks/useLocalStorage"; // Import du hook useLocalStorage

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollMode, setScrollMode] = useLocalStorage("scrollMode", "infinite"); // Utilisation du hook useLocalStorage

  const { posts, loading, error } = usePosts({
    searchTerm,
    infinite: scrollMode === "infinite",
  });

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleScrollModeChange = (mode) => {
    setScrollMode(mode);
  };

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">{/* ... */}</header>

      <main>
        <PostSearch onSearch={handleSearchChange} />
        {/* ... */}
        <PostList
          posts={posts}
          loading={loading}
          error={error}
          infiniteScroll={scrollMode === "infinite"}
        />
      </main>

      {/* Boutons pour changer le mode de défilement */}
      <div>
        <button onClick={() => handleScrollModeChange("infinite")}>
          Mode Infini
        </button>
        <button onClick={() => handleScrollModeChange("paginated")}>
          Mode Pagination
        </button>
      </div>

      {/* ... */}
    </div>
  );
}

export default App;
