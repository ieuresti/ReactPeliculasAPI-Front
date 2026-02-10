import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import clienteAPI from '../../../api/clienteAxios';
import type Pelicula from '../modelos/pelicula.model';
import Cargando from '../../../componentes/Cargando';
import Mapa from '../../../componentes/Mapa/Mapa';
import type Coordenada from '../../../componentes/Mapa/Coordenada.model';

export default function DetallePelicula() {

    const { id } = useParams();
    const [pelicula, setPelicula] = useState<Pelicula>();

    useEffect(() => {
        clienteAPI.get<Pelicula>(`/peliculas/${id}`).then(resp => {
            setPelicula(resp.data);
        });
    }, [id]);

    if (!pelicula) {
        return <Cargando />;
    }

    const fecha = new Date(pelicula.fechaLanzamiento);
    const año = fecha.getFullYear();
    const fechaFormateada = fecha.toLocaleDateString('es-ES');

    function construirURLEmbebidaYoutube(url: string): string | undefined {
        const objURL = new URL(url);
        const videoID = objURL.searchParams.get('v'); // Extrae el ID del video de los parámetros de la URL
        return videoID ? `https://www.youtube.com/embed/${videoID}` : undefined;
    }

    function transformarCoordenadas(): Coordenada[] {
        return pelicula!.cines!.map(cine => {
            const coordenada: Coordenada = {
                lat: cine.latitud,
                lng: cine.longitud,
                mensaje: cine.nombre
            };
            return coordenada;
        });
    }

    return (
        <>
            <div className="container my-4">
                <div className="mb-3">
                    <h2>{pelicula.titulo} <small className="text-muted">({año})</small></h2>

                    {pelicula.generos && pelicula.generos.length > 0 && (
                        <div className="mb-2">
                            {pelicula.generos.map(genero => (
                                <span key={genero.id} className="badge bg-secondary me-1">{genero.nombre}</span>
                            ))}
                        </div>
                    )}

                    <p className="text-muted">Estreno: {fechaFormateada}</p>
                </div>

                <div className="d-flex">
                    <span className="d-inline-block me-2">
                        <img src={pelicula.poster} alt={pelicula.titulo} style={{ width: '225px', height: '315px' }} />
                    </span>

                    <div>
                        <iframe title="Trailer" width="565" height="315" src={construirURLEmbebidaYoutube(pelicula.trailer)} allowFullScreen></iframe>
                    </div>
                </div>

                {pelicula.actores && pelicula.actores.length > 0 && (
                    <div>
                        <h4>Actores</h4>
                        <div className="row">
                            {pelicula.actores.map(actor => (
                                <div key={actor.id} className="col-md-4 d-flex mb-3">
                                    <img src={actor.foto} alt={actor.nombre} className="rounded me-3" style={{ width: '80px', height: '100px' }} />

                                    <div>
                                        <strong>{actor.nombre}</strong>
                                        <br />
                                        <span className="text-muted">{actor.personaje}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {pelicula.cines && pelicula.cines.length > 0 && (
                    <div className="w-100">
                        <h2>Mostrandose en los siguientes cines</h2>
                        <Mapa coordenadas={transformarCoordenadas()} editable={false} />
                    </div>
                )}
            </div>
        </>
    )
}