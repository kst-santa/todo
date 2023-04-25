import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import styles from './Card.module.css';

export default function Card({ children }) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`${styles.card} ${darkMode ? styles['dark-card'] : ''}`}>
      {children}
    </div>
  );
}
