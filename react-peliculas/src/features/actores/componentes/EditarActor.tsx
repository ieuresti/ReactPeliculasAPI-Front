import { useNavigate, useParams } from 'react-router';
import FormularioActor from './FormularioActor';
import Cargando from '../../../componentes/Cargando';
import { useEffect, useState } from 'react';
import type ActorCreacion from '../modelos/ActorCreacion.model';
import type { SubmitHandler } from 'react-hook-form';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';
import clienteAPI from '../../../api/clienteAxios';
import type Actor from '../modelos/Actor.model';
import FormatearFecha from '../../../utils/FormatearFecha';

export default function EditarActor() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<ActorCreacion | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        clienteAPI.get<Actor>(`/actores/${id}`).then(resp => {
            resp.data.fechaNacimiento = FormatearFecha(resp.data.fechaNacimiento);
            setModelo(resp.data);
        }).catch(() => {
            navigate('/actores');
        });
    }, [id, navigate]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<ActorCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        try {
            await clienteAPI.putForm(`/actores/${id}`, data);
            navigate('/actores');
        } catch (error: any) {
            const mensajeError = ExtraerErrores(error.response?.data?.errors);
            toast.error(mensajeError, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
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

            <ToastContainer />
        </>
    )
}