import { IPuzzle } from "Types/Puzzle";
import { RootState } from "State/store";
import { createSelector } from "@reduxjs/toolkit";
import { getUser } from "State/User/userSelectors";

const getPuzzles = (state: RootState) => state.puzzles

export const getPuzzlesForOwner = createSelector([getPuzzles, getUser], (puzzles, user) => {
  console.log(puzzles);
  console.log(user);
  
  return Object.values(puzzles).filter((puzzle: IPuzzle) => {
    return puzzle.owner_id === user.user?.ID
  })
})