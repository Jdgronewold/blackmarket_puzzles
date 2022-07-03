

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("accessToken")
}