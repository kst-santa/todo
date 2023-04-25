import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import styles from './TextInputWithButton.module.css';

export default function TextInputWithButton({
  placeholder,
  value,
  onChange,
  onClick,
}) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={styles['input-box']}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        className={darkMode ? styles['dark-button'] : ''}
        onClick={onClick}
      >
        Add
      </button>
    </div>
  );
}
