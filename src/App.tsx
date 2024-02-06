import { Provider } from 'react-redux';
import store from './store/store';
import RoutesComponent from './components/RoutesComponent/RoutesComponent';

function App() {
  return (
    <Provider store={store}>
      <RoutesComponent />
    </Provider>
  );
}

export default App;
