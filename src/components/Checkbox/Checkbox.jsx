import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import styles from './Checkbox.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function Checkbox({ checked, onChange, uuid }) {
  const { darkMode } = useContext(DarkModeContext);
  const id = `checkbox-${uuid ?? uuidv4()}`;

  return (
    <div
      className={`${styles.checkbox} ${
        darkMode ? styles['dark-checkbox'] : ''
      }`}
    >
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id} />
    </div>
  );
}
