import { useDispatch, useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import puzzleReducer from './Puzzle/puzzleReducer'
import userReducer from './User/userReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    puzzles: puzzleReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store