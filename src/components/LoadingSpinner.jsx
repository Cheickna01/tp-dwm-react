import React from 'react';

function LoadingSpinner() {
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

export default LoadingSpinner;