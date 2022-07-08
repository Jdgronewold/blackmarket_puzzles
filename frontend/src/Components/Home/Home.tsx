import { useAppDispatch, useAppSelector } from "State/store"

import { Box } from "grommet"
import { PuzzleList } from "Components/Puzzle/PuzzleList"
import { User } from "Types/User"
import { fetchUser } from "State/User/userAsyncActions"
import { getPuzzlesForOwner } from "State/Puzzle/PuzzleSelectors"
import { useEffect } from "react"

export const Home = () => {
  const puzzles = useAppSelector(getPuzzlesForOwner)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const userString = sessionStorage.getItem("user")
    if (userString) {
      const user: User = JSON.parse(userString)
      dispatch(fetchUser(user.ID))
    }
   
  }, [dispatch])
    
  return (
    <Box fill>
      <PuzzleList puzzles={puzzles} />
    </Box>
  )
}