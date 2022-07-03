import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "Utils/isAuthenticated";

interface IProtectedRouteProps {
  redirectPath?: string,
  children: JSX.Element,
  authCheck?: (props?: any) => boolean
}

export const ProtectedRoute = ({
  authCheck = isAuthenticated,
  redirectPath = '/splash',
  children,
}: IProtectedRouteProps) => {

  if (!authCheck()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};