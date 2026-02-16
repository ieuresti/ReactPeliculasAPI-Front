import type Usuario from '../modelos/Usuario.model';
import { useEntidades } from '../../../hooks/useEntidades';
import IndiceEntidades from '../../../componentes/IndiceEntidades';
import Boton from '../../../componentes/Boton';
import clienteAPI from '../../../api/clienteAxios';
import type EditarClaim from '../modelos/EditarClaim.model';
import Swal from 'sweetalert2';
import Confirmar from '../../../utils/Confirmar';

export default function IndiceUsuarios() {

    const usuariosHook = useEntidades<Usuario>('/usuarios/ListadoUsuarios');

    async function hacerAdmin(email: string) {
        await editarAdmin('/usuarios/HacerAdmin', email);
    }

    async function removerAdmin(email: string) {
        await editarAdmin('/usuarios/RemoverAdmin', email);
    }

    async function editarAdmin(url: string, email: string) {
        const editarClaim: EditarClaim = { email };

        await clienteAPI.post(url, editarClaim);
        Swal.fire({
            title: "Éxito",
            text: "Se ha actualizado el rol del usuario.",
            icon: "success"
        });
    }

    return (
        <>
            <IndiceEntidades<Usuario> titulo="Usuarios" {...usuariosHook} >
                {(usuarios) => <>
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col" className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios?.map(usuario =>
                            <tr key={usuario.email}>
                                <td>{usuario.email}</td>
                                <td className="text-end">
                                    <Boton btnClassName="btn btn-primary"
                                        onClick={() => Confirmar(
                                            `¿Deseas hacer admin a ${usuario.email}?`, '',
                                            'question', true, 'Hacer admin', () => {
                                                hacerAdmin(usuario.email);
                                            })}>
                                        Hacer admin
                                    </Boton>
                                    <Boton btnClassName="btn btn-danger ms-2"
                                        onClick={() => Confirmar(
                                            `¿Deseas remover admin a ${usuario.email}?`, '',
                                            'question', true, 'Remover admin', () => {
                                                removerAdmin(usuario.email);
                                            })}>
                                        Remover admin
                                    </Boton>
                                </td>
                            </tr>)}
                    </tbody>
                </>}
            </IndiceEntidades>
        </>
    )

}