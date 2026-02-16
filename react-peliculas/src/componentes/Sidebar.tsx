import { NavLink } from 'react-router';
import Autorizado from '../features/seguridad/componentes/Autorizado';
import { useContext, useEffect, useState } from 'react';
import AutenticacionContext from '../features/seguridad/utilidades/AutenticacionContext';
import { logout } from '../features/seguridad/utilidades/ManejadorJWT';

export default function Sidebar() {

    // Obtener los valores del contexto
    const { claims, actualizar } = useContext(AutenticacionContext);
    const [nombre, setNombre] = useState<string>('');

    useEffect(() => {
        const emailClaim = claims.filter(x => x.nombre === 'email')[0]?.valor;
        if (emailClaim) {
            setNombre(emailClaim.split('@')[0]);
        }
    }, [claims])

    function obtenerNombreUsuario(): string {
        return claims.filter(x => x.nombre === 'email')[0]?.valor;
    }

    return (
        <div className="barra-lateral">

            <div>
                <div className="nombre-pagina">
                    <i id="cloud" className="bi bi-cloud" onClick={() => {
                        const barraLateral = document.querySelector(".barra-lateral");
                        const spans = document.querySelectorAll("span");
                        const main = document.querySelector("main");
                        barraLateral?.classList.toggle("mini-barra-lateral");
                        spans.forEach((span) => {
                            span.classList.toggle("oculto");
                        });
                        main?.classList.toggle("min-main");
                    }} />
                    <span>React Películas</span>
                </div>

                <Autorizado
                    autorizado={<>
                        <button className="boton" onClick={() => {
                            logout();
                            actualizar([]);
                        }}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Logout</span>
                        </button>
                    </>}
                    noAutorizado={<>
                        <NavLink to="/login" className="btn btn-primary">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span className="ms-2">Login</span>
                        </NavLink>
                        <NavLink to="/registro" className="btn btn-secondary ms-2">
                            <i className="bi bi-person-plus"></i>
                            <span className="ms-2">Registro</span>
                        </NavLink>
                    </>}
                />
            </div>

            <nav className="navegacion">
                <ul>
                    <li>
                        <NavLink to="/">
                            <i className="bi bi-house"></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/peliculas/filtrar">
                            <i className="bi bi-camera-reels"></i>
                            <span>Filtrar Películas</span>
                        </NavLink>
                    </li>

                    <Autorizado
                        claims={['esAdmin']}
                        autorizado={<>
                            <li>
                                <NavLink to="/generos">
                                    <i className="bi bi-tag"></i>
                                    <span>Géneros</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/actores">
                                    <i className="bi bi-star"></i>
                                    <span>Actores</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cines">
                                    <i className="bi bi-building"></i>
                                    <span>Cines</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/peliculas/crear">
                                    <i className="bi bi-film"></i>
                                    <span>Crear Película</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/usuarios">
                                    <i className="bi bi-people"></i>
                                    <span>Usuarios</span>
                                </NavLink>
                            </li>
                        </>}
                    />
                </ul>
            </nav>

            <div>
                <div className="linea"></div>

                <div className="modo-oscuro">
                    <div className="info">
                        <i className="bi bi-moon"></i>
                        <span>Dark Mode</span>
                    </div>

                    <div className="switch" onClick={() => {
                        let body = document.body;
                        const circulo = document.querySelector(".circulo");
                        body.classList.toggle("dark-mode");
                        circulo?.classList.toggle("encendido");
                    }}>
                        <div className="base">
                            <div className="circulo"></div>
                        </div>
                    </div>
                </div>

                <Autorizado
                    autorizado={<>
                        <div className="usuario">
                            <i className="bi bi-person-circle"></i>

                            <div className="info-usuario">
                                <div className="nombre-email">
                                    <span className="nombre">{nombre}</span>
                                    <span className="email">{obtenerNombreUsuario()}</span>
                                </div>
                                <i className="bi bi-three-dots-vertical"></i>
                            </div>
                        </div>
                    </>}
                />
            </div>

        </div>
    )
}