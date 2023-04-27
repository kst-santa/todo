import { v4 as uuidv4 } from 'uuid';

export default function toDoListReducer(toDoList, action) {
  switch (action.type) {
    case 'fetch': {
      return action.fetchList;
    }
    case 'update': {
      const contents = action.contents;

      if (contents === '') {
        return toDoList.filter((toDo) => toDo.uuid !== action.uuid);
      }

      return toDoList.map((toDo) => {
        if (toDo.uuid === action.uuid) {
          return {
            ...toDo,
            isEdit: false,
            contents: contents !== undefined ? contents : toDo.contents,
            isCompleted:
              contents === undefined ? !toDo.isCompleted : toDo.contents,
          };
        }

        return toDo;
      });
    }
    case 'add': {
      const { xPosition, yPosition } = action;

      return [
        ...toDoList,
        {
          uuid: uuidv4(),
          xPosition,
          yPosition,
          isEdit: true,
          contents: '',
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
