import React from "react";
import { useDispatch } from "react-redux";
import { toggleAlive, step } from "../../features/game/gameSlice"
import Cell from "../Cell/Cell"

const Board = (props) => {
   const dispatch = useDispatch();
   
   return (
      <div>
         <table>
            <tbody>
               {props.board.map((row, i) => {
                  return (
                     <tr key={i}>
                        {row.map((cell, j) => {
                           return (
                              <Cell
                                 key={j}
                                 isAlive={cell.alive}
                                 isNewborn={cell.newborn}
                                 handleClick={() => dispatch(toggleAlive({x: i, y: j}))}
                              />
                           );
                        })}
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

export default Board;
