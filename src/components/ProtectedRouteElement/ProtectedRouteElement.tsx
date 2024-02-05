import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';

type TProtectedRouteElementProps = {
  element: ReactElement;
};

const ProtectedRouteElement = ({
  element,
}: TProtectedRouteElementProps): ReactElement => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? element : <Navigate to='/signin' />;
};

export default ProtectedRouteElement;
