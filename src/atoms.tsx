import { atom } from "recoil";

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
  },
});


export const cardMovement = atom<boolean>({
  key: "cardStatus",
  default: false,
});

