import React, { useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import usePosts from "./hooks/usePosts";
import useLocalStorage from "./hooks/useLocalStorage";
import ThemeToggle from "./components/ThemeToggle";
import { useCallback } from "react";
import { useTheme } from "./context/ThemeContext";
import { useMemo } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [scrollMode, setScrollMode] = useLocalStorage("scrollMode", "infinite");
  const [page, setPage] = useState(1); // État pour la pagination

  const { posts, loading, error, hasMore, loadMore } = usePosts({
    searchTerm,
    tag: selectedTag, // Passer le tag sélectionné au hook usePosts
    limit: 10,
    page,
  });

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    setPage(1); // Réinitialiser la page quand la recherche change
  }, []);

  const handleTagSelect = useCallback((tag) => {
    setSelectedTag(tag);
    setPage(1); // Réinitialiser la page quand le tag change
  }, []);

  const handleScrollModeChange = useCallback((mode) => {
    setScrollMode(mode);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  const { theme } = useTheme();

  const themeClasses = useMemo(() => {
    return {
      card: theme === "light" ? "bg-light" : "bg-dark text-white",
      badge: theme === "light" ? "bg-secondary" : "bg-primary",
      button:
        theme === "light" ? "btn-outline-secondary" : "btn-outline-primary",
    };
  }, [theme]);

  return (
    <div className={`container py-4 ${themeClasses.card}`}>
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-5 fw-bold">Blog</h1>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <PostSearch
          onSearch={handleSearchChange}
          onTagSelect={handleTagSelect}
          selectedTag={selectedTag}
        />{" "}
        {/* Passer la fonction de sélection de tag */}
        <PostList
          posts={posts}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={handleLoadMore} // Passer la fonction pour charger plus de posts
          onTagClick={handleTagSelect} // Passer la fonction pour filtrer par tag
          infiniteScroll={scrollMode === "infinite"}
        />
      </main>

      <div>
        <button onClick={() => handleScrollModeChange("infinite")}>
          Mode Infini
        </button>
        <button onClick={() => handleScrollModeChange("paginated")}>
          Mode Pagination
        </button>
      </div>

      <footer className="pt-3 mt-4 text-center border-top">
        <p>TP React Hooks - Blog &middot; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
