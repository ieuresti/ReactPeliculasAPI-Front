import { useForm, type SubmitHandler } from 'react-hook-form';
import type PeliculaCreacion from '../modelos/PeliculaCreacion.model';
import * as yup from 'yup';
import { primeraLetraMayuscula } from '../../../validaciones/Validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router';
import Boton from '../../../componentes/Boton';
import SeleccionarImagen from '../../../componentes/SeleccionarImagen';
import SelectorMultiple from '../../../componentes/SelectorMultiple/SelectorMultiple';
import type Genero from '../../generos/modelos/Genero.model';
import type SelectorMultipleModel from '../../../componentes/SelectorMultiple/SelectorMultiple.model';
import { useState } from 'react';
import type Cine from '../../cines/modelos/Cine.model';
import TypeaheadActores from './TypeaheadActores';
import type ActorPelicula from '../modelos/ActorPelicula.model';

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

    // Función que mapea un arreglo de objetos con id y nombre a SelectorMultipleModel
    // SelectorMultipleModel requiere propiedades 'llave' y 'descripcion', por lo que transformamos id -> llave y nombre -> descripcion
    const mapear = (arreglo: { id: number, nombre: string }[]): SelectorMultipleModel[] => {
        // Usamos el método map de arrays para transformar cada elemento del arreglo
        return arreglo.map(({ id, nombre }) => ({
            // Extraemos id y nombre del objeto actual usando destructuring y creamos un nuevo objeto con las propiedades requeridas
            llave: id, // El id se asigna a 'llave'
            descripcion: nombre // El nombre se asigna a 'descripcion'
        }));
    };

    const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados));
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados));

    const [cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados));
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados));

    const [actoresSeleccionados, setActoresSeleccionados] = useState(props.actoresSeleccionados);

    // Función que maneja el envío del formulario de película
    // Recibe los datos validados del formulario y los prepara antes de enviarlos al componente padre
    const onSubmit: SubmitHandler<PeliculaCreacion> = (data) => {
        // Agregamos los IDs seleccionados al objeto de datos
        // Extraemos las 'llave' (que son los IDs) seleccionados en el SelectorMultiple
        data.generosIds = generosSeleccionados.map(genero => genero.llave);
        data.cinesIds = cinesSeleccionados.map(cine => cine.llave);
        data.actores = actoresSeleccionados;
        // Llamamos a la función onSubmit pasada por props para enviar los datos completos al componente padre
        props.onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="mb-3">
                <label className="form-label">Géneros:</label>
                <SelectorMultiple seleccionados={generosSeleccionados} noSeleccionados={generosNoSeleccionados}
                    onChange={(seleccionados, noSeleccionados) => {
                        setGenerosSeleccionados(seleccionados);
                        setGenerosNoSeleccionados(noSeleccionados);
                    }}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Cines:</label>
                <SelectorMultiple seleccionados={cinesSeleccionados} noSeleccionados={cinesNoSeleccionados}
                    onChange={(seleccionados, noSeleccionados) => {
                        setCinesSeleccionados(seleccionados);
                        setCinesNoSeleccionados(noSeleccionados);
                    }}
                />
            </div>

            <div className="mb-3">
                <TypeaheadActores actores={actoresSeleccionados}
                    onAdd={actores => {
                        setActoresSeleccionados(actores)
                    }}
                    onRemove={actor => {
                        const actores = actoresSeleccionados.filter(x => x !== actor);
                        setActoresSeleccionados(actores);
                    }}
                    onCambioPersonaje={(id, personaje) => {
                        const indice = actoresSeleccionados.findIndex(x => x.id === id);
                        const actores = [...actoresSeleccionados];
                        actores[indice].personaje = personaje;
                        setActoresSeleccionados(actores);
                    }} />
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
    generosSeleccionados: Genero[];
    generosNoSeleccionados: Genero[];
    cinesSeleccionados: Cine[];
    cinesNoSeleccionados: Cine[];
    actoresSeleccionados: ActorPelicula[];
}

const reglasDeValidacion = yup.object({
    titulo: yup.string().required('El nombre es obligatorio').test(primeraLetraMayuscula()),
    fechaLanzamiento: yup.string().required('La fecha de lanzamiento es obligatoria')
})