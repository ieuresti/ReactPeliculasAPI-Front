import { useNavigate, useParams } from 'react-router';
import FormularioCine from './FormularioCine';
import type { SubmitHandler } from 'react-hook-form';
import type CineCreacion from '../modelos/CineCreacion.model';
import Cargando from '../../../componentes/Cargando';
import { useEffect, useState } from 'react';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';
import clienteAPI from '../../../api/clienteAxios';
import type Cine from '../modelos/Cine.model';

export default function EditarCine() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<CineCreacion | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        clienteAPI.get<Cine>(`/cines/${id}`).then(resp => {
            setModelo(resp.data);
        }).catch(() => {
            navigate('/cines');
        });
    }, [id, navigate]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<CineCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        try {
            await clienteAPI.put(`/cines/${id}`, data);
            navigate('/cines');
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
    }

    return (
        <>
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

            <ToastContainer />
        </>
    )
}