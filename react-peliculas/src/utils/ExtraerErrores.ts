export default function ExtraerErrores(errores: any): string {
    // Si no hay errores, retorna un mensaje por defecto
    if (!errores) return 'Error del servidor';
    // Convertir el objeto en un array de pares [clave, valor]
    const mensajes = Object.entries(errores).map(([campo, valor]: any) => {
        // Extraer el texto del error sin importar el formato
        if (typeof valor === 'object' && valor.value) {
            // Si es objeto, toma el .value
            return valor.value;
        }
        // Si es string, lo deja como está
        return String(valor);
    });
    // Unir y limpiar (eliminar mensajes vacios, unir todos los errores)
    // Retorna un string con todos los errores separados por " - "
    return mensajes.filter(m => m).join(' - ');
}