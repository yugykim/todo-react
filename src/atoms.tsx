import {atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do" : [],
  },
});


export const cardMovement = atom<boolean>({
  key: "cardStatus",
  default: false,
});

export const todoListStatsState = selector({
  key: "TodoListStats",
  get: ({get}) => {
    const todoList = get(toDoState);
    const totalNum = todoList.length;

    return {
      totalNum
    }
  },
});


