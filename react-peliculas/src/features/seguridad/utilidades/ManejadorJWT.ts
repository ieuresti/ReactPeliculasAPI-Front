import type Claim from '../modelos/Claim';
import type RespuestaAutenticacion from '../modelos/RespuestaAutenticacion';

const llaveToken = "token";
const llaveExpiracion = "token-expiracion";

// Función para guardar el token JWT y su fecha de expiración en el localStorage del navegador
export function guardarTokenLocalStorage(autenticacion: RespuestaAutenticacion) {
    localStorage.setItem(llaveToken, autenticacion.token);
    localStorage.setItem(llaveExpiracion, autenticacion.expiracion.toString());
}

// Función para eliminar el token JWT y su fecha de expiración del localStorage, cerrando la sesión del usuario
export function logout() {
    localStorage.removeItem(llaveToken);
    localStorage.removeItem(llaveExpiracion);
}

// Función para obtener los claims del usuario a partir del token JWT almacenado en el localStorage
export function obtenerClaims(): Claim[] {
    const token = localStorage.getItem(llaveToken);
    const expiracion = localStorage.getItem(llaveExpiracion);

    // Si no hay token o fecha de expiración, retornamos un array vacío de claims
    if (!token || !expiracion) {
        return [];
    }

    const expiracionFecha = new Date(expiracion);

    // Si la fecha de expiración no es válida o ya ha pasado, cerramos sesión y retornamos un array vacío de claims
    if (isNaN(expiracionFecha.getTime()) || expiracionFecha <= new Date()) {
        logout();
        return [];
    }

    try {
        const payloadBase64 = token.split('.')[1]; // El payload del token JWT es la segunda parte, separada por puntos
        const payloadJson = atob(payloadBase64); // Decodificar el payload de base64 a JSON
        const dataToken = JSON.parse(payloadJson); // Parsear el JSON para obtener un objeto con los datos del token

        // Convertir el objeto de datos del token en un array de claims, donde cada claim tiene un nombre y un valor
        const claims: Claim[] = Object.entries(dataToken)
            .map(([nombre, valor]) => ({ nombre, valor: String(valor) }));

        return claims; // Retornar el array de claims obtenidos del token JWT
    } catch (error) {
        // Si ocurre un error al procesar el token (por ejemplo, formato inválido)
        // cerramos sesión y retornamos un array vacío de claims
        console.error(error);
        logout();
        return [];
    }
}

// Función para obtener el token JWT almacenado en el localStorage, o null si no existe
export function obtenerToken() {
    // Retornamos el JWT para mandarselo al web API en las peticiones
    return localStorage.getItem(llaveToken);
}