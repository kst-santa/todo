import { useContext } from 'react';
import styles from './ItemBasic.module.css';
import { DarkModeContext } from '../../context/DarkModeContext';
import { TiDeleteOutline } from 'react-icons/ti';
import Checkbox from '../Checkbox/Checkbox';

export default function ItemBasic({ item, onCheck, onDelete }) {
  const { darkMode } = useContext(DarkModeContext);
  const { uuid, isCompleted, contents } = item;

  return (
    <div className={`${styles.item} ${darkMode ? styles['dark-item'] : ''}`}>
      <Checkbox
        checked={isCompleted}
        onChange={() => onCheck(uuid)}
        uuid={uuid}
      />
      <label
        className={isCompleted ? styles.completed : ''}
        htmlFor={`checkbox-${uuid}`}
      >
        {contents}
      </label>
      <button onClick={() => onDelete(uuid)}>
        <TiDeleteOutline />
      </button>
    </div>
  );
}
