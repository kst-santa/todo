import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import styles from './Main.module.css';

export default function Main() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`${styles.main} ${darkMode ? styles['dark-main'] : ''}`}>
      <h1>To Do</h1>
      <div className={`${styles.card} ${darkMode ? styles['dark-card'] : ''}`}>
        <ul className={styles.filter}>
          <li>All</li>
          <li>Active</li>
          <li>Completed</li>
        </ul>
        <div className={styles.list}>
          <div className={styles.item}>
            <input type="checkbox" />
            <span>강의 보기</span>
            <button className={darkMode ? styles['dark-button'] : ''}></button>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <span>카페가기</span>
            <button className={darkMode ? styles['dark-button'] : ''}></button>
          </div>
          <div className={styles.item}>
            <input type="checkbox" />
            <span>청소하기</span>
            <button className={darkMode ? styles['dark-button'] : ''}></button>
          </div>
        </div>
        <div className={styles['input-box']}>
          <input type="text" />
          <button className={darkMode ? styles['dark-button'] : ''}>Add</button>
        </div>
      </div>
      <button
        className={styles['mode-button']}
        onClick={() => toggleDarkMode()}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}
