import { useForm, type SubmitHandler } from 'react-hook-form';
import type PeliculaCreacion from '../modelos/PeliculaCreacion.model';
import * as yup from 'yup';
import { primeraLetraMayuscula } from '../../../validaciones/Validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router';
import Boton from '../../../componentes/Boton';
import SeleccionarImagen from '../../../componentes/SeleccionarImagen';

export default function FormularioPelicula(props: FormularioPeliculaProps) {

    // Hook useForm de react-hook-form para manejar el formulario
    const {
        register, // registra campos del formulario
        handleSubmit, // maneja el envío del formulario
        setValue, // establece o actualiza valores en los campos del formulario
        formState: { errors, isValid, isSubmitting } // contiene estado del formulario (errores, validación, envío)
    } = useForm<PeliculaCreacion>({
        resolver: yupResolver(reglasDeValidacion), // Resolver de yup para validaciones del formulario
        mode: 'onChange', // Modo 'onChange': valida en cada cambio del input
        defaultValues: props.modelo ? props.modelo : { titulo: '', fechaLanzamiento: '' } // establecer los valores iniciales de los campos del formulario
    });

    const imagenActualURL: string | undefined = props.modelo?.poster ? props.modelo?.poster as string : undefined;

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="mb-3">
                <label className="form-label"></label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                    <input type="text" className="form-control" placeholder="Ingresa el título de la película" {...register('titulo')} autoComplete="off" />
                </div>
                {errors.titulo && <p className='error'>{errors.titulo.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label"></label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar2-date"></i></span>
                    <input type="date" className="form-control" placeholder="Ingresa la fecha de lanzamiento" {...register('fechaLanzamiento')} autoComplete="off" />
                </div>
                {errors.fechaLanzamiento && <p className='error'>{errors.fechaLanzamiento.message}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label"></label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                    <input type="text" className="form-control" placeholder="Ingresa el trailer de la película" {...register('trailer')} autoComplete="off" />
                </div>
                {errors.trailer && <p className='error'>{errors.trailer.message}</p>}
            </div>

            <div className="mb-3">
                <SeleccionarImagen label="Selecciona una imagen" imagenURL={imagenActualURL} imagenSeleccionada={poster => setValue('poster', poster)} />
            </div>

            <div className="d-flex justify-content-between">
                <NavLink to="/" className="btn btn-secondary">
                    <i className="bi bi-arrow-counterclockwise"></i> Regresar
                </NavLink>

                <Boton type='submit' btnClassName='btn btn-success' disabled={!isValid || isSubmitting}>
                    <i className="bi bi-check-lg"></i> {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Boton>
            </div>
        </form>
    )
}

interface FormularioPeliculaProps {
    modelo?: PeliculaCreacion;
    onSubmit: SubmitHandler<PeliculaCreacion>;
}

const reglasDeValidacion = yup.object({
    titulo: yup.string().required('El nombre es obligatorio').test(primeraLetraMayuscula()),
    fechaLanzamiento: yup.string().required('La fecha de lanzamiento es obligatoria')
})