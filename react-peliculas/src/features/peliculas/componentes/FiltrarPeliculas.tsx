import { useForm, type SubmitHandler } from 'react-hook-form';
import Boton from '../../../componentes/Boton';
import type Genero from '../../generos/modelos/Genero.model';

export default function FiltrarPeliculas() {

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
        formState: { isSubmitting } // contiene estado del formulario (errores, validación, envío)
    } = useForm<FormType>({
        defaultValues: valorInicial // establecer los valores iniciales de los campos del formulario
    });

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        console.log('filtrando...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
    }

    const generos: Genero[] = [
        { id: 1, nombre: 'Terror' }, { id: 2, nombre: 'Acción' }, { id: 3, nombre: 'Comedia' }
    ];

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
                                <Boton onClick={() => reset()} btnClassName="btn btn-danger">Limpiar</Boton>
                            </div>
                        </form>
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