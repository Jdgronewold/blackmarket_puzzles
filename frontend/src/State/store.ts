import userReducer, { IUserState } from './User/userReducer'

import { configureStore } from '@reduxjs/toolkit'

export interface IState {
  user: IUserState
}

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export type AppDispatch = typeof store.dispatch;

export default store