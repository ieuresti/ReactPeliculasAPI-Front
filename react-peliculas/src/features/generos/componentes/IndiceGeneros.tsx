import { useNavigate } from 'react-router';
import Boton from '../../../componentes/Boton';
import ListadoGenerico from '../../../componentes/ListadoGenerico';
import Paginacion from '../../../componentes/Paginacion';
import Cargando from '../../../componentes/Cargando';
import { useGeneros } from '../hooks/useGeneros';
import Confirmar from '../../../utils/Confirmar';
import clienteAPI from '../../../api/clienteAxios';

export default function IndiceGeneros() {

    const navigate = useNavigate();

    const {
        generos, cantidadTotalRegistros,
        pagina, setPagina, recordsPorPagina, setRecordsPorPagina, cargando, cargarRegistros
    } = useGeneros(); // Hook personalizado

    const Borrar = async (id: number) => {
        try {
            await clienteAPI.delete(`/generos/${id}`);

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
            <h3>Géneros</h3>
            <div className="mb-3">
                <Boton onClick={() => navigate('/generos/crear')}>Crear Género</Boton>
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
                <ListadoGenerico listado={generos}>
                    <table className="table table-striped table-hover align-middle shadow-sm border rounded overflow-hidden">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col" className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos?.map(genero =>
                                <tr key={genero.id}>
                                    <td>{genero.nombre}</td>
                                    <td className="text-end">
                                        <Boton btnClassName="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => navigate(`/generos/editar/${genero.id}`)}>
                                            <i className="bi bi-pencil me-1"></i>Editar
                                        </Boton>
                                        <Boton btnClassName="btn btn-sm btn-outline-danger"
                                            onClick={() => Confirmar(
                                                '¿Desea borrar el registro?', '',
                                                'question', true, 'Borrar', () => {
                                                    Borrar(genero.id);
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