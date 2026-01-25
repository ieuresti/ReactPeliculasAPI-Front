import { useForm, type SubmitHandler } from 'react-hook-form';
import { primeraLetraMayuscula } from '../../../validaciones/Validaciones';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type CineCreacion from '../modelos/CineCreacion.model';
import { NavLink } from 'react-router';
import Boton from '../../../componentes/Boton';

export default function FormularioCine(props: FormularioCineProps) {

    // Hook useForm de react-hook-form para manejar el formulario
    const {
        register, // registra campos del formulario
        handleSubmit, // maneja el envío del formulario
        formState: { errors, isValid, isSubmitting } // contiene estado del formulario (errores, validación, envío)
    } = useForm<CineCreacion>({
        resolver: yupResolver(reglasDeValidacion), // Resolver de yup para validaciones del formulario
        mode: 'onChange', // Modo 'onChange': valida en cada cambio del input
        defaultValues: props.modelo ? props.modelo : { nombre: '' } // establecer los valores iniciales de los campos del formulario
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="mb-3">
                <label className="form-label"></label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                    <input type="text" className="form-control" placeholder="Ingresa el nombre del cine" {...register('nombre')} autoComplete="off" />
                </div>
                {errors.nombre && <p className='error'>{errors.nombre.message}</p>}
            </div>

            

            <div className="d-flex justify-content-between">
                <NavLink to="/cines" className="btn btn-secondary">
                    <i className="bi bi-arrow-counterclockwise"></i> Regresar
                </NavLink>

                <Boton type='submit' btnClassName='btn btn-success' disabled={!isValid || isSubmitting}>
                    <i className="bi bi-check-lg"></i> {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Boton>
            </div>
        </form>
    )
}

interface FormularioCineProps {
    modelo?: CineCreacion;
    onSubmit: SubmitHandler<CineCreacion>;
}

const reglasDeValidacion = yup.object({
    nombre: yup.string().required('El nombre es obligatorio').test(primeraLetraMayuscula())
})