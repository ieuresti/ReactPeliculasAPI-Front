import type { SubmitHandler } from 'react-hook-form';
import FormularioPelicula from './FormularioPelicula';
import type PeliculaCreacion from '../modelos/PeliculaCreacion.model';
import type Genero from '../../generos/modelos/Genero.model';
import type Cine from '../../cines/modelos/Cine.model';
import { useEffect, useState } from 'react';
import clienteAPI from '../../../api/clienteAxios';
import type PeliculaPostGet from '../modelos/PeliculaPostGet';
import Cargando from '../../../componentes/Cargando';
import ConvertirPeliculaCreacionAFormData from '../utilidades/ConvertirPeliculaCreacionAFormData';
import type Pelicula from '../modelos/pelicula.model';
import { useNavigate } from 'react-router';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';

export default function CrearPelicula() {

    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<Genero[]>([]);
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<Cine[]>([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        clienteAPI.get<PeliculaPostGet>('/peliculas/PostGet').then(resp => {
            setGenerosNoSeleccionados(resp.data.generos);
            setCinesNoSeleccionados(resp.data.cines);
            setCargando(false);
        });
    }, []);

    // Función que se ejecuta al enviar el formulario
    // SubmitHandler<PeliculaCreacion>: tipo para el handler de envío
    const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
        try {
            const formData = ConvertirPeliculaCreacionAFormData(data);
            const respuesta = await clienteAPI.postForm<Pelicula>('/peliculas', formData);
            navigate(`/peliculas/${respuesta.data.id}`);
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
                        <h4><i className="bi bi-plus-lg"></i> Crear Película</h4>
                    </div>

                    <div className="card-body">
                        {cargando ? <Cargando /> : <FormularioPelicula
                            onSubmit={onSubmit}
                            generosSeleccionados={[]}
                            generosNoSeleccionados={generosNoSeleccionados}
                            cinesSeleccionados={[]}
                            cinesNoSeleccionados={cinesNoSeleccionados}
                            actoresSeleccionados={[]}
                        />}
                    </div>

                </div>
            </div>

            <ToastContainer />
        </>
    )
}