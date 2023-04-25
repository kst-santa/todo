import './App.css';
import { DarkModeContext, DarkModeProvider } from './context/DarkModeContext';
import Main from './components/Main';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import toDoListReducer from './reducer/to-do-list-reducer';
import styles from './App.module.css';
import { TiDeleteOutline } from 'react-icons/ti';
import useToDoList from './hooks/use-to-do-list';
import Item from './components/Item';

export default function App() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isLoading, error, fetchToDoList] = useToDoList();
  const [toDoList, dispatch] = useReducer(toDoListReducer, fetchToDoList);
  const [contents, setContents] = useState('');
  const [filter, setFilter] = useState();

  const filterToDoList = useMemo(() => {
    if (filter === 'active') {
      return toDoList.filter((toDo) => !toDo.isCompleted);
    }

    if (filter === 'completed') {
      return toDoList.filter((toDo) => toDo.isCompleted);
    }

    return toDoList;
  }, [toDoList, filter]);

  useEffect(() => {
    dispatch({ type: 'fetch', fetchList: fetchToDoList });
  }, [fetchToDoList]);

  const handleUpdate = (uuid) => {
    dispatch({ type: 'update', uuid });
  };

  const handleAdd = () => {
    if (contents) {
      dispatch({ type: 'add', contents });
      setContents('');
    }
  };

  const handleDelete = (uuid) => {
    dispatch({ type: 'delete', uuid });
  };

  const handleChange = (e) => {
    setContents(e.target.value);
  };

  return (
    <DarkModeProvider>
      <Main>
        <h1>To Do</h1>
        <div
          className={`${styles.card} ${darkMode ? styles['dark-card'] : ''}`}
        >
          <ul className={styles.filter}>
            <li
              className={
                filter !== 'active' && filter !== 'completed'
                  ? styles['active-filter']
                  : ''
              }
              onClick={() => setFilter()}
            >
              All
            </li>
            <li
              className={filter === 'active' ? styles['active-filter'] : ''}
              onClick={() => setFilter('active')}
            >
              Active
            </li>
            <li
              className={filter === 'completed' ? styles['active-filter'] : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </li>
          </ul>
          {isLoading || error ? (
            <p className={isLoading ? 'loading' : 'error'}>
              {isLoading ? 'Loading...' : `Error: ${error}`}{' '}
            </p>
          ) : (
            <div className={styles.list}>
              {filterToDoList.map((toDo) => (
                <Item
                  toDo={toDo}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
          <div className={styles['input-box']}>
            <input
              type="text"
              placeholder=" Add To Do"
              value={contents}
              onChange={handleChange}
            />
            <button
              className={darkMode ? styles['dark-button'] : ''}
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
        <button
          className={styles['mode-button']}
          onClick={() => toggleDarkMode()}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </Main>
    </DarkModeProvider>
  );
}
