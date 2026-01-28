import { useNavigate } from 'react-router';
import Boton from '../../../componentes/Boton';
import { useEffect } from 'react';
import clienteAPI from '../../../api/clienteAxios';

export default function IndiceGeneros() {

    const navigate = useNavigate();

    useEffect(() => {
        clienteAPI.get('/generos')
            .then(resp => console.log(resp.data));
    }, []);

    return (
        <>
            <h3>Géneros</h3>
            <Boton onClick={() => navigate('/generos/crear')}>Crear Género</Boton>
        </>
    )
}