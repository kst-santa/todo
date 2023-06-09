import './App.css';
import { DarkModeProvider } from './context/DarkModeContext';
import Main from './components/Main/Main';
import { useMemo, useState } from 'react';
import styles from './App.module.css';
import useToDoList from './hooks/use-to-do-list';
import Item from './components/Item/Item';
import Footer from './components/Footer/Footer';
import Card from './components/Card/Card';
import Filters from './components/Filters/Filters';

const FILTERS = [
  { text: 'All', value: undefined },
  { text: 'Active', value: 'active' },
  { text: 'Completed', value: 'completed' },
];

export default function App() {
  const [isLoading, error, toDoList, dispatch] = useToDoList();
  const [currentFilter, setCurrentFilter] = useState(undefined);
  const [touchStartTimeStamp, setTouchStartTimeStamp] = useState(0);

  const filterToDoList = useMemo(() => {
    if (currentFilter === 'active') {
      return toDoList.filter((toDo) => !toDo.isCompleted);
    }

    if (currentFilter === 'completed') {
      return toDoList.filter((toDo) => toDo.isCompleted);
    }

    return toDoList;
  }, [toDoList, currentFilter]);

  const handleDoubleClickList = (e) => {
    dispatch({ type: 'add', xPosition: e.pageX, yPosition: e.pageY });
  };

  const handleTouchStartList = (e) => {
    setTouchStartTimeStamp(e.timeStamp);
  };

  const handleTouchEndList = (e) => {
    const { pageX, pageY } = e.changedTouches[0];

    if (e.timeStamp - touchStartTimeStamp > 499) {
      dispatch({ type: 'add', xPosition: pageX, yPosition: pageY });
    }
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
            <div
              className={styles.list}
              onDoubleClick={handleDoubleClickList}
              onTouchStart={handleTouchStartList}
              onTouchEnd={handleTouchEndList}
            >
              {filterToDoList.map((toDo) => (
                <Item
                  key={toDo.uuid}
                  item={toDo}
                  onUpdate={(uuid, contents) => {
                    dispatch({ type: 'update', uuid, contents });
                  }}
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
        </Card>
        <Footer />
      </Main>
    </DarkModeProvider>
  );
}
