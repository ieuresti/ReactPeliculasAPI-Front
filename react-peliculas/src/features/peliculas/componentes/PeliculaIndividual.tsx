import type Pelicula from '../modelos/pelicula.model';
import styles from './PeliculaIndividual.module.css'

export default function PeliculaIndividual(props: PeliculaIndividualProps) {

    const construirUrlDetalle = () => `/pelicula/${props.pelicula.id}`;

    return (
        <>
            <div className={styles.div}>
                <a href={construirUrlDetalle()}>
                    <img src={props.pelicula.poster} alt={props.pelicula.titulo} />
                </a>
                <p>
                    <a href={construirUrlDetalle()}>{props.pelicula.titulo}</a>
                </p>
            </div>
        </>
    )
}

interface PeliculaIndividualProps {
    pelicula: Pelicula;
}