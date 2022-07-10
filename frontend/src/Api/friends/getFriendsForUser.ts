import { IFriendWithUser } from "Types/Friend"
import axiosRequest from "../request"

export const getFriendsForUser = async (userId: number) => {
  const { data } = await axiosRequest<{data: IFriendWithUser[] }, null>({
    method: "get",
    url: `/api/friend/${userId}`,
  })
  
  return data
}