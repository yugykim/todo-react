import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "../components/DragabbleCard";
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from "recoil";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  max-width: 20rem;
  padding-top: 10px 0px;
  background-color: #f5f6fa ;
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

const Input = styled.input`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: white;
  border: none;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  input {
    width: 80%;
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
  const showingDeleteBtn = () => {

  };

  return (
    <div>
      <Wrapper>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Title onMouseOut={showingDeleteBtn}>{boardId}</Title>
          <div><FontAwesomeIcon icon={faX} /></div>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
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