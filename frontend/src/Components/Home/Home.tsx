import { getUser } from "State/User/userActions"
import { useSelector } from "react-redux"

export const Home = () => {
  const { user } = useSelector(getUser)
  
  return (
    <div>{user.username}</div>
  )
}