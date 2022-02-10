import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "./Components/Board/Board";
import { selectBoard, step, reset } from "./features/game/gameSlice";
import styled from "styled-components";

function App() {
   const board = useSelector(selectBoard);
   const dispatch = useDispatch();
   const [paused, setPaused] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
         if (!paused) dispatch(step()) 
      }, 100);
      return () => clearInterval(interval);
   }, [paused]);

   return (
      <GridLayout>
         <Title>Game of Life (React + Redux)</Title>
         <BoardWrapper>
            <Board board={board} />
         </BoardWrapper>
         <ControlsWrapper>
            <Button onClick={() => dispatch(reset({density: 0.5}))}>Randomize</Button>
            <Button onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</Button>
            <Button onClick={() => dispatch(step())}>Step</Button>
         </ControlsWrapper>
      </GridLayout>
   );
}

const GridLayout = styled.main`
   height: 100%;
   display: grid;
   grid-template-rows: 112px 1fr 120px;
`

const Title = styled.h1`
   // TODO add title styles
`

const BoardWrapper = styled.div`
   display: flex;
   justify-content: center;
`

const ControlsWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: -15px;
   gap: 15px;
`

const Button = styled.button`
   height: fit-content;
   padding: 4px 6px;
`

export default App;
