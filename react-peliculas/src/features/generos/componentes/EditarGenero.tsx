import { useParams } from 'react-router';

export default function EditarGenero() {

    const { id } = useParams();

    return (
        <>
            <h3>Editar Género</h3>
            <p>El id del género es: {id}</p>
        </>
    )
}