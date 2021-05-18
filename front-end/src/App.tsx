import { BrowserRouter } from 'react-router-dom';

import Rotas from './Rotas';
import Home from './components/Home';

export function App() {
    return (
        <BrowserRouter>
            <div>
                <Home />
                <Rotas />
            </div>
        </BrowserRouter>
    );
}
