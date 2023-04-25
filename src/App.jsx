import './App.css';
import { DarkModeProvider } from './context/DarkModeContext';
import Main from './components/Main';
import { useMemo, useState } from 'react';
import styles from './App.module.css';
import useToDoList from './hooks/use-to-do-list';
import Item from './components/Item';
import Footer from './components/Footer';
import Card from './components/Card';
import TextInputWithButton from './components/TextInputWithButton';

export default function App() {
  const [isLoading, error, toDoList, dispatch] = useToDoList();
  const [contents, setContents] = useState('');
  const [filter, setFilter] = useState(undefined);

  const filterToDoList = useMemo(() => {
    if (filter === 'active') {
      return toDoList.filter((toDo) => !toDo.isCompleted);
    }

    if (filter === 'completed') {
      return toDoList.filter((toDo) => toDo.isCompleted);
    }

    return toDoList;
  }, [toDoList, filter]);

  const handleAdd = () => {
    if (contents) {
      dispatch({ type: 'add', contents });
      setContents('');
    }
  };

  const handleChange = (e) => {
    setContents(e.target.value);
  };

  return (
    <DarkModeProvider>
      <Main>
        <h1>To Do</h1>
        <Card>
          <ul className={styles.filter}>
            <li
              className={
                filter !== 'active' && filter !== 'completed'
                  ? styles['active-filter']
                  : ''
              }
              onClick={() => setFilter(undefined)}
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
                <Item toDo={toDo} dispatch={dispatch} />
              ))}
            </div>
          )}
          <TextInputWithButton
            placeholder="Add to do"
            value={contents}
            onChange={handleChange}
            onClick={handleAdd}
          />
        </Card>
        <Footer />
      </Main>
    </DarkModeProvider>
  );
}
