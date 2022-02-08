import { createSlice } from "@reduxjs/toolkit";

const HEIGHT_CONFIG = 25;
const WIDTH_CONFIG = 76;

export const gameSlice = createSlice({
   name: "game",
   initialState: {
      height: HEIGHT_CONFIG,
      width: WIDTH_CONFIG,
      tileArray: new Array(HEIGHT_CONFIG).fill().map(() =>
         new Array(WIDTH_CONFIG).fill().map(() => {
            const value = Math.random() > 0.70;
            return { alive: value, newborn: value };
         })
      ),
   },
   reducers: {
      toggleAlive: (state, action) => {
         let cell = state.tileArray[action.payload.x][action.payload.y];
         cell.alive = !cell.alive;
         cell.newborn = !cell.newborn;
      },
      step: (state, action) => {

         // helper function to see how many neighboring cells are alive
         const calculateNeighbors = (x, y) => {
            /**
             * we need 3 indicies for both x and y:
             *    the indices of the columns to the left and right of x, and the index of x
             *    the indices of the rows above and below y, and the index of y
             *
             * the indeces of x and y are just themselves, so you just need to calculate the other 4
             * because we want the grid to wrap around pac-man style, we need to account for that (if x or y is on an edge)
             */
            const rowAbove = x - 1 < 0 ? state.height - 1 : x - 1;
            const rowBelow = x + 1 === state.height ? 0 : x + 1;
            const columnLeft = y - 1 < 0 ? state.width - 1 : y - 1;
            const columnRight = y + 1 === state.width ? 0 : y + 1;

            let total = 0;

            // check top row
            total += state.tileArray[rowAbove][columnLeft].alive;
            total += state.tileArray[rowAbove][y].alive;
            total += state.tileArray[rowAbove][columnRight].alive;

            // check middle row
            total += state.tileArray[x][columnLeft].alive;
            total += state.tileArray[x][columnRight].alive;

            // check bottom row
            total += state.tileArray[rowBelow][columnLeft].alive;
            total += state.tileArray[rowBelow][y].alive;
            total += state.tileArray[rowBelow][columnRight].alive;

            return total;
         };

         const newTileArray = [];

         for (let i = 0; i < state.height; i++) {
            let row = [];
            for (let j = 0; j < state.width; j++) {
               let numNeighbors = calculateNeighbors(i, j);
               if (state.tileArray[i][j].alive) {
                  if (numNeighbors === 2 || numNeighbors === 3) {
                     row.push({alive: true, newborn: false});
                  }
                  else {
                     row.push({alive: false, newborn: false});
                  }
               }
               else if (!state.tileArray[i][j].alive) {
                  if (numNeighbors === 3) {
                     row.push({alive: true, newborn: true});
                  }
                  else {
                     row.push({alive: false, newborn: false});
                  }
               }
            }
            newTileArray.push(row);
         }

         state.tileArray = newTileArray;
      },
   },
});

export const { toggleAlive, step } = gameSlice.actions;

export const selectBoard = (state) => {
   return state.app.tileArray;
};

export default gameSlice.reducer;
