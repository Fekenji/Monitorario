import '../styles/login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import simbolo from '../../public/simbolo.png';


export default function Login() {
    function mostrarSenha() {
        var x = document.getElementById("senha");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div>
            {/*<div className="logo">
                <img src={simbolo} alt="Monitorário" />
                <h1 className="c-main-title has-shown">
                    Monitorário
                  </h1>
    </div>*/}

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
                    <input type="checkbox" onClick={mostrarSenha} id="mostrar" /> <span className="txt">Mostrar Senha</span>
                    <span className="checkmark"></span>
                </div>
                <p>
                    Não tem conta?
                <a href="/signup"> <b>Cadastre-se!</b></a>
                </p>
                <input className="btn" type="button" value="Entrar" />
            </div>
        </div>

    );
}
