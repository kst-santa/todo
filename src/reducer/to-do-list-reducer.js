import { v4 as uuidv4 } from 'uuid';

export default function toDoListReducer(toDoList, action) {
  switch (action.type) {
    case 'fetch': {
      return action.fetchList;
    }
    case 'update': {
      return toDoList.map((toDo) => {
        if (toDo.uuid === action.uuid) {
          return {
            ...toDo,
            isCompleted: !toDo.isCompleted,
          };
        }

        return toDo;
      });
    }
    case 'add': {
      return [
        ...toDoList,
        {
          uuid: uuidv4(),
          contents: action.contents,
          isCompleted: false,
        },
      ];
    }
    case 'delete': {
      return toDoList.filter((toDo) => toDo.uuid !== action.uuid);
    }
    default: {
      throw Error(`Unknown action type: ${action.type}`);
    }
  }
}
