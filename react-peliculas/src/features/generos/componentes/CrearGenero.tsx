import type { SubmitHandler } from 'react-hook-form';
import type GeneroCreacion from '../modelos/GeneroCreacion.model';
import FormularioGenero from './FormularioGenero';

export default function CrearGenero() {

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<GeneroCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<GeneroCreacion> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Creando el genero...');
        console.log(data);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white">
                        <h4><i className="bi bi-plus-lg"></i> Crear Género</h4>
                    </div>

                    <div className="card-body">
                        <FormularioGenero onSubmit={onSubmit} />
                    </div>

                </div>
            </div>
        </>
    )
}
