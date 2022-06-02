import {atom, selector } from "recoil";

interface IToDo {
  [key: string]: string[]
}
export const toDoState = atom<IToDo>({
  key: "toDo",
  default: {
    to_do: ["a","b","c"],
    doing: ["e", "f"],
    done: ["g", "h"]
  }
})