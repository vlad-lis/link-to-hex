import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import RoutesComponent from './components/RoutesComponent/RoutesComponent';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RoutesComponent />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
