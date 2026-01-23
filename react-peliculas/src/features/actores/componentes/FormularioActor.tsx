import { useForm, type SubmitHandler } from 'react-hook-form';
import type ActorCreacion from '../modelos/ActorCreacion.model';
import * as yup from 'yup';
import { fechaNoPuedeSerFutura, primeraLetraMayuscula } from '../../../validaciones/Validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router';
import Boton from '../../../componentes/Boton';

export default function FormularioActor(props: FormularioActorProps) {

    // Hook useForm de react-hook-form para manejar el formulario
    const {
        register, // registra campos del formulario
        handleSubmit, // maneja el envío del formulario
        formState: { errors, isValid, isSubmitting } // contiene estado del formulario (errores, validación, envío)
    } = useForm<ActorCreacion>({
        resolver: yupResolver(reglasDeValidacion), // Resolver de yup para validaciones del formulario
        mode: 'onChange', // Modo 'onChange': valida en cada cambio del input
        defaultValues: props.modelo ? props.modelo : { nombre: '', fechaNacimiento: '' } // establecer los valores iniciales de los campos del formulario
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="mb-3">
                <label className="form-label"></label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                    <input type="text" className="form-control" placeholder="Ingresa el nombre del actor" {...register('nombre')} autoComplete="off" />
                </div>
                {errors.nombre && <p className='error'>{errors.nombre.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label"></label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar2-date"></i></span>
                    <input type="date" className="form-control" placeholder="Ingresa la fecha de nacimiento" {...register('fechaNacimiento')} autoComplete="off" />
                </div>
                {errors.fechaNacimiento && <p className='error'>{errors.fechaNacimiento.message}</p>}
            </div>

            <div className="d-flex justify-content-between">
                <NavLink to="/actores" className="btn btn-secondary">
                    <i className="bi bi-arrow-counterclockwise"></i> Regresar
                </NavLink>

                <Boton type='submit' btnClassName='btn btn-success' disabled={!isValid || isSubmitting}>
                    <i className="bi bi-check-lg"></i> {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Boton>
            </div>
        </form>
    )
}

interface FormularioActorProps {
    modelo?: ActorCreacion;
    onSubmit: SubmitHandler<ActorCreacion>;
}

const reglasDeValidacion = yup.object({
    nombre: yup.string().required('El nombre es obligatorio').test(primeraLetraMayuscula()),
    fechaNacimiento: yup.string().required('La fecha de nacimiento es obligatoria').test(fechaNoPuedeSerFutura())
})