import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';

import './Cadastro.scss';

export default class Cadastro extends Component {
    mostrarSenha() {
        var x = document.getElementById("senha");
        console.log(x.type)

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        return(
            <div className="container has-shown">
            <h1>Cadastro</h1>
            <div className="textbox">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input type="text" name="" placeholder="Nome de usuário" id="" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input type="email" name="" placeholder="E-mail" id="" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faBook} className="icon" />
                <select name="" id="">
                    <option data-default disabled selected>Curso</option>
                    <option value="">16 - Alimentos Integrado ao Ensino Médio (Diurno)</option>
                    <option value="">17 - Eletroeletrônica Integrado ao Ensino Médio (Diurno)</option>
                    <option value="">18 - Enfermagem Integrado ao Ensino Médio (Diurno)</option>
                    <option value="">19 - Informática Integrado ao Ensino Médio (Diurno)</option>
                    <option value="">20 - Mecatrônica Integrado ao Ensino Médio (Diurno)</option>
                    <option value="">21 - Eletroeletrônica Integrado ao Ensino Médio (Noturno)</option>
                    <option value="">22 - Mecatrônica Integrado ao Ensino Médio (Noturno)</option>
                    <option value="">31 - Plásticos (Matutino)</option>
                    <option value="">33 - Meio Ambiente (Noturno)</option>
                    <option value="">39 - Desenvolvimento de Sistemas (Vespertino)</option>
                    <option value="">40 - Eletroeletrônica (Noturno)</option>
                    <option value="">44 - Plásticos (Noturno)</option>
                    <option value="">45 - Telecomunicações (Noturno)</option>
                    <option value="">48 - Mecatrônica (Noturno)</option>
                    <option value="">49 - Enfermagem (Vespertino)</option>
                    <option value="">53 - Segurança do Trabalho (Noturno)</option>
                    <option value="">59 - Desenvolvimento de Sistemas (Noturno)</option>
                    <option value="">52 - Gestão pela Qualidade e Produtividade (Noturno)</option>
                    <option value="">54 - Projetos Mecânicos Assistidos por Computador (Noturno)</option>
                    <option value="">57 - Equipamentos Biomédicos (Noturno)</option>
                    <option value="">58 - Automação Industrial (Noturno)</option>
                </select>
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input type="password" name="" placeholder="Senha" id="senha" />
            </div>
            <div className="mostrar">
                <input type="checkbox" onClick={this.mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                <span className="checkmark"></span>
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input type="password" name="" placeholder="Confirmação de senha" id="senha" />
            </div>
            
            <p>
                Já tem uma conta?
                <Link to="/login"> <b>Faça seu login!</b></Link>
            </p>
            <input className="btn" type="button" value="Registrar" />
        </div>
        );
    };
}
