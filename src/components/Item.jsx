import { useContext } from 'react';
import styles from './Item.module.css';
import { DarkModeContext } from '../context/DarkModeContext';
import { TiDeleteOutline } from 'react-icons/ti';

export default function Item({ toDo, handleUpdate, handleDelete }) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={styles.item} key={toDo.uuid}>
      <input
        type="checkbox"
        checked={toDo.isCompleted}
        onChange={() => handleUpdate(toDo.uuid)}
      />
      <span className={toDo.isCompleted ? styles.completed : ''}>
        {toDo.contents}
      </span>
      <button
        className={darkMode ? styles['dark-button'] : ''}
        onClick={() => handleDelete(toDo.uuid)}
      >
        <TiDeleteOutline />
      </button>
    </div>
  );
}
