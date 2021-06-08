import React, { Component } from 'react';
import './Horarios.scss';
import Rodape from '../Rodape';
import Simbolo from '../../assets/imagens/simbolo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Horarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dadosHorarios: []
        }
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:5000/api/horario';
        fetch(apiUrl)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    dadosHorarios: result
                });
                this.state.dadosHorarios.map((horario) => {
                    var obj = document.getElementById(horario.diaSemana.substring(0, 3).toLowerCase() + " " + horario.horario.substring(11, 16));
                    if (obj) {
                        obj.innerHTML += "<small id='" + horario.idHorario + "'>" + horario.materia + " </small>";

                        if (horario.isReservado) {
                            document.getElementById(horario.idHorario).classList.add("reservado");
                            obj.innerHTML += "<br />"
                        } else {
                            obj.innerHTML += "<button class='btn' id='" + horario.idHorario + "btn" + "'>Marcar</button><br />";
                            document.getElementById(horario.idHorario + "btn").addEventListener('click', () => this.marcar(horario), true)
                        }
                    }

                });
            },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    marcar = (hora) => {
        var idHorario = hora.idHorario;
        var raUsuario = this.props.modules.raUsuario;
        var userForm = { raUsuario, idHorario }
        var apiUrl = 'http://localhost:5000/api/usuarioHorario'
        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
            .then(
                resp => {
                    if (!resp.ok) {
                        console.log('Usuário inexistente ou servidor off-line.');
                    }
                })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })

        var materia = hora.materia;
        var isReservado = true;
        var horario = hora.horario
        var diaSemana = hora.diaSemana;
        var raMonitor = hora.raMonitor;
        userForm = { idHorario, materia, isReservado, horario, diaSemana, raMonitor }

        apiUrl = `http://localhost:5000/api/horario/${idHorario}`;
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
            .then(
                resp => {
                    if (resp.ok) {
                        //console.log(resp.json());
                        resp.json().then((data) => {
                            //console.log(data);
                            //console.log(data)
                        })
                    }
                    else {
                        console.log('Usuário inexistente ou servidor off-line.');
                    }
                })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })

        document.getElementById(hora.idHorario + "btn").remove();
        document.getElementById(hora.idHorario).classList.add("reservado");
        alert(`Horário reservado com sucesso! ${hora.diaSemana} às ${hora.horario.substring(11, 16)}, matéria: ${hora.materia}`);
    }

    render() {
        return (
            <div>
                <div className="menu">
                    <span><Link to="/">Início</Link></span>
                    <span><Link to="/agendamentos">Meus agendamentos</Link></span>
                    <span><Link to="/logoff">Logoff</Link></span>
                </div>
                <img src={Simbolo} alt="Monitorário" id="img" />
                <div className="aux"><Rodape /></div>
                <div className="emCima"></div>
                <div className="aux2"></div>
                <div className="content has-shown">
                    <h1 className="titulo"><b>Horários</b></h1>
                    <div className="center">
                        <table className="tabela">
                            <tbody>
                                <tr className="linhaTabela">
                                    <td className="horario semana" style={{ textAlign: "center" }}>#</td>
                                    <th className="semana">Segunda</th>
                                    <th className="semana">Terça</th>
                                    <th className="semana">Quarta</th>
                                    <th className="semana">Quinta</th>
                                    <th className="semana">Sexta</th>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">07:30</td>
                                    <td id="seg 07:30"></td>
                                    <td id="ter 07:30"></td>
                                    <td id="qua 07:30"></td>
                                    <td id="qui 07:30"></td>
                                    <td id="sex 07:30"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">08:20</td>
                                    <td id="seg 08:20"></td>
                                    <td id="ter 08:20"></td>
                                    <td id="qua 08:20"></td>
                                    <td id="qui 08:20"></td>
                                    <td id="sex 08:20"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">09:10</td>
                                    <td id="seg 09:10"></td>
                                    <td id="ter 09:10"></td>
                                    <td id="qua 09:10"></td>
                                    <td id="qui 09:10"></td>
                                    <td id="sex 09:10"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">10:15</td>
                                    <td id="seg 10:15"></td>
                                    <td id="ter 10:15"></td>
                                    <td id="qua 10:15"></td>
                                    <td id="qui 10:15"></td>
                                    <td id="sex 10:15"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">11:05</td>
                                    <td id="seg 11:05"></td>
                                    <td id="ter 11:05"></td>
                                    <td id="qua 11:05"></td>
                                    <td id="qui 11:05"></td>
                                    <td id="sex 11:05"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">11:55</td>
                                    <td id="seg 11:55"></td>
                                    <td id="ter 11:55"></td>
                                    <td id="qua 11:55"></td>
                                    <td id="qui 11:55"></td>
                                    <td id="sex 11:55"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">13:00</td>
                                    <td id="seg 13:00"></td>
                                    <td id="ter 13:00"></td>
                                    <td id="qua 13:00"></td>
                                    <td id="qui 13:00"></td>
                                    <td id="sex 13:00"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">13:50</td>
                                    <td id="seg 13:50"></td>
                                    <td id="ter 13:50"></td>
                                    <td id="qua 13:50"></td>
                                    <td id="qui 13:50"></td>
                                    <td id="sex 13:50"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">14:40</td>
                                    <td id="seg 14:40"></td>
                                    <td id="ter 14:40"></td>
                                    <td id="qua 14:40"></td>
                                    <td id="qui 14:40"></td>
                                    <td id="sex 14:40"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">15:45</td>
                                    <td id="seg 15:45"></td>
                                    <td id="ter 15:45"></td>
                                    <td id="qua 15:45"></td>
                                    <td id="qui 15:45"></td>
                                    <td id="sex 15:45"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">16:35</td>
                                    <td id="seg 16:35"></td>
                                    <td id="ter 16:35"></td>
                                    <td id="qua 16:35"></td>
                                    <td id="qui 16:35"></td>
                                    <td id="sex 16:35"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">17:25</td>
                                    <td id="seg 17:25"></td>
                                    <td id="ter 17:25"></td>
                                    <td id="qua 17:25"></td>
                                    <td id="qui 17:25"></td>
                                    <td id="sex 17:25"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">18:15</td>
                                    <td id="seg 18:15"></td>
                                    <td id="ter 18:15"></td>
                                    <td id="qua 18:15"></td>
                                    <td id="qui 18:15"></td>
                                    <td id="sex 18:15"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">19:00</td>
                                    <td id="seg 19:00"></td>
                                    <td id="ter 19:00"></td>
                                    <td id="qua 19:00"></td>
                                    <td id="qui 19:00"></td>
                                    <td id="sex 19:00"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">19:40</td>
                                    <td id="seg 19:40"></td>
                                    <td id="ter 19:40"></td>
                                    <td id="qua 19:40"></td>
                                    <td id="qui 19:40"></td>
                                    <td id="sex 19:40"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">20:20</td>
                                    <td id="seg 20:20"></td>
                                    <td id="ter 20:20"></td>
                                    <td id="qua 20:20"></td>
                                    <td id="qui 20:20"></td>
                                    <td id="sex 20:20"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">21:10</td>
                                    <td id="seg 21:10"></td>
                                    <td id="ter 21:10"></td>
                                    <td id="qua 21:10"></td>
                                    <td id="qui 21:10"></td>
                                    <td id="sex 21:10"></td>
                                </tr>
                                <tr className="linhaTabela">
                                    <td className="horario">21:50</td>
                                    <td id="seg 21:50"></td>
                                    <td id="ter 21:50"></td>
                                    <td id="qua 21:50"></td>
                                    <td id="qui 21:50"></td>
                                    <td id="sex 21:50"></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { modules: state.modules }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Horarios);