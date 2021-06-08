import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import './Alterar.scss';

function toggleRa(modules) {
    return {
        type: 'LOGIN',
        modules
    }
}

const Alterar = ({ modules, dispatch }, props) => {
    const ra = modules.raUsuario
    const [raUsuario, setRa] = useState("");
    const [senhaUsuario, setPassword] = useState("");
    const [novaSenhaUsuario, setNewPassword] = useState("");
    const [user, setUser] = useState();
    const [erro, setErro] = useState('');

    function mostrarSenha() {
        var x = document.getElementById("senha");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    function mostrarSenhaNova() {
        var x = document.getElementById("senhaNova");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }

        x = document.getElementById("senhaNova2");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const raUsuario = ra;
        const userForm = { raUsuario, senhaUsuario };
        await fetch(`http://localhost:5000/api/usuario/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
            .then(
                resp => {
                    if (resp.ok) {
                        resp.json().then((data) => {
                            setUser(data);
                            localStorage.setItem('user', data);

                            const cursoUsuario = data.user.cursoUsuario
                            const isMonitor = data.user.isMonitor
                            const senhaUsuario = novaSenhaUsuario

                            const userForm2 = { raUsuario, senhaUsuario, cursoUsuario, isMonitor }

                            fetch(`http://localhost:5000/api/usuario/${raUsuario}`, {
                                method: "PUT",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(userForm2)
                            })
                        }).then(
                            alert("Senha alterada com sucesso")
                        ).catch(function (error) {
                            setErro("Usuário inexistente ou servidor off-line.");
                        })
                    }
                }
            ).catch(function (error) {
                setErro("Usuário inexistente ou servidor off-line.");
            })
    }

    return (
        <>
            <div className="menu">
                <span><Link to="/">Início</Link></span>
                <span><Link to="/horarios">Horários</Link></span>
                <span><Link to="/logoff">Logoff</Link></span>
            </div>
            <div className="container has-shown">

                <form onSubmit={handleSubmit}>
                    <h1>Alterar Senha</h1>
                    <div className="textbox">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input type="password" value={senhaUsuario} onChange={({ target }) => setPassword(target.value)} placeholder="Senha antiga" id="senha" required />
                    </div>

                    <div className="mostrar">
                        <input type="checkbox" onClick={mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                        <span className="checkmark"></span>
                    </div>

                    <div className="textbox">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input type="password" value={novaSenhaUsuario} onChange={({ target }) => setNewPassword(target.value)} placeholder="Nova senha" id="senhaNova" required />
                    </div>
                    <div className="textbox">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input type="password" placeholder="Confirmar nova senha" id="senhaNova2" required />
                    </div>

                    <div className="mostrar">
                        <input type="checkbox" onClick={mostrarSenhaNova} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                        <span className="checkmark"></span>
                    </div>

                    <input className="botao" type="submit" value="Alterar" />
                    <br />
                    {
                        erro ?
                            <div>
                                <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                                <div className="erro">
                                    <h4 className="msgErro">   {erro}</h4></div></div> :
                            <h4 className="msgErro">{erro}</h4>
                    }
                </form>
            </div>
        </>
    );
}
export default connect(state => ({ modules: state.modules }))(Alterar);