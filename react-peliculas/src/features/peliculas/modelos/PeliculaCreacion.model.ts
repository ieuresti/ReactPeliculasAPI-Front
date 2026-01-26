export default interface PeliculaCreacion {
    titulo: string;
    fechaLanzamiento: string;
    trailer?: string;
    poster?: File | string;
    generosIds?: number[];
    cinesIds?: number[];
}