import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AuthPage from './pages/AuthPage/AuthPage';
import SqueezePage from './pages/SqueezePage/SqueezePage';

function App() {
  const [isLoggedIn] = useState<boolean>(!!sessionStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<AuthPage isSignUpPage />} />
        <Route path='/signin' element={<AuthPage isSignUpPage={false} />} />
        <Route path='/squeeze' element={<SqueezePage />} />
        <Route path='/' element={<SqueezePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
