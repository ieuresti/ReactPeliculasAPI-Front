import { NavLink, useLocation } from 'react-router';

export default function RutaNoEncontrada() {

    const location = useLocation();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center p-4 bg-white rounded shadow" style={{ maxWidth: '500px' }}>
                <div className="mb-4">
                    <i className="bi bi-film text-warning" style={{ fontSize: '4rem' }}></i>
                </div>
                <h1 className="display-4 text-dark mb-3">404</h1>
                <h2 className="h4 text-muted mb-3">Página No Encontrada</h2>
                <p className="text-muted mb-4">
                    Lo sentimos, la página: "{location.pathname}" que buscas no existe o ha sido movida.
                    Revisa la URL o prueba volviendo al inicio.
                </p>
                <NavLink to="/" className="btn btn-primary btn-lg">
                    <i className="bi bi-house-door me-2"></i>
                    Volver al Inicio
                </NavLink>
            </div>
        </div>
    )
}