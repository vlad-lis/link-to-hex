import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../../pages/AuthPage/AuthPage';

const RoutesComponent = (): ReactElement => {
  return (
    <Routes>
      <Route path='/' element={<AuthPage />} />
    </Routes>
  );
};

export default RoutesComponent;
