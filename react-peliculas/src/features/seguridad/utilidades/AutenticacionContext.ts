import React from 'react';
import type Claim from '../modelos/Claim';

/**
 * Contexto de autenticación para la aplicación.
 *
 * Propósito:
 * - Mantener la lista de `claims` (reclamaciones/roles/privilegios) del usuario actual.
 * - Proveer una función `actualizar` para reemplazar los claims cuando cambie la autenticación.
 *
 * Uso:
 * - Envolver la aplicación con `AutenticacionContext.Provider` suministrando `{ claims, actualizar }`.
 * - Consumir desde componentes con `useContext(AutenticacionContext)` para leer claims o llamar `actualizar`.
 *
 * Valor por defecto:
 * - `{ claims: [], actualizar: () => {} }` evita errores si no se provee un Provider.
 */

const AutenticacionContext = React.createContext<AutenticacionContextParams>({ claims: [], actualizar: () => { } });

interface AutenticacionContextParams {
    // Lista de claims del usuario (ej: role, permissions, etc.).
    claims: Claim[];
    // Función para actualizar la lista de claims en el Provider.
    actualizar(claims: Claim[]): void;
}

export default AutenticacionContext