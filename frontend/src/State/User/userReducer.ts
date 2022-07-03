import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from 'Types/User'
import { fetchUser } from './userAsyncActions'

export interface IUserState {
  user: User
}

const userSlice = createSlice({
  name: 'todos',
  initialState: () => {
    const stringUser = sessionStorage.getItem("user")
    if (stringUser) {
      const user: User = JSON.parse(stringUser)
      return { user }
    } else {
      return { user: null}
    }
  },
  reducers: {
    userAdded(state, action: PayloadAction<{user: User}>) {
      state = { user: action.payload.user }
    },
    userRemoved(state, action) {
      state = { user: null}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log(action.payload);
      
      state.user = action.payload
    })
  }
})

export const { userAdded, userRemoved } = userSlice.actions

export default userSlice.reducer