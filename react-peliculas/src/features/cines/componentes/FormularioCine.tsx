import { useForm, type SubmitHandler } from 'react-hook-form';
import { primeraLetraMayuscula } from '../../../validaciones/Validaciones';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type CineCreacion from '../modelos/CineCreacion.model';
import { NavLink } from 'react-router';
import Boton from '../../../componentes/Boton';
import Mapa from '../../../componentes/Mapa/Mapa';
import type Coordenada from '../../../componentes/Mapa/Coordenada.model';

export default function FormularioCine(props: FormularioCineProps) {

    // Hook useForm de react-hook-form para manejar el formulario
    const {
        register, // registra campos del formulario
        handleSubmit, // maneja el envío del formulario
        setValue, // establece o actualiza valores en los campos del formulario
        formState: { errors, isValid, isSubmitting } // contiene estado del formulario (errores, validación, envío)
    } = useForm<CineCreacion>({
        resolver: yupResolver(reglasDeValidacion), // Resolver de yup para validaciones del formulario
        mode: 'onChange', // Modo 'onChange': valida en cada cambio del input
        defaultValues: props.modelo ? props.modelo : { nombre: '' } // establecer los valores iniciales de los campos del formulario
    });

    function transformarCoordenadas(): Coordenada[] | undefined {
        if (props.modelo) {
            const respuesta: Coordenada = {
                lat: props.modelo.latitud,
                lng: props.modelo.longitud
            }
            return [respuesta];
        }
        return undefined;
    }

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

            <div className="mb-3">
                <Mapa coordenadas={transformarCoordenadas()}
                    lugarSeleccionado={coordenada => {
                        setValue('latitud', coordenada.lat, { shouldValidate: true });
                        setValue('longitud', coordenada.lng, { shouldValidate: true });
                    }} />
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
    nombre: yup.string().required('El nombre es obligatorio').test(primeraLetraMayuscula()),
    latitud: yup.number().required('La latitud es obligatoria'),
    longitud: yup.number().required('La longitud es requerida')
})