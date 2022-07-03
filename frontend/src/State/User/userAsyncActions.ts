import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUser } from "Api/user/getUser"

export const fetchUser = createAsyncThunk('user/getUser', async (userId: number) => {
  const user = await getUser({ userId })

  return user
})