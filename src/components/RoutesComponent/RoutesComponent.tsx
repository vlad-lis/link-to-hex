import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../../pages/AuthPage/AuthPage';
import SqueezePage from '../../pages/SqueezePage/SqueezePage';
import StatsPage from '../../pages/StatsPage/StatsPage';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import NotFound from '../../pages/NotFound/NotFound';

const RoutesComponent = (): ReactElement => {
  return (
    <Routes>
      <Route path='/signup' element={<AuthPage isSignUpPage />} />
      <Route path='/signin' element={<AuthPage isSignUpPage={false} />} />
      <Route
        path='/squeeze'
        element={<ProtectedRouteElement element={<SqueezePage />} />}
      />
      <Route
        path='/'
        element={<ProtectedRouteElement element={<StatsPage />} />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
