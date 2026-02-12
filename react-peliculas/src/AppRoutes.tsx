import { Route, Routes } from 'react-router';
import LandingPage from './features/home/componentes/LandingPage';
import IndiceGeneros from './features/generos/componentes/IndiceGeneros';
import CrearGenero from './features/generos/componentes/CrearGenero';
import EditarGenero from './features/generos/componentes/EditarGenero';
import IndiceActores from './features/actores/componentes/IndiceActores';
import CrearActor from './features/actores/componentes/CrearActor';
import EditarActor from './features/actores/componentes/EditarActor';
import IndiceCines from './features/cines/componentes/IndiceCines';
import CrearCine from './features/cines/componentes/CrearCine';
import EditarCine from './features/cines/componentes/EditarCine';
import CrearPelicula from './features/peliculas/componentes/CrearPelicula';
import EditarPelicula from './features/peliculas/componentes/EditarPelicula';
import RutaNoEncontrada from './componentes/RutaNoEncontrada';
import FiltrarPeliculas from './features/peliculas/componentes/FiltrarPeliculas';
import DetallePelicula from './features/peliculas/componentes/DetallePelicula';
import RutaProtegida from './features/seguridad/componentes/RutaProtegida';

export default function AppRoutes() {
    return (
        <Routes>
            {/* Ruta pública para la página de inicio, accesible para todos los usuarios sin necesidad de claims específicos */}
            <Route path='/' element={<LandingPage />} />

            {/* Rutas protegidas para administradores, utilizando el componente RutaProtegida que verifica los claims del usuario antes de renderizar las rutas hijas */}
            <Route element={<RutaProtegida claims={['esAdmin']} />} >
                <Route path='/generos' element={<IndiceGeneros />} />
                <Route path='/generos/crear' element={<CrearGenero />} />
                <Route path='/generos/editar/:id' element={<EditarGenero />} />

                <Route path='/actores' element={<IndiceActores />} />
                <Route path='/actores/crear' element={<CrearActor />} />
                <Route path='/actores/editar/:id' element={<EditarActor />} />

                <Route path='/cines' element={<IndiceCines />} />
                <Route path='/cines/crear' element={<CrearCine />} />
                <Route path='/cines/editar/:id' element={<EditarCine />} />

                <Route path='/peliculas/crear' element={<CrearPelicula />} />
                <Route path='/peliculas/editar/:id' element={<EditarPelicula />} />
            </Route>

            {/* Rutas públicas para todos los usuarios, sin necesidad de claims específicos */}
            <Route path='/peliculas/filtrar' element={<FiltrarPeliculas />} />
            <Route path='/peliculas/:id' element={<DetallePelicula />} />

            {/* Ruta para manejar cualquier ruta no definida */}
            <Route path='*' element={<RutaNoEncontrada />} />
        </Routes>
    )
}