import type Cine from '../modelos/Cine.model';
import { useEntidades } from '../../../hooks/useEntidades';
import IndiceEntidades from '../../../componentes/IndiceEntidades';

export default function IndiceCines() {

    const entidadesHook = useEntidades<Cine>('/cines'); // Hook personalizado generico

    return (
        <>
            <IndiceEntidades<Cine>
                titulo="Cines" nombreEntidad="Cine" url="/cines"
                urlCrear="/cines/crear" {...entidadesHook}
            >
                {(cines, botones) => <>
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col" className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cines?.map(cine =>
                            <tr key={cine.id}>
                                <td>{cine.nombre}</td>
                                <td className="text-end">
                                    {botones(`/cines/editar/${cine.id}`, cine.id)}
                                </td>
                            </tr>)}
                    </tbody>
                </>}
            </IndiceEntidades>
        </>
    )
}