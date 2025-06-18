import LoadingSpinner from "./LoadingSpinner";
import PostDetails from "./PostDetails";
import React, { memo } from "react"; // Import de memo
import { useTheme } from "../context/ThemeContext";
import { useMemo } from "react";

function PostList({
  posts = [],
  loading = false,
  error,
  // Les props hasMore, onLoadMore, onPostClick, onTagClick, infiniteScroll
  // seront utilisées dans les exercices futurs
}) {
  let content;

  if (loading) {
    content = <LoadingSpinner />;
  } else if (error) {
    // Le message d'erreur est déjà géré dans App.js, mais on peut le mettre ici aussi
    content = <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  } else if (posts.length > 0) {
    content = posts.map((post) => (
      // Pour l'exercice 1, PostDetails servira de simple carte d'affichage.
      // Le détail complet et la gestion du clic seront implémentés plus tard.
      <PostDetails key={post.id} post={post} />
    ));
  } else {
    content = (
      <p style={{ textAlign: "center", color: "gray" }}>Aucun post trouvé.</p>
    );
  }
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
    <div className={`post-list ${themeClasses.card}`}>
      {content}
      {/* Les boutons de chargement et l'infinite scroll seront ajoutés plus tard */}
    </div>
  );
}

export default memo(PostList);
