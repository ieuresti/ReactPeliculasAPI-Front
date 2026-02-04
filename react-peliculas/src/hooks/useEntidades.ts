import { useCallback, useEffect, useState } from 'react';
import clienteAPI from '../api/clienteAxios';

export function useEntidades<T>(url: string) {
    const [entidades, setEntidades] = useState<T[]>();
    const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [recordsPorPagina, setRecordsPorPagina] = useState(5);
    const [cargando, setCargando] = useState(true);

    const cargarRegistros = useCallback(() => {
        setCargando(true);
        clienteAPI.get<T[]>(url, {
            params: { pagina, recordsPorPagina }
        }).then(resp => {
            const cantidadTotalRegistros = parseInt(resp.headers['cantidad-total-registros']);
            setCantidadTotalRegistros(cantidadTotalRegistros);
            setEntidades(resp.data);
            setCargando(false);
        });
    }, [pagina, recordsPorPagina]);

    useEffect(() => {
        cargarRegistros();
    }, [cargarRegistros]);

    return {
        entidades, cantidadTotalRegistros,
        pagina, setPagina, recordsPorPagina, setRecordsPorPagina, cargando, cargarRegistros
    }
}