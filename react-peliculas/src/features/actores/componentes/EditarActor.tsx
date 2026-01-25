import { useParams } from 'react-router';
import FormularioActor from './FormularioActor';
import Cargando from '../../../componentes/Cargando';
import { useEffect, useState } from 'react';
import type ActorCreacion from '../modelos/ActorCreacion.model';
import type { SubmitHandler } from 'react-hook-form';

export default function EditarActor() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<ActorCreacion | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModelo({ nombre: 'Keanu Reeves ' + id, fechaNacimiento: '1980-01-22', foto: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Tom_Holland_MTV_2018_%2801%29.jpg' });

            return () => clearTimeout(timerId);
        }, 1000);
    }, [id]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<ActorCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Editando el actor...');
        console.log(data);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white">
                        <h4><i className="bi bi-plus-lg"></i> Editar Actor</h4>
                    </div>

                    <div className="card-body">
                        {modelo ? <FormularioActor onSubmit={onSubmit} modelo={modelo} /> : <Cargando />}
                    </div>

                </div>
            </div>
        </>
    )
}