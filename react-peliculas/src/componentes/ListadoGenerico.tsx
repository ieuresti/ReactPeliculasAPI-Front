import Cargando from './Cargando';

export default function ListadoGenerico<T>(props: ListadoGenericoProps<T>) {

    if (!props.listado) {
        return props.cargandoUI ? props.cargandoUI : <Cargando />;
    } else if (props.listado.length === 0) {
        return props.listadoVacioUI ? props.listadoVacioUI : 'No hay elementos para mostrar';
    } else {
        return props.children;
    }
}

interface ListadoGenericoProps<T> {
    listado: T[] | undefined; // recibe un array de elementos genericos
    children: React.ReactNode; // recibe un componente hijo para renderizar cada elemento
    listadoVacioUI?: React.ReactNode; // puede recibir ui para cuando el listado este vacio
    cargandoUI?: React.ReactNode; // puede recibir ui para cuando el listado este cargando
}