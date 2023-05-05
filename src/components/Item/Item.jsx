import { useEffect, useRef, useState } from 'react';
import styles from './Item.module.css';
import { useDarkMode } from '../../context/DarkModeContext';
import { MdDeleteOutline } from 'react-icons/md';

const ITEM_WIDTH = '200px';
const MOBILE_ITEM_WIDTH = '150px';

export default function Item({ item, onUpdate, onCheck, onDelete }) {
  const { isMobile } = useDarkMode();
  const { uuid, xPosition, yPosition, isEdit, contents, isCompleted } = item;
  const checkboxId = `checkbox-${uuid}`;
  const [isDisabled, setIsDisabled] = useState(true);
  const [width, setWidth] = useState('66px');
  const inputRef = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    setWidth(isMobile ? MOBILE_ITEM_WIDTH : ITEM_WIDTH);
  }, [isMobile]);

  useEffect(() => {
    if (isEdit) {
      const current = inputRef.current;

      if (current) {
        setTimeout(() => {
          current.focus();
          setIsDisabled(false);
        });
      }
    } else {
      setIsDisabled(false);
    }
  }, [isEdit, inputRef]);

  return (
    <>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={checkboxId}
        disabled={isDisabled}
        checked={isCompleted}
        onChange={() => onCheck(uuid)}
      />
      <label
        className={`${styles.item} ${isCompleted ? styles.completed : ''}`}
        style={{
          top: `${yPosition}px`,
          left: `${xPosition}px`,
          width,
        }}
        htmlFor={checkboxId}
      >
        {isEdit ? (
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={() => onUpdate(uuid, input)}
          />
        ) : (
          <>{contents}</>
        )}
        <button onClick={() => onDelete(uuid)}>
          <MdDeleteOutline />
        </button>
      </label>
    </>
  );
}
