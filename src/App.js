import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "./Components/Board/Board";
import { selectBoard, step } from "./features/game/gameSlice";

function App() {
   const board = useSelector(selectBoard);
   const dispatch = useDispatch();

   useEffect(() => {
      const interval = setInterval(() => dispatch(step()), 100);
      return () => clearInterval(interval);
   }, []);

   return (
      <div>
         <h1>Game of Life (React + Redux)</h1>
         <Board board={board} />
         <div onClick={() => (dispatch(step()))}>STEP!</div>
      </div>
   );
}

export default App;
