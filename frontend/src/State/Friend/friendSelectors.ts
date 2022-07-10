import { IFriendWithUser } from "Types/Friend";
import { RootState } from "State/store";
import { createSelector } from "@reduxjs/toolkit";
import { getUser } from "State/User/userSelectors";

export const getFriends = (state: RootState) => state.friends

export const getFriendsForUser = createSelector([getFriends, getUser], (friends, user) => {
  const userId = user?.ID
  if (userId) {
    const filteredFriends: IFriendWithUser[] = Object.values(friends).filter((friendWithUser) => {
      return friendWithUser.friendship.UserOneID === userId || friendWithUser.friendship.UserTwoID === userId
    })

    console.log(filteredFriends);
    

    return filteredFriends
  } else {
    return []
  }
})