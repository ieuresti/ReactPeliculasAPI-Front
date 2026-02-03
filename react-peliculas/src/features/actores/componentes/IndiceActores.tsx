import { useNavigate } from 'react-router';
import Boton from '../../../componentes/Boton';
import { useActores } from '../hooks/useActores';
import clienteAPI from '../../../api/clienteAxios';
import Cargando from '../../../componentes/Cargando';
import Paginacion from '../../../componentes/Paginacion';
import ListadoGenerico from '../../../componentes/ListadoGenerico';
import Confirmar from '../../../utils/Confirmar';

export default function IndiceActores() {

    const navigate = useNavigate();

    const {
        actores, cantidadTotalRegistros,
        pagina, setPagina, recordsPorPagina, setRecordsPorPagina, cargando, cargarRegistros
    } = useActores(); // Hook personalizado

    const Borrar = async (id: number) => {
        try {
            await clienteAPI.delete(`/actores/${id}`);

            if (pagina === 1) {
                cargarRegistros();
            } else {
                setPagina(1);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h3>Actores</h3>
            <div className="mb-3">
                <Boton onClick={() => navigate('/actores/crear')}>Crear Actor</Boton>
            </div>

            {cargando ? <Cargando /> : <div className="mb-4">
                <div className="mb-2">
                    <Paginacion
                        paginaActual={pagina}
                        registrosPorPagina={recordsPorPagina}
                        cantidadTotalRegistros={cantidadTotalRegistros}
                        registrosPorPaginaOpciones={[5, 10, 20]}
                        onCambioPaginacion={(pagina, recordsPorPagina) => {
                            setPagina(pagina);
                            setRecordsPorPagina(recordsPorPagina);
                        }} />
                </div>
                <ListadoGenerico listado={actores}>
                    <table className="table table-striped table-hover align-middle shadow-sm border rounded overflow-hidden">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col" className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actores?.map(actor =>
                                <tr key={actor.id}>
                                    <td>{actor.nombre}</td>
                                    <td className="text-end">
                                        <Boton btnClassName="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => navigate(`/actores/editar/${actor.id}`)}>
                                            <i className="bi bi-pencil me-1"></i>Editar
                                        </Boton>
                                        <Boton btnClassName="btn btn-sm btn-outline-danger"
                                            onClick={() => Confirmar(
                                                '¿Desea borrar el registro?', '',
                                                'question', true, 'Borrar', () => {
                                                    Borrar(actor.id);
                                                })}>
                                            <i className="bi bi-trash me-1"></i>Borrar
                                        </Boton>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </ListadoGenerico>
            </div >}
        </>
    )
}