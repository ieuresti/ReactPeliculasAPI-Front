import type { SubmitHandler } from 'react-hook-form';
import type GeneroCreacion from '../modelos/GeneroCreacion.model';
import FormularioGenero from './FormularioGenero';
import clienteAPI from '../../../api/clienteAxios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import ExtraerErrores from '../../../utils/ExtraerErrores';

export default function CrearGenero() {

    const navigate = useNavigate();

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<GeneroCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<GeneroCreacion> = async (data) => {
        try {
            await clienteAPI.post('/generos', data);
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
                        <h4><i className="bi bi-plus-lg"></i> Crear Género</h4>
                    </div>

                    <div className="card-body">
                        <FormularioGenero onSubmit={onSubmit} />
                    </div>

                </div>
            </div>

            <ToastContainer />
        </>
    )
}
