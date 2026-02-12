import { Outlet } from 'react-router';
import Autorizado from './Autorizado';

export default function RutaProtegida(props: RutaProtegidaProps) {
    // Outlet es un componente de react-router que renderiza el componente hijo correspondiente a la ruta protegida
    return <Autorizado
        claims={props.claims}
        autorizado={<Outlet />}
        noAutorizado={<div className="alert alert-danger">No tiene permisos para ver esta página o contenido.</div>}
    />
}

interface RutaProtegidaProps {
    claims: string[];
}