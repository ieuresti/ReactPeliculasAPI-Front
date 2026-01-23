import { NavLink } from 'react-router';

export default function Sidebar() {
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

                <button className="boton">
                    <i className="bi bi-plus"></i>
                    <span>Login</span>
                </button>
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
                        <NavLink to="/peliculas/filtrar">
                            <i className="bi bi-camera-reels"></i>
                            <span>Filtrar Películas</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/peliculas/crear">
                            <i className="bi bi-film"></i>
                            <span>Crear Película</span>
                        </NavLink>
                    </li>
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

                <div className="usuario">
                    <i className="bi bi-person-circle"></i>

                    <div className="info-usuario">
                        <div className="nombre-email">
                            <span className="nombre">John Doe</span>
                            <span className="email">johndoe@gmail.com</span>
                        </div>
                        <i className="bi bi-three-dots-vertical"></i>
                    </div>
                </div>
            </div>

        </div>
    )
}