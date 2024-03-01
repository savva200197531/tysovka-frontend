import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

type Props = {}

const PrivateRoute: FC<Props> = () => {
  const token = Cookies.get('accessToken')

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute
