import { useEffect, useState } from 'react';
import './App.css';
import ListadoPeliculas from './features/peliculas/componentes/ListadoPeliculas';
import type Pelicula from './features/peliculas/modelos/pelicula.model';
import Sidebar from './componentes/Sidebar';

export default function App() {

	const [peliculas, setPeliculas] = useState<AppState>({});

	useEffect(() => {
		setTimeout(() => {
			const enCines: Pelicula[] = [
				{
					id: 1,
					titulo: "Pokemon Mewtwo Strikes Back",
					poster: "https://upload.wikimedia.org/wikipedia/en/8/80/Pokemon22Post.png"
				},
				{
					id: 2,
					titulo: "Pokemon 2000",
					poster: "https://upload.wikimedia.org/wikipedia/en/d/dd/Pok%C3%A9mon_The_Movie_2000.jpg?20130805160059"
				},
				{
					id: 3,
					titulo: "Pokemon 3: The Movie",
					poster: "https://upload.wikimedia.org/wikipedia/en/4/47/Pokemon-3-japanese-poster.jpg"
				},
			];

			const proximosEstrenos: Pelicula[] = [
				{
					id: 4,
					titulo: "Pokémon: Lucario and the Mystery of Mew",
					poster: "https://upload.wikimedia.org/wikipedia/en/9/95/Pok%C3%A9mon_Lucario_film_poster.jpg"
				},
				{
					id: 5,
					titulo: "Pokémon the Movie: The Rise of Darkrai",
					poster: "https://upload.wikimedia.org/wikipedia/en/c/c4/The_Rise_of_Darkrai_2.JPG"
				}
			];

			setPeliculas({ enCines, proximosEstrenos });
		}, 1000);
	}, []);

	return (
		<>
			<div className="menu" onClick={() => {
				const barraLateral = document.querySelector(".barra-lateral");
				const menu = document.querySelector(".menu");
				barraLateral?.classList.toggle("max-barra-lateral");

				if (barraLateral?.classList.contains("max-barra-lateral")) {
					menu?.children[0].classList.add("d-none");  // Oculta bi-list
					menu?.children[1].classList.remove("d-none");  // Muestra bi-x
				} else {
					menu?.children[0].classList.remove("d-none");  // Muestra bi-list
					menu?.children[1].classList.add("d-none");  // Oculta bi-x
				}
			}}>
				<i className="bi bi-list"></i>
				<i className="bi bi-x d-none"></i>
			</div>
			<Sidebar />
			<main>
				<h3>En Cines</h3>
				<ListadoPeliculas peliculas={peliculas.enCines} />
				<hr />
				<h3>Proximos Estrenos</h3>
				<ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
			</main>
		</>
	)
}

interface AppState {
	enCines?: Pelicula[];
	proximosEstrenos?: Pelicula[];
}
