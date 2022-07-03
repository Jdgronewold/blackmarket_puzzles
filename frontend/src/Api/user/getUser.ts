import { User } from "Types/User"
import axiosRequest from "../request"

interface IGetUser {
  userId: number
}

// use redux query for this!
export const getUser = async ({ userId }: IGetUser) => {
  const { data } = await axiosRequest<{data: User }, IGetUser>({
    method: "get",
    url: `/api/user/${userId}`,
  })
  return data
}