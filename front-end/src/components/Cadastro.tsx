import '../styles/cadastro.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';

export default function Cadastro() {
    return (
        <div className="container">
            <h1>Cadastro</h1>
            <div className="textbox">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input type="text" name="" placeholder="Nome de usuário" id="" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input type="text" name="" placeholder="E-mail" id="" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faBook} className="icon" />
                <input type="text" name="" placeholder="Curso?????" id="" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input type="text" name="" placeholder="Senha" id="senha" />
            </div>
            <div className="textbox">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input type="text" name="" placeholder="Confirmação de senha" id="senha" />
            </div>
            
            <p>
                Já tem uma conta?
                <a href="/signup"> <b>Entrar</b></a>
            </p>
            <input className="btn" type="button" value="Registrar" />
        </div>
    );
}