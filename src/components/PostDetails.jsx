import React, { memo, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

function PostDetails({ post }) {
  const { theme } = useTheme();
  const themeClasses = useMemo(() => {
    return {
      card: theme === "light" ? "bg-light" : "bg-dark text-white",
      badge: theme === "light" ? "bg-secondary" : "bg-primary",
      button:
        theme === "light" ? "btn-outline-secondary" : "btn-outline-primary",
    };
  }, [theme]);
  if (!post) return null;

  return (
    <div className={`card mb-3 ${themeClasses.card}`}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body.substring(0, 150)}...</p>{" "}
        {/* Afficher un extrait */}
        <p className="card-text">
          <small className="text-muted">
            Réactions:{" "}
            {[post.reactions].reduce(
              (acc, item) => item.likes + item.dislikes + acc,
              0
            )}
          </small>
        </p>
        {/* Les tags seront gérés plus tard */}
      </div>
    </div>
  );
}

export default memo(PostDetails);
