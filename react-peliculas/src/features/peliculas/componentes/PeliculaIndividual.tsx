import { NavLink, useNavigate } from 'react-router';
import Boton from '../../../componentes/Boton';
import type Pelicula from '../modelos/pelicula.model';
import styles from './PeliculaIndividual.module.css';
import Confirmar from '../../../utils/Confirmar';
import clienteAPI from '../../../api/clienteAxios';
import { useContext } from 'react';
import AlertaContext from '../../../utils/AlertaContext';
import Autorizado from '../../seguridad/componentes/Autorizado';

export default function PeliculaIndividual(props: PeliculaIndividualProps) {

    const construirUrlDetalle = () => `/peliculas/${props.pelicula.id}`;
    const navigate = useNavigate();
    const alerta = useContext(AlertaContext);

    const Borrar = async (id: number) => {
        try {
            await clienteAPI.delete(`/peliculas/${id}`);
            alerta(); // Llamamos a la función del contexto para recargar los datos en la landing page
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={styles.div}>
                <NavLink to={construirUrlDetalle()}>
                    <img src={props.pelicula.poster} alt={props.pelicula.titulo} />
                </NavLink>
                <p>
                    <NavLink to={construirUrlDetalle()}>{props.pelicula.titulo}</NavLink>
                </p>

                <Autorizado
                    claims={['esAdmin']}
                    autorizado={<>
                        <div>
                            <Boton onClick={() => navigate(`peliculas/editar/${props.pelicula.id}`)}>
                                Editar
                            </Boton>
                            <Boton btnClassName="btn btn-danger ms-2"
                                onClick={() => Confirmar(
                                    `¿Desea borrar la pelicula ${props.pelicula.titulo}?`, '',
                                    'question', true, 'Borrar', () => {
                                        Borrar(props.pelicula.id);
                                    })}>
                                <i className="bi bi-trash me-1"></i>Borrar
                            </Boton>
                        </div>
                    </>}
                />

            </div>
        </>
    )
}

interface PeliculaIndividualProps {
    pelicula: Pelicula;
}