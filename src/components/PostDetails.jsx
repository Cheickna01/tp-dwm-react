import React from "react";

function PostDetails({ post }) {
  if (!post) return null;
  


  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body.substring(0, 150)}...</p>{" "}
        {/* Afficher un extrait */}
        <p className="card-text">
          <small className="text-muted">
            Réactions: {[post.reactions].reduce((acc, item) => item.likes + item.dislikes + acc, 0)}
          </small>
        </p>
        {/* Les tags seront gérés plus tard */}
      </div>
    </div>
  );
}

export default PostDetails;
