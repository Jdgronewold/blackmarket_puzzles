import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "Utils/isAuthenticated";

interface IUnProtectedRouteProps {
  redirectPath?: string,
  children?: JSX.Element,
  authCheck?: (props?: any) => boolean
}

export const UnProtectedRoute = ({
  authCheck = isAuthenticated,
  redirectPath = '/home',
  children,
}: IUnProtectedRouteProps) => {

  if (authCheck()) {    
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};