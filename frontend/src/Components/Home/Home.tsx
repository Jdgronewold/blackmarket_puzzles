import { useDispatch, useSelector } from "react-redux"

import { AppDispatch } from "State/store"
import { User } from "Types/User"
import { fetchUser } from "State/User/userAsyncActions"
import { getUser } from "State/User/userActions"
import { useEffect } from "react"

export const Home = () => {
  const { user } = useSelector(getUser)
  const dispatch: AppDispatch = useDispatch()
  
  useEffect(() => {
    const userString = sessionStorage.getItem("user")
    if (userString) {
      const user: User = JSON.parse(userString)
      dispatch(fetchUser(user.id))
    }
   
  }, [dispatch])
  
  return (
    <div>{user.username}</div>
  )
}