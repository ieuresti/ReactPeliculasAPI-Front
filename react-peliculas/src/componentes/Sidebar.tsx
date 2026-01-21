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
                    <span>Peliculas App</span>
                </div>

                <button className="boton">
                    <i className="bi bi-plus"></i>
                    <span>Create new</span>
                </button>
            </div>

            <nav className="navegacion">
                <ul>
                    <li>
                        <a href="#">
                            <i className="bi bi-envelope"></i>
                            <span>Inbox</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bi bi-star"></i>
                            <span>Starred</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bi bi-send"></i>
                            <span>Sent</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bi bi-trash"></i>
                            <span>Trash</span>
                        </a>
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