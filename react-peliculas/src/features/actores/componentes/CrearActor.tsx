import type { SubmitHandler } from 'react-hook-form';
import FormularioActor from './FormularioActor';
import type ActorCreacion from '../modelos/ActorCreacion.model';

export default function CrearActor() {

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<ActorCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Creando el actor...');
        console.log(data);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white">
                        <h4><i className="bi bi-plus-lg"></i> Crear Actor</h4>
                    </div>

                    <div className="card-body">
                        <FormularioActor onSubmit={onSubmit} />
                    </div>

                </div>
            </div>
        </>
    )
}