import { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  TUser,
  useCurrentUserToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/VerifyToken";
import { Navigate } from "react-router-dom";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, role }) => {
  const token = useAppSelector(useCurrentUserToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/auth/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
