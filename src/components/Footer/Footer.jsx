import { useDarkMode } from '../../context/DarkModeContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <footer className={styles.footer}>
      <p>
        Double-click to add an item, It is saved when the input box loses focus.
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
