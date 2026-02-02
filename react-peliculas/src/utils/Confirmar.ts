import Swal from 'sweetalert2';

export default function Confirmar(
    titulo: string,
    texto: string,
    icono: 'success' | 'warning' | 'error' | 'info' | 'question',
    mostrarBotonCancelar: boolean,
    textoBotonConfirmacion: string,
    onConfirm: () => void
) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        showCancelButton: mostrarBotonCancelar,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: textoBotonConfirmacion
    }).then(resultado => {
        if (resultado.isConfirmed) {
            onConfirm();
        }
    })
}