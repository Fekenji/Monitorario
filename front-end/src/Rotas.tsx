import { render } from 'react-dom';
import { Switch, Route, Redirect } from 'react-router';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

export default function Rotas() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect from='*' to='/' />
        </Switch>
    );
}
