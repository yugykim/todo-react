import { useRecoilState } from 'recoil';
import { cardMovement, toDoState } from './atoms';
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from './components/Board';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
 `;

const IconBoards = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
 `;

const InnerBoard = styled.div<IAreaProps>`
  position: fixed;
  padding: 2rem;
`;

const IconWrapper = styled.div`
  text-align: center;
  color: #192a56;
  font-size: 1rem;
  &:hover {
    font-size: 3rem;
    transition: font-size .2s ease-in-out;
  }
`;

const ButtonForm = styled.form`
  height: 10vh; 
`;

const Input = styled.input`
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #ccc;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 5px 5px;
  width: 10rem;
  &:focus {
		outline: 0;
		border-color: #7f8fa6;
    width: 15rem;
    transition: width .3s ease-in-out;
	}
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IForm {
  newToDo: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [card, setCardMovement] = useRecoilState(cardMovement);
  const { register, handleSubmit } = useForm<IForm>();

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination?.droppableId) return;
    if (destination?.droppableId === "delete") {
      setToDos((allBoards) => {
        //save the all boards after removing dropped data. 
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      })
      setCardMovement(false);
    }
    if (destination?.droppableId === source.droppableId) {
      //moving in the same board
      setToDos((allBoards) => {
        //because oldToDos, which is toDo atom is object so that we should return
        //object
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      })
    } else {
      //movement between the different boards
      setToDos((allBoards) => {
        //because oldToDos, which is toDo atom is object so that we should return
        //object
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: targetBoard,
        };
      })
    }
  };
  //add new board by user input the name of board.
  const onSubmit = ({ newToDo }: IForm) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [newToDo]: []
      };
    })
  }


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <ButtonForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("newToDo", { required: true, disabled: Object.keys(toDos).length < 6? false: true })}
              type="text"
              placeholder="Add new board"
            />
          </ButtonForm>
          <div>
            <Boards>
              {Object.keys(toDos).map((boardId) => (
                <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
              ))}
            </Boards>
            <IconBoards>
              <Droppable droppableId="delete">
                {(magic, snapshot) => (
                  <InnerBoard
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                  >
                    <IconWrapper>
                      {card ? <FontAwesomeIcon icon={faTrashCan} /> : ""}
                      {magic.placeholder}
                    </IconWrapper>
                  </InnerBoard>
                )}
              </Droppable>
            </IconBoards>
          </div>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
