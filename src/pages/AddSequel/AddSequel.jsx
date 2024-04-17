import { useEffect, useState } from "react";
import { navigate } from "@store";
import axios from "axios";

import { useApi } from "@hooks";
import { Pelicula, Relation } from "@components";
import stiles from "./AddSequel.module.css";

const AddSequel = () => {

  const { apiUrl } = useApi();

  const [primera, setPrimera] = useState("");
  const [segunda, setSegunda] = useState("");
  const [orden, setOrden] = useState("true");
  const [continuation, setContinuation] = useState("true")
  const [primeraSearch, setPrimeraSearch] = useState("");
  const [segundaSearch, setSegundaSearch] = useState("");
  const [relacion, setRelation] = useState([]);
  const [linkNodes, setLinkNodes] = useState("");
  const [linkRelations, setLinkRelations] = useState("");


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

  const searchSecuela = async () => {
    await axios
      .post(`${apiUrl}/peliculas/getMovieSequel`, {first: primeraSearch, second: segundaSearch})
      .then((response) => {
        console.log(response.data);
        setRelation(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log("An error occurred while retrieving data", error);
      });
  }

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

  const handlePrimeraSearchChange = (event) => {
    setPrimeraSearch(event.target.value);
  };

  const handleSecondSearchChange = (event) => {
    setSegundaSearch(event.target.value);
  };

  const handleLinkNodesChange = (event) => {
    setLinkNodes(event.target.value);
  };

  const handleLinkRelationsChange = (event) => {
    setLinkRelations(event.target.value);
  };

  const uploadLinkNodes = async () => {
    await axios
      .post(`${apiUrl}/peliculas/upload_csv_nodes`, {link: linkNodes})
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("Se han agregado los nodos correctamente")
        } else {
          alert("No se ha podido agregar los nodos")
        }
      })
      .catch((error) => {
        // Handle the error
        console.log("Ocurrio un error con el link", error);
      });
  }

  const uploadLinkRelations = async () => {
    await axios
      .post(`${apiUrl}/peliculas/upload_csv_relaciones`, {link: linkRelations})
      .then((response) => {
        console.log(response.data);
        setPrimeraSearch(response.data[0][0])
        setSegundaSearch(response.data[0][1])
      })
      .catch((error) => {
        // Handle the error
        console.log("Ocurrio un error con el link", error);
      });
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
        <button onClick={() => navigate("/main")}>Main</button>

        <br />

        <h2>Crear Secuela</h2>

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

        <select onChange={handleOrdenChange}>
          <option value="true">Es orden</option>
          <option value="false">No es orden</option>
        </select>

        <select onChange={handleContinuationChange}>
          <option value="true">Es continuación</option>
          <option value="false">No es continuación</option>
        </select>

        <button onClick={() => setSecuela()}>Crear Secuela</button>

        <br />

        <h2>Crear Secuela desde .csv</h2>

        <input
          type="text"
          value={linkNodes}
          onChange={handleLinkNodesChange}
          placeholder="Subir nodos y relaciones desde link"
        />
        <button onClick={uploadLinkNodes}>Crear</button>

        <input
          type="text"
          value={linkRelations}
          onChange={handleLinkRelationsChange}
          placeholder="Subir nodos y relaciones desde link"
        />
        <button onClick={uploadLinkRelations}>Crear</button>

        <br />

        <h2>Buscar Secuela</h2>

        <input
          type="text"
          value={primeraSearch}
          onChange={handlePrimeraSearchChange}
          placeholder="Ingrese la pelicula original"
        />

        <input
          type="text"
          value={segundaSearch}
          onChange={handleSecondSearchChange}
          placeholder="Ingrese la pelicula secuela"
        />

        <button onClick={() => searchSecuela()}>Buscar Relación</button>

        {relacion.length !== 0 ?
          <div className={stiles.relation}>
            
            <Pelicula
              clasificacion={relacion[0].clasificacion}
              duracion={relacion[0].duracion}
              sinopsis={relacion[0].sinopsis}
              titulo={relacion[0].titulo}
              year={relacion[0].year}
              averRating={relacion[0].averRating}
            />
            
            <Relation
              diferenciaTime={relacion[2].diferenciaTiempo}
              orden={relacion[2].orden}
              esContinuacion={relacion[2].esContinuacion}
            />

            <Pelicula
              clasificacion={relacion[1].clasificacion}
              duracion={relacion[1].duracion}
              sinopsis={relacion[1].sinopsis}
              titulo={relacion[1].titulo}
              year={relacion[1].year}
              averRating={relacion[1].averRating}
            />
            
          </div>
        : null}

      </div>
    </div>
  );
};

export default AddSequel;
