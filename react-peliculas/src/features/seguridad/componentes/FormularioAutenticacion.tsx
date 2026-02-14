import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import type CredencialesUsuario from '../modelos/CredencialesUsuario';
import clienteAPI from '../../../api/clienteAxios';
import { guardarTokenLocalStorage, obtenerClaims } from '../utilidades/ManejadorJWT';
import AutenticacionContext from '../utilidades/AutenticacionContext';
import { useContext } from 'react';
import type RespuestaAutenticacion from '../modelos/RespuestaAutenticacion';
import { NavLink, useNavigate } from 'react-router';
import Boton from '../../../componentes/Boton';
import ExtraerErrores from '../../../utils/ExtraerErrores';
import { toast, ToastContainer } from 'react-toastify';

export default function FormularioAutenticacion(props: FormularioAutenticacionProps) {

    const { actualizar } = useContext(AutenticacionContext);
    const navigate = useNavigate();

    // Hook useForm de react-hook-form para manejar el formulario
    const {
        register, // registra campos del formulario
        handleSubmit, // maneja el envío del formulario
        formState: { errors, isValid, isSubmitting } // contiene estado del formulario (errores, validación, envío)
    } = useForm<CredencialesUsuario>({
        resolver: yupResolver(reglasDeValidacion), // Resolver de yup para validaciones del formulario
        mode: 'onChange' // Modo 'onChange': valida en cada cambio del input
    });

    const onSubmit: SubmitHandler<CredencialesUsuario> = async (data) => {
        try {
            const respuesta = await clienteAPI.post<RespuestaAutenticacion>(props.url, data);
            guardarTokenLocalStorage(respuesta.data);
            actualizar(obtenerClaims()); // Actualizar los claims en el contexto de autenticación después de iniciar sesión
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
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" placeholder="Ingresa el email" {...register('email')} autoComplete="off" />
                            </div>
                            {errors.email && <p className='error'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" placeholder="Ingresa el password" {...register('password')} autoComplete="off" />
                            </div>
                            {errors.password && <p className='error'>{errors.password.message}</p>}
                        </div>

                        <div className="mt-2">
                            <Boton type='submit' btnClassName='btn btn-success' disabled={!isValid || isSubmitting}>
                                <i className="bi bi-check-lg"></i> {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </Boton>

                            <NavLink to="/" className="btn btn-secondary ms-2">
                                <i className="bi bi-arrow-counterclockwise"></i> Cancelar
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

interface FormularioAutenticacionProps {
    url: string;
}

const reglasDeValidacion = yup.object({
    email: yup.string().required('El email es obligatorio'),
    password: yup.string().required('El password es obligatorio')
})