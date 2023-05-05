import styles from './TextInputWithButton.module.css';

export default function TextInputWithButton({
  placeholder,
  value,
  onChange,
  onClick,
}) {
  return (
    <div className={styles['input-box']}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button onClick={onClick}>Add</button>
    </div>
  );
}
