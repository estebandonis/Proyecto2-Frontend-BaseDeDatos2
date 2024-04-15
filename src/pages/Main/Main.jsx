import { useEffect, useState } from "react";
import { navigate } from "@store";
import { useStoreon } from 'storeon/react';
import axios from "axios";

import { useApi } from "@hooks";
import { Pelicula } from "@components";
import stiles from "./Main.module.css";

const Main = () => {

  const { apiUrl } = useApi();
  const { user } = useStoreon('user');

  const [searchTerm, setSearchTerm] = useState("");
  const [pelicula, setPelicula] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [peliculasDirector, setPeliculasDirector] = useState([]);
  const [peliculasActor, setPeliculasActor] = useState([]);
  const [desc, setDesc] = useState(true)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getPelicula = async () => {
    await axios
      .post(`${apiUrl}/peliculas/getMovieTitulo`, {titulo: searchTerm})
      .then((response) => {
        console.log(response.data);
        setPelicula(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  const getPeliculasByGenres = async (preferencia) => {
    if (preferencia !== undefined) {
      await axios
        .post(`${apiUrl}/peliculas/getMovieGenero`, {genero: preferencia, desc: desc})
        .then((response) => {
          console.log(response.data);
          setPeliculas([...peliculas, ...response.data]);
        })
        .catch((error) => {
          // Handle the error
          console.log("An error occurred while retrieving data", error);
        });
    }
  };

  const getPeliculasByDirector = async () => {
    await axios
      .post(`${apiUrl}/peliculas/getMovieDirector`, {user: user.correo})
      .then((response) => {
        console.log(response.data);
        setPeliculasDirector([...peliculas, ...response.data]);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  }; 

  const getPeliculasByActor = async () => {
    await axios
      .post(`${apiUrl}/peliculas/getMovieActor`, {user: user.correo})
      .then((response) => {
        console.log(response.data);
        setPeliculasActor([...peliculas, ...response.data]);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  }; 

  const getRecomendations = async () => {
    user.preferencias.forEach(element => {
      if (element !== undefined) {
        getPeliculasByGenres(element)
      }
    })
  }

  const handleDescChange = (event) => {
    if (event.target.value === "true") {
      setPeliculas([])
      setDesc(true)
    }
    else {
      setPeliculas([])
      setDesc(false)
    }
  }

  useEffect(() => {
    getRecomendations();
    getPeliculasByDirector();
    getPeliculasByActor();
  }, []);

  useEffect(() => {
    getRecomendations();
  }, [desc])

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Peliculas</h1>
        <button onClick={() => navigate("/actor")}>Actores</button>
        <button onClick={() => navigate("/addSequel")}>Agregar Secuela</button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Busque una pelicula"
        />
        <button onClick={getPelicula}>Buscar</button>
        <button onClick={() => navigate("/")}>Go to Home</button>

        {pelicula.length !== 0 ?
          <div className={stiles.listMovies}>
            {pelicula.map((pelicula, index) => (
              <Pelicula key={index}
                clasificacion={pelicula.clasificacion}
                duracion={pelicula.duracion}
                sinopsis={pelicula.sinopsis}
                titulo={pelicula.titulo}
                year={pelicula.year}
              />
            ))}
          </div> : null}
          
          <h1>Recomendaciones basándonos en tus generos preferidos</h1>
          <select onChange={handleDescChange}>
            <option value="true">Descendente</option>
            <option value="false">Ascendente</option>
          </select>
          {peliculas.length !== 0 ?
          <div className={stiles.listMovies}>
            {peliculas.map((pel, index) => (
              <Pelicula key={index}
                clasificacion={pel.clasificacion}
                duracion={pel.duracion}
                sinopsis={pel.sinopsis}
                titulo={pel.titulo}
                year={pel.year}
                averRating={pel.averRating}
                genero={pel.genero}
              />
            ))}
          </div> : null}

          <h1>Recomendaciones basándonos en tus directores favoritos</h1>

          {peliculasDirector.length !== 0 ?
          <div className={stiles.listMovies}>
            {peliculasDirector.map((pel, index) => (
              <Pelicula key={index}
                clasificacion={pel.clasificacion}
                duracion={pel.duracion}
                sinopsis={pel.sinopsis}
                titulo={pel.titulo}
                year={pel.year}
                directorName={pel.nombre}
                directorApellido={pel.apellido}
              />
            ))}
          </div> : null}

          <h1>Recomendaciones basándonos en tus actores favoritos</h1>

          {peliculasActor.length !== 0 ?
          <div className={stiles.listMovies}>
            {peliculasActor.map((pel, index) => (
              <Pelicula key={index}
                clasificacion={pel.clasificacion}
                duracion={pel.duracion}
                sinopsis={pel.sinopsis}
                titulo={pel.titulo}
                year={pel.year}
                actorName={pel.nombre}
                actorApellido={pel.apellido}
              />
            ))}
          </div> : null}
      </div>
    </div>
  );
};

export default Main;
