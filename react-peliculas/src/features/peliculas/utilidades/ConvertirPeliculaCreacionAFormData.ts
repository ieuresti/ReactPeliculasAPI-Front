import type PeliculaCreacion from '../modelos/PeliculaCreacion.model';

export default function ConvertirPeliculaCreacionAFormData(peliculaCreacion: PeliculaCreacion) {

    const formData = new FormData();

    formData.append('titulo', peliculaCreacion.titulo);
    formData.append('fechaLanzamiento', peliculaCreacion.fechaLanzamiento);

    if (peliculaCreacion.trailer) {
        formData.append('trailer', peliculaCreacion.trailer);
    }

    if (peliculaCreacion.poster) {
        formData.append('poster', peliculaCreacion.poster);
    }

    formData.append('generosIds', JSON.stringify(peliculaCreacion.generosIds ?? []));
    formData.append('cinesIds', JSON.stringify(peliculaCreacion.cinesIds ?? []));
    formData.append('actores', JSON.stringify(peliculaCreacion.actores ?? []));

    return formData;
}