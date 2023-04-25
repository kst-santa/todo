import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import styles from './Filters.module.css';

export default function Filters({ filters, current, onClick }) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <ul className={styles.filter}>
      {filters.map((filter, index) => (
        <li
          key={index}
          className={`${
            current === filter.value ? styles['active-filter'] : ''
          } ${darkMode ? styles['dark-filter'] : ''}`}
          onClick={() => onClick(filter.value)}
        >
          {filter.text}
        </li>
      ))}
    </ul>
  );
}
