import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <footer>
      <button
        className={styles['mode-button']}
        onClick={() => toggleDarkMode()}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </footer>
  );
}
