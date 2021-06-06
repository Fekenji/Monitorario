import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';
import { MainProvider } from './MainContext';

function App() {
  return (
    <>
      <MainProvider>
        <BrowserRouter>
          <div>
            <Rotas />
          </div>
        </BrowserRouter>
      </MainProvider>
    </>
  );
}
export default App;
