import React, { memo } from "react"; // Import de memo
import { useTheme } from "../context/ThemeContext";

function LoadingSpinner() {
  const { theme } = useTheme(); // Utilisation du hook useTheme

  const spinnerClass =
    theme === "light" ? "spinner-border-primary" : "spinner-border-secondary";
  return (
    <div className="d-flex justify-content-center my-4">
      <div
        className="spinner-border text-primary" // Ajout de la classe text-primary pour la couleur
        role="status"
      >
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
}

export default memo(LoadingSpinner);
