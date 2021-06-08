import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faBook, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import './Cadastro.scss';

function toggleRa(modules) {
    return {
        type: 'LOGIN',
        modules
    }
}

const Cadastro = ({ modules, dispatch }) => {
    const ra = modules.raUsuario
    const [raUsuario, setRa] = useState('');
    const [senhaUsuario, setPassword] = useState('');
    const [cursaUsuario, setCurso] = useState('');
    const [isMonitor, setIsMonitor] = useState('');
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
        const isMonitor = false;
        var cursoUsuario = Number.parseInt(cursaUsuario);

        const userForm = { raUsuario, senhaUsuario, cursoUsuario, isMonitor };
        await fetch(`http://localhost:5000/api/usuario/signup`, {
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
                            (() => dispatch(toggleRa({ raUsuario: raUsuario })))()
                        })
                    }
                    else {
                        setErro("Usuário inexistente ou servidor off-line.");
                    }
                })
    }

    return (
        <div className="container has-shown">
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <div className="textbox">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input type="text" placeholder="Seu RA" value={raUsuario} onChange={({ target }) => setRa(target.value)} />
                </div>
                <div className="textbox">
                    <FontAwesomeIcon icon={faBook} className="icon" />
                    <select value={cursaUsuario} onChange={({ target }) => { setCurso(target.value) }} >
                        <option value="curso" selected hidden>Curso</option>
                        <option value="16">16 - Alimentos Integrado ao Ensino Médio (Diurno)</option>
                        <option value="17">17 - Eletroeletrônica Integrado ao Ensino Médio (Diurno)</option>
                        <option value="18">18 - Enfermagem Integrado ao Ensino Médio (Diurno)</option>
                        <option value="19">19 - Informática Integrado ao Ensino Médio (Diurno)</option>
                        <option value="20">20 - Mecatrônica Integrado ao Ensino Médio (Diurno)</option>
                        <option value="21">21 - Eletroeletrônica Integrado ao Ensino Médio (Noturno)</option>
                        <option value="22">22 - Mecatrônica Integrado ao Ensino Médio (Noturno)</option>
                        <option value="31">31 - Plásticos (Matutino)</option>
                        <option value="33">33 - Meio Ambiente (Noturno)</option>
                        <option value="39">39 - Desenvolvimento de Sistemas (Vespertino)</option>
                        <option value="40">40 - Eletroeletrônica (Noturno)</option>
                        <option value="44">44 - Plásticos (Noturno)</option>
                        <option value="45">45 - Telecomunicações (Noturno)</option>
                        <option value="48">48 - Mecatrônica (Noturno)</option>
                        <option value="49">49 - Enfermagem (Vespertino)</option>
                        <option value="53">53 - Segurança do Trabalho (Noturno)</option>
                        <option value="59">59 - Desenvolvimento de Sistemas (Noturno)</option>
                        <option value="52">52 - Gestão pela Qualidade e Produtividade (Noturno)</option>
                        <option value="54">54 - Projetos Mecânicos Assistidos por Computador (Noturno)</option>
                        <option value="57">57 - Equipamentos Biomédicos (Noturno)</option>
                        <option value="58">58 - Automação Industrial (Noturno)</option>
                    </select>
                </div>
                <div className="textbox">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" placeholder="Senha" id="senha" value={senhaUsuario} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <div className="mostrar">
                    <input type="checkbox" onClick={mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                    <span className="checkmark"></span>
                </div>
                <div className="textbox">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" placeholder="Confirmação de senha" id="senha" />
                </div>

                <p>
                    Já tem uma conta?
                <Link to="/login"> <b>Faça seu login!</b></Link>
                </p>
                <input className="botaoCadastro" type="submit" value="Registrar" />
                {
                    erro ?
                        <div>
                            <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                            <div className="erro">
                                <h4 className="msgErro">   {erro}</h4></div></div> :
                        <h4 className="msgErro">{erro}</h4>}
            </form>
        </div>
    )
}
export default connect(state => ({ modules: state.modules }))(Cadastro);