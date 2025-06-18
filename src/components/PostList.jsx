import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import PostDetails from './PostDetails'; // Nous allons l'utiliser comme un simple "card" pour l'instant

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
    content = <p style={{ textAlign: 'center', color: "red" }}>{error}</p>;
  } else if (posts.length > 0) {
    content = posts.map(post => (
      // Pour l'exercice 1, PostDetails servira de simple carte d'affichage.
      // Le détail complet et la gestion du clic seront implémentés plus tard.
      <PostDetails key={post.id} post={post} />
    ));
  } else {
    content = <p style={{ textAlign: 'center', color: "gray" }}>Aucun post trouvé.</p>;
  }

  return (
    <div className="post-list">
      {content}
      {/* Les boutons de chargement et l'infinite scroll seront ajoutés plus tard */}
    </div>
  );
}

export default PostList;