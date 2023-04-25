import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useToDoList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);

    fetch('data/to_do_list.json')
      .then((res) => res.json())
      .then((data) => {
        setToDoList(
          data.map((item) => {
            return { ...item, uuid: uuidv4() };
          })
        );
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, []);

  return [isLoading, error, toDoList];
}
