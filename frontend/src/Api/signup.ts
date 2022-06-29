import axiosRequest from "./request"

interface ISignUpRequest {
  name: string,
  email: string,
  password: string
}
export const signUpRequest = ({ name, email, password}: ISignUpRequest) => {
  return axiosRequest({
    method: "post",
    url: "/api/user",
    body: { name, email, password }
  })
}