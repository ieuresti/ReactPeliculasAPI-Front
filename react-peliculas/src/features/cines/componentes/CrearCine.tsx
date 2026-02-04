import type { SubmitHandler } from 'react-hook-form';
import FormularioCine from './FormularioCine';
import type CineCreacion from '../modelos/CineCreacion.model';
import clienteAPI from '../../../api/clienteAxios';
import { useNavigate } from 'react-router';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';

export default function CrearCine() {

    const navigate = useNavigate();

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<CineCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<CineCreacion> = async (data) => {
        try {
            await clienteAPI.post('/cines', data);
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
                        <h4><i className="bi bi-plus-lg"></i> Crear Cine</h4>
                    </div>

                    <div className="card-body">
                        <FormularioCine onSubmit={onSubmit} />
                    </div>

                </div>
            </div>

            <ToastContainer />
        </>
    )
}