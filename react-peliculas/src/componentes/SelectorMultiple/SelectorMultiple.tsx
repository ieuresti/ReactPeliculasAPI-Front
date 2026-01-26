import type SelectorMultipleModel from './SelectorMultiple.model';
import styles from './SelectorMultiple.module.css';

export default function SelectorMultiple(props: SelectorMultipleProps) {

    const seleccionar = (item: SelectorMultipleModel) => {
        // Clonar el listado de seleccionados, creando un nuevo arreglo mas el nuevo item
        const seleccionados = [...props.seleccionados, item];
        // Extraer item agregado en no seleccionados
        const noSeleccionados = props.noSeleccionados.filter(valor => valor !== item);
        // Pasar al componente padre los nuevos elementos seleccionados y no seleccionados
        props.onChange(seleccionados, noSeleccionados);
    };

    const deseleccionar = (item: SelectorMultipleModel) => {
        const seleccionados = props.seleccionados.filter(valor => valor !== item);
        const noSeleccionados = [...props.noSeleccionados, item];
        props.onChange(seleccionados, noSeleccionados);
    };

    const seleccionarTodo = () => {
        const seleccionados = [...props.seleccionados, ...props.noSeleccionados]; // Arreglo con todo
        const noSeleccionados: SelectorMultipleModel[] = [];
        props.onChange(seleccionados, noSeleccionados);
    };

    const deseleccionarTodo = () => {
        const seleccionados: SelectorMultipleModel[] = [];
        const noSeleccionados = [...props.seleccionados, ...props.noSeleccionados];
        props.onChange(seleccionados, noSeleccionados);
    };

    return (
        <div className={styles.div}>
            <div>
                <p>No seleccionados</p>
                <ul>
                    {props.noSeleccionados.map(item =>
                        <li key={item.llave} onClick={() => seleccionar(item)}>
                            {item.descripcion}
                        </li>
                    )}
                </ul>
            </div>

            <div className={styles.botones}>
                <button type="button" className="btn btn-outline-primary" onClick={seleccionarTodo}>{'>>'}</button>
                <button type="button" className="btn btn-outline-primary" onClick={deseleccionarTodo}>{'<<'}</button>
            </div>

            <div>
                <p>Seleccionados</p>
                <ul>
                    {props.seleccionados.map(item =>
                        <li key={item.llave} onClick={() => deseleccionar(item)}>
                            {item.descripcion}
                        </li>
                    )}
                </ul>
            </div>

        </div>
    )
}

interface SelectorMultipleProps {
    seleccionados: SelectorMultipleModel[];
    noSeleccionados: SelectorMultipleModel[];
    onChange(seleccionados: SelectorMultipleModel[], noSeleccionados: SelectorMultipleModel[]): void;
}