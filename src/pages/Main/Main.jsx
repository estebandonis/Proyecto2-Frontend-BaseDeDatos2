import { useState } from "react";
import { navigate } from "@store";
import stiles from "./Main.module.css";
import { useStoreon } from 'storeon/react';
import { useApi } from "@hooks";
import axios from "axios";
import { Pelicula } from "@components";
import { useEffect } from "react";

const Main = () => {

  const { apiUrl } = useApi();

  const { user } = useStoreon('user');

  const [searchTerm, setSearchTerm] = useState("");
  const [pelicula, setPelicula] = useState([]);
  const [peliculas, setPeliculas] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getPelicula = async () => {
    await axios
      .post(`${apiUrl}/peliculas/getMovie`, {titulo: searchTerm})
      .then((response) => {
        console.log(response.data);
        setPelicula(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  const getPeliculas = async (preferencia) => {
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
      getPeliculas(element)
    })
  }

  useEffect(() => {
    getRecomendations();
  }, []);

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Peliculas</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Busque una pelicula"
        />
        <button onClick={getPelicula}>Buscar</button>
        <button onClick={() => navigate("/")}>Go to Home</button>

        {pelicula.length !== 0 ?
          <div>
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

          {peliculas.length !== 0 ?
          <div>
            {peliculas.map((pelicula, index) => (
              <Pelicula key={index}
                clasificacion={pelicula.clasificacion}
                duracion={pelicula.duracion}
                sinopsis={pelicula.sinopsis}
                titulo={pelicula.titulo}
                year={pelicula.year}
              />
            ))}
          </div> : null}
      </div>
    </div>
  );
};

export default Main;
