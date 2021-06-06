import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useRa, useRaUpdate } from '../../MainContext';

import './Login.scss';

const Login = () => {
    const ra = useRa()
    const raUpdate = useRaUpdate()
    const [emailUsuario, setEmail] = useState("");
    const [senhaUsuario, setPassword] = useState("");
    const [user, setUser] = useState();
    const [erro, setErro] = useState('');
    
    if (ra) {
        return (
            <Redirect to='/horarios' />
        ) 
    }
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

        var raUsuario = emailUsuario.substring(2, 7);
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
                            raUpdate(raUsuario);
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

    if (user) {
        return (
            <Redirect to='/horarios' />
        )
    }

    return (
        <div className="container has-shown">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="textbox">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input type="email" value={emailUsuario} onChange={({ target }) => setEmail(target.value)} name="" placeholder="E-mail" id="" pattern=".+@g.unicamp.br" />
                </div>
                <div className="textbox">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" value={senhaUsuario} onChange={({ target }) => setPassword(target.value)} name="" placeholder="Senha" id="senha" />
                </div>
                <div className="mostrar">
                    <input type="checkbox" onClick={mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                    <span className="checkmark"></span>
                </div>
                <p>
                    Não tem conta?
                    <Link to="/signup"> <b>Cadastre-se!</b></Link>
                </p>
                <input className="btn" type="submit" value="Entrar" />
                <br />
                {
                    erro ?
                        <div>
                            <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro"/>
                            <div className="erro">
                            <h4 className="msgErro">   {erro}</h4></div></div> :
                        <h4 className="msgErro">{erro}</h4>}
            </form>
        </div>
    );
};

export default Login;