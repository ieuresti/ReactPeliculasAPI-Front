import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type GeneroCreacion from '../modelos/GeneroCreacion.model';
import FormularioGenero from './FormularioGenero';
import type { SubmitHandler } from 'react-hook-form';
import Cargando from '../../../componentes/Cargando';

export default function EditarGenero() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<GeneroCreacion | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModelo({ nombre: 'Drama ' + id })
        }, 1000);

        return () => clearTimeout(timerId);
    }, [id]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<GeneroCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<GeneroCreacion> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Editando el genero...');
        console.log(data);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white">
                        <h4><i className="bi bi-plus-lg"></i> Editar Género</h4>
                    </div>

                    <div className="card-body">
                        {modelo ? <FormularioGenero onSubmit={onSubmit} modelo={modelo} /> : <Cargando />}
                    </div>

                </div>
            </div>
        </>
    )
}