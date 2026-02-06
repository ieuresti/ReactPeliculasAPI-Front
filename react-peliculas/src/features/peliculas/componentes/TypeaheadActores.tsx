import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import type { Option } from 'react-bootstrap-typeahead/types/types';
import type ActorPelicula from '../modelos/ActorPelicula.model';
import { useState } from 'react';
import clienteAPI from '../../../api/clienteAxios';

export default function TypeaheadActores(props: TypeaheadActoresProps) {

    const [actores, setActores] = useState<ActorPelicula[]>([]);
    const [cargando, setCargando] = useState(false);

    const seleccion: ActorPelicula[] = [];

    function manejarBusqueda(texto: string) {
        setCargando(true);
        clienteAPI.get<ActorPelicula[]>(`/actores/${texto}`).then(resp => {
            setActores(resp.data);
            setCargando(false);
        });
    }

    return (
        <>
            <label className="form-label">Actores</label>
            <AsyncTypeahead
                isLoading={cargando}
                onSearch={manejarBusqueda}
                id="typeahead"
                onChange={(actores: Option[]) => {
                    const actorSeleccionado = actores[0] as ActorPelicula;
                    if (props.actores.findIndex(x => x.id === actorSeleccionado.id) === -1) {
                        actorSeleccionado.personaje = '';
                        props.onAdd([...props.actores, actorSeleccionado]);
                    }
                }}

                options={actores}
                labelKey={(opcion: Option) => {
                    const actor = opcion as ActorPelicula;
                    return actor.nombre;
                }}
                filterBy={['nombre']}
                placeholder='Escriba el nombre del actor'
                minLength={2}
                flip={true}
                selected={seleccion}
                renderMenuItemChildren={(opcion: Option) => {
                    const actor = opcion as ActorPelicula;
                    return (
                        <>
                            <img alt='Imagen actor' src={actor.foto} style={{ height: '64px', width: '64px', marginRight: '10px' }} />
                            <span>{actor.nombre}</span>
                        </>
                    )
                }}
            />

            <ul className="list-group">
                {props.actores.map(actor => (
                    <li className="list-group-item d-flex align-items-center" key={actor.id}>
                        <div style={{ width: '70px' }}>
                            <img alt="Foto" src={actor.foto} style={{ height: '60px' }} />
                        </div>

                        <div style={{ width: '150px', marginLeft: '1rem' }}>
                            {actor.nombre}
                        </div>

                        <div className="flex-grow-1 mx-3">
                            <input type="text" className="form-control" placeholder="Personaje"
                                value={actor.personaje} onChange={event => {
                                    props.onCambioPersonaje(actor.id, event.currentTarget.value)
                                }} />
                        </div>
                        <span role="button" className="badge text-bg-secondary" onClick={() => {
                            props.onRemove(actor)
                        }}>X</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

interface TypeaheadActoresProps {
    actores: ActorPelicula[];
    onAdd(actores: ActorPelicula[]): void;
    onCambioPersonaje(id: number, personaje: string): void;
    onRemove(actor: ActorPelicula): void;
}