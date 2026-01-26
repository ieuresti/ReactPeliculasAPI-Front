import type { SubmitHandler } from 'react-hook-form';
import FormularioPelicula from './FormularioPelicula';
import type PeliculaCreacion from '../modelos/PeliculaCreacion.model';

export default function CrearPelicula() {

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<PeliculaCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        await new Promise(resolver => setTimeout(resolver, 1000));
        console.log('Creando la película...');
        console.log(data);
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">

                <div className="card-header bg-primary text-white">
                    <h4><i className="bi bi-plus-lg"></i> Crear Película</h4>
                </div>

                <div className="card-body">
                    <FormularioPelicula onSubmit={onSubmit} />
                </div>

            </div>
        </div>
    )
}