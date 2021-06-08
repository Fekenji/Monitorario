import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Agendamentos from '../Agendamentos';
import './Agendamentos.scss';

import Rodape from '../Rodape';
import Simbolo from '../../assets/imagens/simbolo.png';
import Agendado from '../Agendado';

const apiUrlUsuarioHorario = 'http://localhost:5000/api/usuarioHorario/';
const apiUrlHorario = 'http://localhost:5000/api/horario/';

const stateInicial = {
    usuarioHorario: { idUsuarioHorario: 0, raUsuario: '', idHorario: 0 },
    dadosUsuariosHorarios: [],
    horario: {
        idHorario: 0, 
        materia: '', 
        isReservado: false, 
        horario: '', 
        diaSemana: '',
        raMonitor: ''
    },
    dadosHorarios: []
}

class Agendamento extends Component {
    state = { ...stateInicial };

    componentDidMount() {
        fetch(apiUrlUsuarioHorario)
            .then(res => res.json())
            .then(
                (result) => {
                    result.some((r) => {
                        console.log(apiUrlHorario + r.idHorario);
                        fetch(apiUrlHorario + r.idHorario)
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    this.setState({
                                        dadosHorarios: [...this.state.dadosHorarios, result]
                                    });
                                },
                                (error) => {
                                    this.setState({ error });
                                }
                            )
                    })

                    this.setState({
                        dadosUsuariosHorarios: result
                    });
                    
                    console.log("Função didMount:" + result);
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    render() {
        return (
            <div>
                <div className="menu">
                    <span><Link to="/">Início</Link></span>
                    <span><Link to="/horarios">Horários</Link></span>
                    <span><Link to="/logoff">Logoff</Link></span>
                </div>
                <img src={Simbolo} alt="Monitorário" id="img" />
                <div className="aux"><Rodape /></div>
                <div className="emCima"></div>
                <div className="aux2"></div>
                <div className="content has-shown">
                    <h1 className="titulo"><b>Meus agendamentos</b></h1>
                    {
                        console.log(this.state.dadosUsuariosHorarios)}{
                        this.state.dadosUsuariosHorarios.map(
                            (usuarioHorario) => (
                                this.state.dadosHorarios.map(
                                    (horario) => (
                                        usuarioHorario.raUsuario == this.props.modules.raUsuario && usuarioHorario.idHorario === horario.idHorario ?
                                            <Agendado idUsuarioHorario={usuarioHorario.idUsuarioHorario} horario={horario} /> : null
                                    )
                                )
                            )
                        )
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { modules: state.modules }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Agendamento);