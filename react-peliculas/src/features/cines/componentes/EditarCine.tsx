import { useParams } from 'react-router';
import FormularioCine from './FormularioCine';
import type { SubmitHandler } from 'react-hook-form';
import type CineCreacion from '../modelos/CineCreacion.model';
import Cargando from '../../../componentes/Cargando';
import { useEffect, useState } from 'react';

export default function EditarCine() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<CineCreacion | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModelo({ nombre: 'Cinepolis ' + id });

            return () => clearTimeout(timerId);
        }, 1000);
    }, [id]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<CineCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        await new Promise(resolver => setTimeout(resolver, 1000));
        console.log('Editando el cine...');
        console.log(data);
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">

                <div className="card-header bg-primary text-white">
                    <h4><i className="bi bi-plus-lg"></i> Editar Cine</h4>
                </div>

                <div className="card-body">
                    {modelo ? <FormularioCine onSubmit={onSubmit} modelo={modelo} /> : <Cargando />}
                </div>

            </div>
        </div>
    )
}