import { BrowserRouter } from 'react-router';
import './App.css';
import Sidebar from './componentes/Sidebar';
import AppRoutes from './AppRoutes';
import Menu from './componentes/Menu';
import AutenticacionContext from './features/seguridad/utilidades/AutenticacionContext';
import { useEffect, useState } from 'react';
import type Claim from './features/seguridad/modelos/Claim';
import { obtenerClaims } from './features/seguridad/utilidades/ManejadorJWT';

export default function App() {

	const [claims, setClaims] = useState<Claim[]>([]); // Estado para almacenar los claims del usuario

	useEffect(() => {
		setClaims(obtenerClaims()); // Obtener los claims del usuario al cargar la aplicación y almacenarlos en el estado
	}, []);

	// Función para actualizar los claims en el contexto de autenticación
	function actualizar(claims: Claim[]) {
		setClaims(claims);
	}

	return (
		<>
			<BrowserRouter> {/* Envolver la aplicación con BrowserRouter para habilitar el enrutamiento */}

				{/* Envolver la aplicación con el Provider del contexto de autenticación, suministrando los claims y la función actualizar */}
				<AutenticacionContext.Provider value={{ claims, actualizar }}>

					<Menu />
					<Sidebar />

					<main>
						<AppRoutes />
					</main>

				</AutenticacionContext.Provider>

			</BrowserRouter>
		</>
	)
}
