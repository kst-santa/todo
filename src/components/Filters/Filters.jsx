import styles from './Filters.module.css';

export default function Filters({ filters, current, onClick }) {
  return (
    <ul className={styles.filter}>
      {filters.map((filter, index) => (
        <li
          key={index}
          className={current === filter.value ? styles['active-filter'] : ''}
          onClick={() => onClick(filter.value)}
        >
          {filter.text}
        </li>
      ))}
    </ul>
  );
}
