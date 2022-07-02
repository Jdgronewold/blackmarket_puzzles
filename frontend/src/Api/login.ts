import { User } from "Types/User"
import axiosRequest from "./request"

interface ILoginRequest {
  identity: string,
  password: string
}
export const loginRequest = async ({ identity, password}: ILoginRequest) => {
  const { data } = await axiosRequest<{data: { Token: string, User: User }}, ILoginRequest>({
    method: "post",
    url: "/api/auth/login",
    body: { identity, password }
  })
  sessionStorage.setItem("accessToken", data.Token)
  sessionStorage.setItem("user", JSON.stringify(data.User))
  return data.User
}