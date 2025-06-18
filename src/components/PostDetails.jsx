import React, { memo, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

function PostDetails({ post, onClose, onTagClick }) {
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
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        {onClose && (
          <button
            className={`btn btn-sm ${themeClasses.button}`}
            onClick={onClose}
            aria-label="Fermer"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>

      <div className="card-body">
        <p className="card-text">{post.body}</p>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="me-2">
              ❤️{" "}
              {post.reactions.likes}
            </span>
            <span className="me-2">
              👎{" "}
              {post.reactions.dislikes}
            </span>
            <span>👤 {post.userId}</span>
          </div>
          <div>
            {post.tags &&
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`badge rounded-pill ${themeClasses.badge} me-1`}
                  onClick={(e) => {
                    e.stopPropagation(); // Empêcher le clic sur le tag de déclencher le clic sur le post
                    if (onTagClick) {
                      onTagClick(tag);
                    }
                  }}
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PostDetails);
