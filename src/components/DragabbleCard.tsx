import React from "react";
 import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
 import styled from "styled-components";
import { cardMovement } from "../atoms";

 const Card = styled.div<{ isDragging:boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging? "#74b9ff" : "white"};
  box-shadow: ${props => props.isDragging? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"}
 `;

 interface IDragabbleCardProps {
   toDoId: number;
   toDoText: string;
   index: number;
 }

 function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  const setCardMovement = useSetRecoilState(cardMovement);
  const onMouseDown = (args: boolean) => {
    const draggingStatus = args
    setCardMovement(() => {
      return draggingStatus;
    })
    return undefined;
  };

   return (
     <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
       {(magic, snapshot) => (
         <Card
          isDragging={snapshot.isDragging}
          onMouseDown={onMouseDown(snapshot.isDragging)}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
         >
           {toDoText}
         </Card>
       )}
     </Draggable>
   );
 }

 export default React.memo(DragabbleCard);


 