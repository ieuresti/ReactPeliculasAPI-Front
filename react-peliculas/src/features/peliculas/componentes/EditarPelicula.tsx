import type { SubmitHandler } from 'react-hook-form';
import FormularioPelicula from './FormularioPelicula';
import type PeliculaCreacion from '../modelos/PeliculaCreacion.model';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Cargando from '../../../componentes/Cargando';

export default function EditarPelicula() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<PeliculaCreacion | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModelo({ titulo: 'Pokémon: Jirachi, Wish Maker ' + id, fechaLanzamiento: '2003-07-01', trailer: '', poster: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Pok%C3%A9mon_Jirachi_Wish_Maker_poster.jpg' });

            return () => clearTimeout(timerId);
        }, 1000);
    }, [id]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<PeliculaCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        await new Promise(resolver => setTimeout(resolver, 1000));
        console.log('Editando la película...');
        console.log(data);
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">

                <div className="card-header bg-primary text-white">
                    <h4><i className="bi bi-plus-lg"></i> Editar Película</h4>
                </div>

                <div className="card-body">
                    {modelo ? <FormularioPelicula onSubmit={onSubmit} modelo={modelo} /> : <Cargando />}
                </div>

            </div>
        </div>
    )
}