import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthPage from './pages/AuthPage/AuthPage';
import SqueezePage from './pages/SqueezePage/SqueezePage';
import store from './store/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/signup' element={<AuthPage isSignUpPage />} />
          <Route path='/signin' element={<AuthPage isSignUpPage={false} />} />
          <Route path='/squeeze' element={<SqueezePage />} />
          <Route path='/' element={<SqueezePage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
