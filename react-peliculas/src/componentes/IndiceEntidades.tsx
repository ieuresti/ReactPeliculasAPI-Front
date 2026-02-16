import { useNavigate } from 'react-router';
import clienteAPI from '../api/clienteAxios';
import Boton from './Boton';
import Cargando from './Cargando';
import Paginacion from './Paginacion';
import ListadoGenerico from './ListadoGenerico';
import type { ReactNode } from 'react';
import Confirmar from '../utils/Confirmar';

export default function IndiceEntidades<T>(props: IndiceEntidadesProps<T>) {

    const navigate = useNavigate();

    const botones = (urlEditar: string, id: number) => <>
        <Boton btnClassName="btn btn-sm btn-outline-primary me-2"
            onClick={() => navigate(urlEditar)}>
            <i className="bi bi-pencil me-1"></i>Editar
        </Boton>
        <Boton btnClassName="btn btn-sm btn-outline-danger"
            onClick={() => Confirmar(
                '¿Desea borrar el registro?', '',
                'question', true, 'Borrar', () => {
                    Borrar(id);
                })}>
            <i className="bi bi-trash me-1"></i>Borrar
        </Boton>
    </>

    const Borrar = async (id: number) => {
        try {
            await clienteAPI.delete(`${props.url}/${id}`);

            if (props.pagina === 1) {
                props.cargarRegistros();
            } else {
                props.setPagina(1);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h3>{props.titulo}</h3>
            {props.urlCrear ?
                <div className="mb-3">
                    <Boton onClick={() => navigate(props.urlCrear!)}>Crear {props.titulo}</Boton>
                </div> : undefined}

            {props.cargando ? <Cargando /> : <div className="mb-4">
                <div className="mb-2">
                    <Paginacion
                        paginaActual={props.pagina}
                        registrosPorPagina={props.recordsPorPagina}
                        cantidadTotalRegistros={props.cantidadTotalRegistros}
                        registrosPorPaginaOpciones={[5, 10, 20]}
                        onCambioPaginacion={(pagina, recordsPorPagina) => {
                            props.setPagina(pagina);
                            props.setRecordsPorPagina(recordsPorPagina);
                        }} />
                </div>
                <ListadoGenerico listado={props.entidades}>
                    <table className="table table-striped table-hover align-middle shadow-sm border rounded overflow-hidden">
                        {props.children(props.entidades!, botones)}
                    </table>
                </ListadoGenerico>
            </div >}
        </>
    )
}

interface IndiceEntidadesProps<T> {
    url?: string;
    urlCrear?: string;
    titulo: string;
    nombreEntidad?: string;
    pagina: number;
    recordsPorPagina: number;
    cantidadTotalRegistros: number;
    setPagina: (pagina: number) => void;
    setRecordsPorPagina: (pagina: number) => void;
    entidades?: T[];
    cargando: boolean;
    cargarRegistros: () => void;
    children(entidades: T[], botones: (urlEditar: string, id: number) => ReactNode): ReactNode;
}