import type { SubmitHandler } from 'react-hook-form';
import FormularioActor from './FormularioActor';
import type ActorCreacion from '../modelos/ActorCreacion.model';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import clienteAPI from '../../../api/clienteAxios';

export default function CrearActor() {

    const navigate = useNavigate();

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<ActorCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<ActorCreacion> = async (data) => {
        try {
            // postForm ya que queremos enviar una imagen
            await clienteAPI.postForm('/actores', data);
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
                        <h4><i className="bi bi-plus-lg"></i> Crear Actor</h4>
                    </div>

                    <div className="card-body">
                        <FormularioActor onSubmit={onSubmit} />
                    </div>

                </div>
            </div>

            <ToastContainer />
        </>
    )
}