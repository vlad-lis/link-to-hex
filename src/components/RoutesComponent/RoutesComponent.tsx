import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';

const RoutesComponent = (): ReactElement => {
  return (
    <Routes>
      <Route path='/' element={<SignUpPage />} />
    </Routes>
  );
};

export default RoutesComponent;
