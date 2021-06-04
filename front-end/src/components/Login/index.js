import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import './Login.scss';

export default class Login extends Component {
    mostrarSenha() {
        var x = document.getElementById("senha");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        return(
            <div className="container has-shown">
            <h1>Login</h1>
            <div className="textbox">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input type="text" name="" placeholder="Nome de usuário" id="" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input type="password" name="" placeholder="Senha" id="senha" />
            </div>
            <div className="mostrar">
                <input type="checkbox" onClick={this.mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                <span className="checkmark"></span>
            </div>
            <p>
                Não tem conta?
            <Link to="/signup"> <b>Cadastre-se!</b></Link>
            </p>
            <input className="btn" type="button" value="Entrar" />
        </div>
        );
    };
}