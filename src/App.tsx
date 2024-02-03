import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<AuthPage isSignUpPage />} />
        <Route path='/signin' element={<AuthPage isSignUpPage={false} />} />
        <Route path='/' element={<AuthPage isSignUpPage={false} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
