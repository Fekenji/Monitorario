import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from './components/Home';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Horarios from './components/Horarios';
import Agendamentos from './components/Agendamentos';
import Logoff from './components/Logoff';
import { connect } from 'react-redux';

class Rotas extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />

                { this.props.modules.raUsuario ?
                    <Route path="/login" component={Horarios} /> :
                    <Route path="/login" component={Login} />
                }

                { this.props.modules.raUsuario ?
                    <Route path="/signup" component={Horarios} /> :
                    <Route path="/signup" component={Cadastro} />
                }

                { this.props.modules.raUsuario ?
                    <Route path="/horarios" component={Horarios} /> :
                    <Route path="/horarios" component={Login} />
                }

                { this.props.modules.raUsuario ?
                    <Route path="/agendamentos" component={Agendamentos} /> :
                    <Route path="/agendamentos" component={Login} />
                }

                <Route path="/logoff" component={Logoff} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return { modules: state.modules }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Rotas);