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

  const getPeliculasByDirector = async (preferencia) => {
    await axios
      .post(`${apiUrl}/peliculas/getMovieGenero`, {genero: preferencia})
      .then((response) => {
        console.log(response.data);
        setPeliculas([...peliculas, ...response.data]);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  }; 

  const getPeliculasByActor = async (preferencia) => {
    await axios
      .post(`${apiUrl}/peliculas/getMovieGenero`, {genero: preferencia})
      .then((response) => {
        console.log(response.data);
        setPeliculas([...peliculas, ...response.data]);
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

  const orderPeliculas = () => {
    if (desc) {
      console.log(peliculas.sort((a, b) => (a.averRating > b.averRating) ? 1 : -1))
      setPeliculas(peliculas.sort((a, b) => (a.averRating > b.averRating) ? 1 : -1))
    }
    else {
      console.log(peliculas.sort((a, b) => (a.averRating < b.averRating) ? 1 : -1))
      setPeliculas(peliculas.sort((a, b) => (a.averRating < b.averRating) ? 1 : -1))
    }
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
  }, []);

  useEffect(() => {
    getRecomendations();
  }, [desc])

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Peliculas</h1>
        <button onClick={() => navigate("/actor")}>Actores</button>
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
          
          <h1>Recomendaciones basandonos en tus generos preferidos</h1>
          <select onChange={handleDescChange}>
            <option value="true">Descendente</option>
            <option value="false">Ascendente</option>
          </select>
          {peliculas.length !== 0 ?
          <div className={stiles.listMovies}>
            {peliculas.map((pelicula, index) => (
              <Pelicula key={index}
                clasificacion={pelicula.clasificacion}
                duracion={pelicula.duracion}
                sinopsis={pelicula.sinopsis}
                titulo={pelicula.titulo}
                year={pelicula.year}
                averRating={pelicula.averRating}
              />
            ))}
          </div> : null}
      </div>
    </div>
  );
};

export default Main;
