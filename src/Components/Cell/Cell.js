import React from "react";
import classes from "./Cell.module.css";

const Cell = (props) => {
   const cellClasses = [];

   if (props.isAlive) {
      cellClasses.push(classes.Alive);
   }

   if (props.isNewborn) {
      cellClasses.push(classes.Newborn);
   }

   return (
      <td className={cellClasses.join(" ")} onClick={props.handleClick}></td>
   );
};

export default Cell;
