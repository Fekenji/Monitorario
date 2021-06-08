import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';
import { MainProvider } from './MainContext';
import { Provider } from 'react-redux';
import store from './Store';

function App() {
  return (
    <>
      <Provider store={store}>
        <MainProvider>
          <BrowserRouter>
            <div>
              <Rotas />
            </div>
          </BrowserRouter>
        </MainProvider>
      </Provider>
    </>
  );
}
export default App;
