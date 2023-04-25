import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import styles from './Main.module.css';

export default function Main({ children }) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`${styles.main} ${darkMode ? styles['dark-main'] : ''}`}>
      {children}
    </div>
  );
}
