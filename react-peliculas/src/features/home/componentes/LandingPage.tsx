import { useEffect, useState } from 'react';
import ListadoPeliculas from '../../peliculas/componentes/ListadoPeliculas';
import clienteAPI from '../../../api/clienteAxios';
import type LandingPage from '../modelos/LandingPageDTO.model';
import type LandingPageDTO from '../modelos/LandingPageDTO.model';
import AlertaContext from '../../../utils/AlertaContext';

export default function LandingPage() {

    const [peliculas, setPeliculas] = useState<LandingPageDTO>({});

    useEffect(() => {
        cargarDatos();
    }, []);

    function cargarDatos() {
        clienteAPI.get<LandingPageDTO>('/peliculas/landing').then(resp => {
            setPeliculas(resp.data);
        });
    }

    return (
        <>
            <AlertaContext.Provider value={() => { cargarDatos() }}>
                <h3>En Cines</h3>
                <ListadoPeliculas peliculas={peliculas.enCines} />
                <hr />
                <h3>Proximos Estrenos</h3>
                <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
            </AlertaContext.Provider>
        </>
    )
}