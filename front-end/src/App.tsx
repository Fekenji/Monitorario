import { BrowserRouter } from 'react-router-dom';

import Rotas from './Rotas';
import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

export function App() {
    return (
        <BrowserRouter>
            <div>
                <Login />
                
            </div>
        </BrowserRouter>
    );
}
