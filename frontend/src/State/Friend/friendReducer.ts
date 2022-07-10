import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IFriendWithUser } from 'Types/Friend'
import { fetchFriends } from './friendAsyncActions'

export interface IFriendState {
    [combinedFriendId: number]: IFriendWithUser
}

const initialState: IFriendState = {}

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend(state, { payload: { friend, friend: { friendship } }}: PayloadAction<{friend: IFriendWithUser}>) {
      state[friendship.UserOneID + friendship.UserTwoID] = friend
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, { payload  }) => {    
      payload.forEach((friendWithUser) => {
        const { friendship } = friendWithUser
        state[friendship.UserOneID + friendship.UserTwoID] = friendWithUser
      })
      
    })
  }
})

export const { addFriend } = friendSlice.actions

export default friendSlice.reducer