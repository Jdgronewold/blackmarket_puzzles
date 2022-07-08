import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IPuzzle } from 'Types/Puzzle'
import { createPuzzle } from './puzzleAsyncActions'
import { fetchUser } from 'State/User/userAsyncActions'

export interface IPuzzleState {
    [puzzleId: number]: IPuzzle
}

const initialState: IPuzzleState = {}

const puzzleSlice = createSlice({
  name: 'puzzles',
  initialState,
  reducers: {
    addPuzzle(state, { payload: { puzzle }}: PayloadAction<{puzzle: IPuzzle}>) {
      state[puzzle.ID] = puzzle
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(createPuzzle.fulfilled, (state, { payload }) => {      
      state[payload.ID] = payload
    })
    builder.addCase(fetchUser.fulfilled, (state, { payload: { Puzzles} }) => {      
      if (Puzzles && Puzzles.length) {
        Puzzles.forEach((puzzle: IPuzzle) => {
          state[puzzle.ID] = puzzle
        })
      }
    })
  }
})

export const { addPuzzle } = puzzleSlice.actions

export default puzzleSlice.reducer