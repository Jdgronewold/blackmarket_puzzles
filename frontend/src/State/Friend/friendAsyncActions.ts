import { createAsyncThunk } from "@reduxjs/toolkit"
import { getFriendsForUser } from "Api/friends/getFriendsForUser"

export const fetchFriends = createAsyncThunk('friends/fetchFriends', async (userId: number) => {
  const friends = await getFriendsForUser(userId)

  return friends
})