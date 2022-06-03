import {atom } from "recoil";

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
    Doing: [],
    Done: []
  },
});


export const cardMovement = atom({
  key: "card",
  default: false,
});


