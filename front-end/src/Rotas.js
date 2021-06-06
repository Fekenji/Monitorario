import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Horarios from './components/Horarios';

export default class Rotas extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Cadastro} /> 
                <Route path="/horarios" component={Horarios} /> 
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}
