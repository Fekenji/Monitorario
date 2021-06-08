import React, { Component } from 'react';
import './Agendado.scss';

export default class Agendado extends Component {
    constructor(props) {
        super(props);

        this.state = {
            desmarcou: false
        }
    }

    desmarcar = () => {
        var apiUrl = `http://localhost:5000/api/usuarioHorario/${this.props.idUsuarioHorario}`

        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        var idHorario = this.props.horario.idHorario
        var materia = this.props.horario.materia;
        var isReservado = false;
        var horario = this.props.horario.horario
        var diaSemana = this.props.horario.diaSemana;
        var raMonitor = this.props.horario.raMonitor;
        var userForm = { idHorario, materia, isReservado, horario, diaSemana, raMonitor }

        apiUrl = `http://localhost:5000/api/horario/${this.props.horario.idHorario}`;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })

        this.setState({ desmarcou: true })
    }

    render() {
        if (this.state.desmarcou) {
            return <div></div>
        } else {
            return (
                <div className="caixa">
                    <h1>{this.props.horario.materia}</h1>
                    <small>{this.props.horario.diaSemana} às {this.props.horario.horario.substring(11, 16)}</small>
                    <br /><br />
                    <button className="desmarcar" onClick={this.desmarcar}>Desmarcar</button>
                </div>
            )
        }

    }
}