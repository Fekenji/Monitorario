import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import './Login.scss';

function toggleRa(modules) {
    return {
        type: 'LOGIN',
        modules
    }
}

const Login = ({ modules, dispatch }) => {
    const ra = modules.raUsuario
    const [raUsuario, setRa] = useState("");
    const [senhaUsuario, setPassword] = useState("");
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

    const handleSubmit = async e => {
        e.preventDefault();
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
                        //console.log(resp.json());
                        resp.json().then((data) => {
                            console.log(data);
                            // set the state of the user
                            setUser(data);
                            // store the user in localStorage
                            localStorage.setItem('user', data);
                            //console.log(data)

                            (() => dispatch(toggleRa({raUsuario: raUsuario})))()
                        })
                    }
                    else {
                        console.log('Usuário inexistente ou servidor off-line.');
                        setErro("Usuário inexistente ou servidor off-line.");
                    }
                })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
    }

    return (
        <div className="container has-shown">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="textbox">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input type="text" value={raUsuario} onChange={({ target }) => setRa(target.value)} placeholder="Seu RA" title="Digite um RA com 5 números" pattern="[0-9]{5}" required />
                </div>
                <div className="textbox">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" value={senhaUsuario} onChange={({ target }) => setPassword(target.value)} placeholder="Senha" id="senha" required />
                </div>
                <div className="mostrar">
                    <input type="checkbox" onClick={mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                    <span className="checkmark"></span>
                </div>
                <p>
                    Não tem conta?
                    <Link to="/signup"> <b>Cadastre-se!</b></Link>
                </p>
                <input className="botao" type="submit" value="Entrar" />
                <br />
                {
                    erro ?
                        <div>
                            <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                            <div className="erro">
                                <h4 className="msgErro">   {erro}</h4></div></div> :
                        <h4 className="msgErro">{erro}</h4>}
            </form>
        </div>
    );
};

export default connect(state => ({ modules: state.modules }))(Login);