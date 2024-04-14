import { useEffect, useState } from "react";
import { navigate } from "@store";
import axios from "axios";

import { useApi } from "@hooks";
import stiles from "./AddSequel.module.css";

const AddSequel = () => {

  const { apiUrl } = useApi();

  const [primera, setPrimera] = useState("");
  const [segunda, setSegunda] = useState("");
  const [orden, setOrden] = useState("true");
  const [continuation, setContinuation] = useState("true")

  const setSecuela = async () => {
    await axios
      .post(`${apiUrl}/peliculas/setMovieSequel`, {first: primera, second: segunda, orden: orden, isContinuation: continuation})
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("Se ha agregado la secuela correctamente")
        } else {
          alert("No se ha podido agregar la secuela")
        }
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  };

  const handlePrimeraChange = (event) => {
    setPrimera(event.target.value);
  };

  const handleSecondChange = (event) => {
    setSegunda(event.target.value);
  };

  const handleOrdenChange = (event) => {
    setOrden(event.target.value)
  }

  const handleContinuationChange = (event) => {
    setContinuation(event.target.value)
  }

  useEffect(() => {
    console.log("Primera: ", primera)
    console.log("Segunda: ", segunda)
    console.log("Orden: ", orden)
    console.log("Continuation: ", continuation)
  } , [primera, segunda, orden, continuation])

  return (
    <div className={stiles.bigStyles}>
      <div className={stiles.styles}>
        <h1>Agregar Secuela Peliculas</h1>
        <button onClick={() => navigate("/main")}>Actores</button>

        <input
          type="text"
          value={primera}
          onChange={handlePrimeraChange}
          placeholder="Ingrese la pelicula original"
        />

        <input
          type="text"
          value={segunda}
          onChange={handleSecondChange}
          placeholder="Ingrese la pelicula secuela"
        />
          
        <h1>Recomendaciones basandonos en tus generos preferidos</h1>
        <select onChange={handleOrdenChange}>
          <option value="true">Es orden</option>
          <option value="false">No es orden</option>
        </select>

        <select onChange={handleContinuationChange}>
          <option value="true">Es continuación</option>
          <option value="false">No es continuación</option>
        </select>

        <button onClick={() => setSecuela()}>Crear Secuela</button>
      </div>
    </div>
  );
};

export default AddSequel;
