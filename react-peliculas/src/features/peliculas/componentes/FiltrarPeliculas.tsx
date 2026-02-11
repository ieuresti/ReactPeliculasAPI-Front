import { useForm, type SubmitHandler } from 'react-hook-form';
import Boton from '../../../componentes/Boton';
import type Genero from '../../generos/modelos/Genero.model';
import { useEffect, useState } from 'react';
import clienteAPI from '../../../api/clienteAxios';
import type Pelicula from '../modelos/pelicula.model';
import ListadoPeliculas from './ListadoPeliculas';
import { useSearchParams } from 'react-router';

export default function FiltrarPeliculas() {

    const [generos, setGeneros] = useState<Genero[]>([]);
    const [peliculas, setPeliculas] = useState<Pelicula[]>();
    const [searchParams, setSearchParams] = useSearchParams(); // Hook useSearchParams de react-router para manejar los parámetros de búsqueda en la URL

    const valorInicial: FormType = {
        titulo: '',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false
    }

    // Hook useForm de react-hook-form para manejar el formulario
    const {
        register, // registra campos del formulario
        handleSubmit, // maneja el envío del formulario
        reset, // resetear el formulario
        setValue, // establecer valores de los campos del formulario
        formState: { isSubmitting } // contiene estado del formulario (errores, validación, envío)
    } = useForm<FormType>({
        defaultValues: valorInicial // establecer los valores iniciales de los campos del formulario
    });

    useEffect(() => {
        clienteAPI.get<Genero[]>('/generos/todos').then(resp => {
            setGeneros(resp.data);
        });
    }, []);

    useEffect(() => {
        if (generos.length === 0) {
            return; // Si no se han cargado los géneros, no realizar la búsqueda de películas
        }

        if (searchParams.has('titulo')) {
            valorInicial.titulo = searchParams.get('titulo')!;
            setValue('titulo', valorInicial.titulo);
        }

        if (searchParams.has('titulo')) {
            valorInicial.titulo = searchParams.get('titulo')!;
            setValue('titulo', valorInicial.titulo);
        }

        if (searchParams.has('generoId')) {
            valorInicial.generoId = parseInt(searchParams.get('generoId')!, 10);
            setValue('generoId', valorInicial.generoId);
        }

        if (searchParams.has('proximosEstrenos')) {
            valorInicial.proximosEstrenos = searchParams.get('proximosEstrenos') === 'true';
            setValue('proximosEstrenos', valorInicial.proximosEstrenos);
        }

        if (searchParams.has('enCines')) {
            valorInicial.enCines = searchParams.get('enCines') === 'true';
            setValue('enCines', valorInicial.enCines);
        }

        buscarPeliculas(valorInicial);
    }, [generos]); // Segundo useEffect se ejecuta cada vez que cambian los géneros, lo que permite cargar las películas filtradas una vez que se han obtenido los géneros disponibles.

    async function buscarPeliculas(valores: FormType) { // FormType es la interfaz que define la estructura de los datos del formulario
        modificarURL(valores); // Modificar la URL con los parámetros de búsqueda antes de realizar la solicitud al backend

        try {
            await clienteAPI.get<Pelicula[]>('/peliculas/filtrar', { params: valores }).then(resp => {
                setPeliculas(resp.data);
            })
        } catch (error) {
            console.error('Error al filtrar películas:', error);
        }
    }

    function modificarURL(valores: FormType) {
        const params = new URLSearchParams(); // Crear un objeto URLSearchParams para construir la cadena de consulta

        if (valores.titulo) {
            params.set('titulo', valores.titulo);
        }
        if (valores.generoId) {
            params.set('generoId', valores.generoId.toString());
        }
        if (valores.proximosEstrenos) {
            params.set('proximosEstrenos', valores.proximosEstrenos.toString());
        }
        if (valores.enCines) {
            params.set('enCines', valores.enCines.toString());
        }

        setSearchParams(params); // Actualizar los parámetros de búsqueda en la URL
    }

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        await buscarPeliculas(data);
    }

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg">

                    <div className="card-header bg-primary text-white">
                        <h4>Filtro de Películas</h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="row align-items-center g-3">
                            <div className="col-12 col-lg-3">
                                <input className="form-control" placeholder="Titulo de la película" {...register('titulo')} autoComplete="off" />
                            </div>

                            <div className="col-12 col-lg-3">
                                <select className="form-select" {...register('generoId')}>
                                    <option value="0">-- Seleccione un género --</option>
                                    {generos.map(genero => <option key={genero.id} value={genero.id} >{genero.nombre}</option>)}
                                </select>
                            </div>

                            <div className="col-12 col-md-6 col-lg-2">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="proximosEstrenos" {...register('proximosEstrenos')} />
                                    <label htmlFor="proximosEstrenos">Próximos Estrenos</label>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-2">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="enCines" {...register('enCines')} />
                                    <label htmlFor="enCines">En Cines</label>
                                </div>
                            </div>

                            <div className="col-12 col-lg-2 d-flex gap-2">
                                <Boton disabled={isSubmitting} type="submit">{isSubmitting ? 'Filtrando...' : 'Filtrar'}</Boton>
                                <Boton onClick={() => {
                                    reset();
                                    buscarPeliculas(valorInicial); // Realizar la búsqueda con los valores iniciales para mostrar todas las películas
                                }}
                                    btnClassName="btn btn-danger">
                                    Limpiar
                                </Boton>
                            </div>
                        </form>

                        <div className="mt-4">
                            <ListadoPeliculas peliculas={peliculas} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

interface FormType {
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
}