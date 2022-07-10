import { useAppDispatch, useAppSelector } from "State/store"

import { Box } from "grommet"
import { FriendList } from "Components/Friends/FriendsList"
import { PuzzleList } from "Components/Puzzle/PuzzleList"
import { User } from "Types/User"
import { fetchFriends } from "State/Friend/friendAsyncActions"
import { fetchUser } from "State/User/userAsyncActions"
import { getFriendsForUser } from "State/Friend/friendSelectors"
import { getPuzzlesForOwner } from "State/Puzzle/PuzzleSelectors"
import { useEffect } from "react"

export const Home = () => {
  const puzzles = useAppSelector(getPuzzlesForOwner)
  const friends = useAppSelector(getFriendsForUser)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const userString = sessionStorage.getItem("user")
    if (userString) {
      const user: User = JSON.parse(userString)
      dispatch(fetchUser(user.ID))
      dispatch(fetchFriends(user.ID))
    }
   
  }, [dispatch])
    
  return (
    <Box fill>
      <PuzzleList puzzles={puzzles} />
      <FriendList friends={friends} />
    </Box>
  )
}