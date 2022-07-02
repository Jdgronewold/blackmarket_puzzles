import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from 'Types/User'

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
      // ✅ This "mutating" code is okay inside of createSlice!
      state = { user: action.payload.user }
    },
    userRemoved(state, action) {
      state = { user: null}
    },
  }
})

export const { userAdded, userRemoved } = userSlice.actions

export default userSlice.reducer