import { useNavigate } from 'react-router';
import Boton from '../../../componentes/Boton';
import { useEffect, useState } from 'react';
import clienteAPI from '../../../api/clienteAxios';
import type Genero from '../modelos/Genero.model';
import ListadoGenerico from '../../../componentes/ListadoGenerico';
import Paginacion from '../../../componentes/Paginacion';

export default function IndiceGeneros() {

    const navigate = useNavigate();

    const [generos, setGeneros] = useState<Genero[]>();
    const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [recordsPorPagina, setRecordsPorPagina] = useState(5);

    useEffect(() => {
        clienteAPI.get<Genero[]>('/generos', {
            params: { pagina, recordsPorPagina }
        }).then(resp => {
            const cantidadTotalRegistros = parseInt(resp.headers['cantidad-total-registros']);
            setCantidadTotalRegistros(cantidadTotalRegistros);
            setGeneros(resp.data)
        });
    }, [pagina, recordsPorPagina]);

    return (
        <>
            <h3>Géneros</h3>
            <div className="mb-3">
                <Boton onClick={() => navigate('/generos/crear')}>Crear Género</Boton>
            </div>

            <div className="mb-4">
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
                                        <Boton btnClassName="btn btn-sm btn-outline-danger">
                                            <i className="bi bi-trash me-1"></i>Borrar
                                        </Boton>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </ListadoGenerico>
            </div>

        </>
    )
}