import './App.css';
import { DarkModeProvider } from './context/DarkModeContext';
import Main from './components/Main/Main';
import { useMemo, useState } from 'react';
import styles from './AppBasic.module.css';
import useToDoList from './hooks/use-to-do-list';
import ItemBasic from './components/ItemBasic/ItemBasic';
import Footer from './components/Footer/Footer';
import Card from './components/Card/Card';
import TextInputWithButton from './components/TextInputWithButton/TextInputWithButton';
import Filters from './components/Filters/Filters';

const FILTERS = [
  { text: 'all', value: undefined },
  { text: 'active', value: 'active' },
  { text: 'completed', value: 'completed' },
];

export default function App() {
  const [isLoading, error, toDoList, dispatch] = useToDoList();
  const [contents, setContents] = useState('');
  const [currentFilter, setCurrentFilter] = useState(undefined);

  const filterToDoList = useMemo(() => {
    if (currentFilter === 'active') {
      return toDoList.filter((toDo) => !toDo.isCompleted);
    }

    if (currentFilter === 'completed') {
      return toDoList.filter((toDo) => toDo.isCompleted);
    }

    return toDoList;
  }, [toDoList, currentFilter]);

  const handleClickButton = () => {
    if (contents.trim()) {
      dispatch({ type: 'addBasic', contents });
    }

    setContents('');
  };

  return (
    <DarkModeProvider>
      <Main>
        <h1>To Do</h1>
        <Card>
          <Filters
            filters={FILTERS}
            current={currentFilter}
            onClick={(value) => {
              setCurrentFilter(value);
            }}
          />
          {isLoading || error ? (
            <p className={isLoading ? 'loading' : 'error'}>
              {isLoading ? 'Loading...' : `Error: ${error}`}{' '}
            </p>
          ) : (
            <div className={styles.list}>
              {filterToDoList.map((toDo) => (
                <ItemBasic
                  key={toDo.uuid}
                  item={toDo}
                  onCheck={(uuid) => {
                    dispatch({ type: 'update', uuid });
                  }}
                  onDelete={(uuid) => {
                    dispatch({ type: 'delete', uuid });
                  }}
                />
              ))}
            </div>
          )}
          <TextInputWithButton
            placeholder="Add to do"
            value={contents}
            onChange={(e) => {
              setContents(e.target.value);
            }}
            onClick={handleClickButton}
          />
        </Card>
        <Footer />
      </Main>
    </DarkModeProvider>
  );
}
