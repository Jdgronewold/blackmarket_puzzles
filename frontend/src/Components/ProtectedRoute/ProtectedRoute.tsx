import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRouteProps {
  redirectPath?: string,
  children: JSX.Element,
  authCheck?: (props?: any) => boolean
}

const defaultAuthCheck = () => {
  return !!sessionStorage.getItem("accessToken")
}

export const ProtectedRoute = ({
  authCheck = defaultAuthCheck,
  redirectPath = '/splash',
  children,
}: IProtectedRouteProps) => {
console.log(authCheck());

  if (!authCheck()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};