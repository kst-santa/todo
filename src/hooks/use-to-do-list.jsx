import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toDoListReducer from '../reducer/to-do-list-reducer';

export default function useToDoList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [toDoList, dispatch] = useReducer(toDoListReducer, []);

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);

    fetch('data/to_do_list.json')
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'fetch',
          fetchList: data.map((item) => {
            return { ...item, uuid: uuidv4() };
          }),
        });
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    dispatch({ type: 'fetch', fetchList: toDoList });
  }, [toDoList]);

  return [isLoading, error, toDoList, dispatch];
}
