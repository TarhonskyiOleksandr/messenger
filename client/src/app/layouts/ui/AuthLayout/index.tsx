import { Outlet } from 'react-router-dom';
import { useAuthLayout } from '../../hooks';

const AuthLayout = () => {
  useAuthLayout();

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
