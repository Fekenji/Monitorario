import '../styles/aos.scss';
import '../styles/Home.scss';

import aos from '../scripts/aos';

import simbolo from '../../public/simbolo.png';

export function Home() {
    return (
        <>
            <main className="l-main" id="sec-1" onLoad={aos.init}>
                <div className="content1">
                    <img src={simbolo} alt="Monitorário" />
                    <h1 className="c-main-title has-shown">
                        Monitorário
                  </h1>
                    <button className="c-button has-shown">
                        Entrar
                  </button>
                    <a href="#sec-2">
                        <svg version="1.1" className="flecha" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.996 491.996">
                            <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848
			                         L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128
			                         c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084
			                         c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224
			                         C491.996,136.902,489.204,130.046,484.132,124.986z"
                            />
                        </svg>
                    </a>
                </div>
            </main>
            <div className="sec-2" id="sec-2">
                <div className="fundo-azul">
                    <div className="titulo2">
                        <h1 data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                            Sua Monitoria de um Jeito Novo
                      </h1>
                    </div>
                    <div className="sobre">
                        <article data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                            Criado por estudantes do Colégio Técnico de Campinas (COTUCA) no ano de 2021, o Monitorário possui o
                            objetivo de ajudar pessoas a reservar horários na monitoria.
                      </article>
                    </div>
                    <div className="sobre-2">
                        <article data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                            Com uma interface bonita e de fácil utilização, o site te ajudará a estudar rumo aos seus objetivos.
                      </article>
                    </div>
                    <a href="#sec-3">
                        <svg version="1.1" className="flecha" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.996 491.996">
                            <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848
			                         L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128
			                         c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084
			                         c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224
			                         C491.996,136.902,489.204,130.046,484.132,124.986z"
                            />
                        </svg>
                    </a>
                </div>
                <div className="sec-3" id="sec-3">
                    <div className="fundo-azul">
                        <div className="titulo3">
                            <h1 data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                                Criadores
                          </h1>
                            <div className="nomes">
                                <article data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                                    Felipe Kenji Yamanaka Kumagai
                                  <br />
                                  Gabriel Oliveira Silva
                                  <br />
                                  Rafael Dias Belinelli
                              </article>
                            </div>
                            <a href="#sec-1">
                                <svg version="1.1" className="flecha" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.996 491.996">
                                    <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844
			                                L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124
			                                c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064
			                                c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132
			                                C494.624,356.041,494.624,338.965,484.136,328.473z"
                                    />
                                </svg>
                            </a>
                            <div className="rodape">
                                <footer>&copy; 2021 Copyright - Monitorário</footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src={aos} />
            <script src="https://code.jquery.com/jquery-3.6.0.js" />
        </>
    );
}
