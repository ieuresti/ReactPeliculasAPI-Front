import type { SubmitHandler } from 'react-hook-form';
import FormularioPelicula from './FormularioPelicula';
import type PeliculaCreacion from '../modelos/PeliculaCreacion.model';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Cargando from '../../../componentes/Cargando';
import clienteAPI from '../../../api/clienteAxios';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';
import type PeliculaPutGet from '../modelos/PeliculaPutGet';
import FormatearFecha from '../../../utils/FormatearFecha';
import ConvertirPeliculaCreacionAFormData from '../utilidades/ConvertirPeliculaCreacionAFormData';

export default function EditarPelicula() {

    const { id } = useParams();

    const [modelo, setModelo] = useState<PeliculaCreacion | undefined>(undefined);
    const [peliculaPutGet, setPeliculaPutGet] = useState<PeliculaPutGet | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        clienteAPI.get(`/peliculas/PutGet/${id}`).then(resp => {
            setPeliculaPutGet(resp.data);
            setModelo({
                titulo: resp.data.pelicula.titulo,
                fechaLanzamiento: FormatearFecha(resp.data.pelicula.fechaLanzamiento),
                trailer: resp.data.pelicula.trailer,
                poster: resp.data.pelicula.poster
            });
        });
    }, [id]);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<PeliculaCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        try {
            const formData = ConvertirPeliculaCreacionAFormData(data);
            await clienteAPI.putForm(`/peliculas/${id}`, formData);
            navigate('/');
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
                        <h4><i className="bi bi-plus-lg"></i> Editar Película</h4>
                    </div>

                    <div className="card-body">
                        {modelo && peliculaPutGet ?
                            <FormularioPelicula
                                onSubmit={onSubmit} modelo={modelo}
                                generosSeleccionados={peliculaPutGet.generosSeleccionados}
                                generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
                                cinesSeleccionados={peliculaPutGet.cinesSeleccionados}
                                cinesNoSeleccionados={peliculaPutGet.cinesNoSeleccionados}
                                actoresSeleccionados={peliculaPutGet.actores} />
                            : <Cargando />
                        }
                    </div>

                </div>
            </div>

            <ToastContainer />
        </>
    )
}