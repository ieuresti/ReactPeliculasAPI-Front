export default function FormatearFecha(fechaISO: string) {

    return new Date(fechaISO).toISOString().split('T')[0];
}