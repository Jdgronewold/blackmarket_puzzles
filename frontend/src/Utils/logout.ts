export const logout = () => {
  sessionStorage.removeItem("accessToken")
  sessionStorage.removeItem("user")
}