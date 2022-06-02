import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from './components/Board';

const Wrapper = styled.div`
   display: flex;
   max-width: 480px;
   max-width: 680px;
   width: 100%;
   margin: 0 auto;
   justify-content: center;
`;
const Boards = styled.div`
   display: grid;
   width: 100%;
   grid-template-columns: repeat(1, 1fr);
 `;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
