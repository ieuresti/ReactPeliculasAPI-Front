import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type GeneroCreacion from '../modelos/GeneroCreacion.model';
import FormularioGenero from './FormularioGenero';
import type { SubmitHandler } from 'react-hook-form';
import Cargando from '../../../componentes/Cargando';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';
import clienteAPI from '../../../api/clienteAxios';
import type Genero from '../modelos/Genero.model';

export default function EditarGenero() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<GeneroCreacion | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        clienteAPI.get<Genero>(`/generos/${id}`).then(resp => {
            setModelo(resp.data);
        }).catch(() => {
            navigate('/generos');
        });
    }, [id, navigate]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<GeneroCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<GeneroCreacion> = async (data) => {
        try {
            await clienteAPI.put(`/generos/${id}`, data);
            navigate('/generos');
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
                        <h4><i className="bi bi-plus-lg"></i> Editar Género</h4>
                    </div>

                    <div className="card-body">
                        {modelo ? <FormularioGenero onSubmit={onSubmit} modelo={modelo} /> : <Cargando />}
                    </div>

                </div>
            </div>

            <ToastContainer />
        </>
    )
}