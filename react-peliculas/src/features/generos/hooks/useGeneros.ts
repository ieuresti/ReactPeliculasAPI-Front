import { useEffect, useState } from 'react';
import type Genero from '../modelos/Genero.model';
import clienteAPI from '../../../api/clienteAxios';

export function useGeneros() {
    const [generos, setGeneros] = useState<Genero[]>();
    const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [recordsPorPagina, setRecordsPorPagina] = useState(5);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setCargando(true);
        clienteAPI.get<Genero[]>('/generos', {
            params: { pagina, recordsPorPagina }
        }).then(resp => {
            const cantidadTotalRegistros = parseInt(resp.headers['cantidad-total-registros']);
            setCantidadTotalRegistros(cantidadTotalRegistros);
            setGeneros(resp.data)
            setCargando(false);
        });
    }, [pagina, recordsPorPagina]);

    return {
        generos, cantidadTotalRegistros,
        pagina, setPagina, recordsPorPagina, setRecordsPorPagina, cargando
    }
}