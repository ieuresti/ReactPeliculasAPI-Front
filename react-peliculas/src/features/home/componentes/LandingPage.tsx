import { useEffect, useState } from 'react';
import ListadoPeliculas from '../../peliculas/componentes/ListadoPeliculas';
import type Pelicula from '../../peliculas/modelos/pelicula.model';

export default function LandingPage() {

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
            <h3>En Cines</h3>
            <ListadoPeliculas peliculas={peliculas.enCines} />
            <hr />
            <h3>Proximos Estrenos</h3>
            <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
        </>
    )
}

interface AppState {
    enCines?: Pelicula[];
    proximosEstrenos?: Pelicula[];
}