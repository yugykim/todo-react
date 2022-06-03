import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "../components/DragabbleCard";
import { cardMovement, ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding-top: 10px 0px;
  background-color: silver ;
  border-radius: 5px;
  min-height: 300px;
 `;


const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;

 `;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const InnerBoard = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
 `;

const Form = styled.form`
  width: 100%;
  input {
    width: 98%;
  }
 `;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const setCardMovement = useSetRecoilState(cardMovement);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]]
      }
    })
    setValue("toDo", "");
  }


  return (
    <div>
      <Wrapper>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("toDo", { required: true })}
            type="text"
            placeholder={`Add task on ${boardId}`}
          />
        </Form>
        <Droppable droppableId={boardId}>
          {(magic, snapshot) => (
            <InnerBoard isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((toDo, index) => (
                <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
              ))}
              {magic.placeholder}
            </InnerBoard>
          )}
        </Droppable>
      </Wrapper>
    </div>
  );
}
export default Board;