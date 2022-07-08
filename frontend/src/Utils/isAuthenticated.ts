

export const isAuthenticated = () => {
  const accessToken = sessionStorage.getItem("accessToken") 
  const user = sessionStorage.getItem("user") 

  return accessToken && user && JSON.parse(user).ID
}