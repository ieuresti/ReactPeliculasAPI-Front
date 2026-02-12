import { useContext, useEffect, useState } from 'react';
import AutenticacionContext from '../utilidades/AutenticacionContext';

export default function Autorizado(props: AutorizadoProps) {

    const [autorizado, setAutorizado] = useState(false);
    const { claims } = useContext(AutenticacionContext); // Obtener los claims del contexto de autenticación

    useEffect(() => {
        if (props.claims) { // Si tenemos un array de claims
            for (let i = 0; i < props.claims.length; i++) { // Iterar sobre los claims
                const claim = props.claims[i]; // Obtener el claim actual
                const indiceClaim = claims.findIndex(c => c.nombre === claim); // Buscar el índice del claim en los claims del contexto
                if (indiceClaim > -1) { // En javascript, -1 significa que no se encontró el elemento. Si es mayor a -1, significa que se encontró.
                    setAutorizado(true); // Si se encontró el claim, el usuario está autorizado
                    return;
                }
            }

            setAutorizado(false); // Si no se encontró ningún claim, el usuario no está autorizado
        } else {
            setAutorizado(claims.length > 0); // Si no se especifican claims, se autoriza a cualquier usuario autenticado (con al menos un claim)
        }

    }, [claims, props.claims]); // Re-evaluar autorización cada vez que cambien los claims

    return (
        <>
            {autorizado ? props.autorizado : props.noAutorizado}
        </>
    )

}

interface AutorizadoProps {
    autorizado: React.ReactNode;
    noAutorizado?: React.ReactNode;
    claims?: string[];
}