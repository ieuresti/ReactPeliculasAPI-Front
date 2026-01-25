import type { SubmitHandler } from 'react-hook-form';
import FormularioCine from './FormularioCine';
import type CineCreacion from '../modelos/CineCreacion.model';

export default function CrearCine() {

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<CineCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        await new Promise(resolver => setTimeout(resolver, 1000));
        console.log('Creando el cine...');
        console.log(data);
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">

                <div className="card-header bg-primary text-white">
                    <h4><i className="bi bi-plus-lg"></i> Crear Cine</h4>
                </div>

                <div className="card-body">
                    <FormularioCine onSubmit={onSubmit} />
                </div>

            </div>
        </div>
    )
}