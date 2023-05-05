import styles from './ItemBasic.module.css';
import { TiDeleteOutline } from 'react-icons/ti';
import Checkbox from '../Checkbox/Checkbox';

export default function ItemBasic({ item, onCheck, onDelete }) {
  const { uuid, isCompleted, contents } = item;

  return (
    <div className={styles.item}>
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
