import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { darkMode, toggleDarkMode, isMobile } = useContext(DarkModeContext);

  return (
    <footer className={styles.footer}>
      <p>
        {isMobile
          ? 'Touch and hold for at least 0.5 seconds to add an item.'
          : ' Double-click to add an item, It is saved when the input box loses focus.'}
      </p>
      <button
        className={styles['mode-button']}
        onClick={() => toggleDarkMode()}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </footer>
  );
}
