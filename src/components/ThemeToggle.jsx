import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import du hook useTheme

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}
    </button>
  );
}

export default ThemeToggle;