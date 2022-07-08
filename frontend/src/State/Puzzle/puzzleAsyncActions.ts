import { IPuzzle } from "Types/Puzzle"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { createPuzzle as createPuzzleAPI } from "Api/puzzles/createPuzzle"

export const createPuzzle = createAsyncThunk('puzzles/createPuzzle', async (puzzle: Partial<IPuzzle>) => {
  const createdPuzzle = await createPuzzleAPI(puzzle)

  return createdPuzzle
})