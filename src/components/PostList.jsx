import LoadingSpinner from "./LoadingSpinner";
import PostDetails from "./PostDetails";
import React, { memo } from "react"; // Import de memo
import { useTheme } from "../context/ThemeContext";
import { useMemo } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useCallback } from "react";

function PostList({
  posts = [],
  loading = false,
  error,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true,
}) {
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [loadMoreRef, isIntersecting] = useIntersectionObserver({
    enabled: infiniteScroll,
  });
  const handlePostClick = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  const handleTagClick = useCallback(
    (tag) => {
      if (onTagClick) {
        onTagClick(tag);
      }
    },
    [onTagClick]
  );

  // Charger plus de posts quand l'élément observé est visible
  React.useEffect(() => {
    if (isIntersecting && hasMore && !loading && infiniteScroll) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore, infiniteScroll]);

  let content;

  if (loading) {
    content = <LoadingSpinner />;
  } else if (error) {
    // Le message d'erreur est déjà géré dans App.js, mais on peut le mettre ici aussi
    content = <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  } else if (posts.length > 0) {
    content = posts.map((post) => (
      <PostDetails
        key={post.id}
        post={post}
        onClose={selectedPost ? () => setSelectedPost(null) : null}
        onTagClick={handleTagClick}
      />
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
      {/* Afficher le spinner de chargement seulement s'il y a plus de posts à charger */}
      {loading && posts.length > 0 && <LoadingSpinner />}

      {/* Élément à observer pour le chargement infini */}
      {infiniteScroll && <div ref={loadMoreRef} />}

      {/* Bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && (
        <button onClick={onLoadMore} disabled={loading}>
          {loading ? "Chargement..." : "Charger plus"}
        </button>
      )}
    </div>
  );
}

export default memo(PostList);
