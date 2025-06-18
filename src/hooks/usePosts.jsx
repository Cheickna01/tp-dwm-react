import { useState, useEffect, useCallback } from "react"; // Importer useCallback

function usePosts({
  searchTerm = "",
  tag = "",
  limit = 10,
  infinite = true, // Conserver pour les exercices futurs
} = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utiliser useCallback pour mémoriser buildApiUrl
  const buildApiUrl = useCallback(() => {
    // La recherche se fait via le paramètre 'q' pour la recherche globale
    // et '/tags' pour la recherche par tag spécifique.
    // Pour cet exercice 1, nous nous concentrons sur la recherche par 'q'.
    let url = `https://dummyjson.com/posts/search?q=${searchTerm}`;
    // Les paramètres tag, limit, skip seront gérés dans les exercices futurs
    // if (tag) url = `https://dummyjson.com/posts/tag/${tag}`;
    // url += `&limit=${limit}&skip=${skip}`;
    return url;
  }, [searchTerm]); // Reconstruire l'URL seulement si searchTerm change

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null); // Réinitialiser l'erreur avant chaque nouvelle requête

      const response = await fetch(buildApiUrl());

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      console.error("Erreur lors de la récupération des posts:", err);
      setPosts([]); // Vider les posts en cas d'erreur
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [buildApiUrl]); // Déclencher la recherche quand l'URL de l'API change

  return {
    posts,
    loading,
    error,
    infinite // À conserver pour les futurs exercices
  };
}

export default usePosts;