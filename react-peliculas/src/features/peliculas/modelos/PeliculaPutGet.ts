import type Cine from '../../cines/modelos/Cine.model';
import type Genero from '../../generos/modelos/Genero.model';
import type ActorPelicula from './ActorPelicula.model';
import type Pelicula from './pelicula.model';

export default interface PeliculaPutGet {
    pelicula: Pelicula;
    generosSeleccionados: Genero[];
    generosNoSeleccionados: Genero[];
    cinesSeleccionados: Cine[];
    cinesNoSeleccionados: Cine[];
    actores: ActorPelicula[];
}