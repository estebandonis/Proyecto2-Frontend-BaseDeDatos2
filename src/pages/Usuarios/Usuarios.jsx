import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from "@hooks";
import styles from './Usuarios.module.css';

const RELS_FORM = {
    AMIGOS: [],
    WATCHED: [],
    LIKED_ACTOR: [],
    LIKED_DIRECTOR: [],
    LIKED_GENRE: []
}

const Usuarios = () => {
    const { apiUrl } = useApi();
    const [currentPage, setCurrentPage ] = useState(10)
    const [usuarios, setUsuarios] = useState([]);

    const [relAmigos, setRelAmigos] = useState([]);
    const [relVistos, setRelVistos] = useState([]);
    const [relActores, setRelActores] = useState([]);
    const [relDirectores, setRelDirectores] = useState([]);
    const [relGeneros, setRelGeneros] = useState([]);

    const [label, setLabel] = useState("WATCHED")
    const [showRels, setShowRels] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get(`${apiUrl}/usuarios/info/${currentPage}`);
            setUsuarios(response.data);
            console.log(currentPage)
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    const fetchRelaciones = async (usuario) => {
        const nombre = usuario.nombre;
        const apellido = usuario.apellido;
        try {
            const res1 = await axios.get(`${apiUrl}/usuarios/relations/AMIGO?nombre=${nombre}&apellido=${apellido}`);
            setRelAmigos(res1.data);
            const res2 = await axios.get(`${apiUrl}/usuarios/relations/WATCHED?nombre=${nombre}&apellido=${apellido}`);
            setRelVistos(res2.data);
            const res3 = await axios.get(`${apiUrl}/usuarios/relations/LIKED_ACTOR?nombre=${nombre}&apellido=${apellido}`);
            setRelActores(res3.data);
            const res4 = await axios.get(`${apiUrl}/usuarios/relations/LIKED_DIRECTOR?nombre=${nombre}&apellido=${apellido}`);
            setRelDirectores(res4.data);
            const res5 = await axios.get(`${apiUrl}/usuarios/relations/LIKED_GENRE?nombre=${nombre}&apellido=${apellido}`);
            setRelGeneros(res5.data);
        } catch (error) {
            console.error('Error al cargar relaciones:', error);
        }
    }

    useEffect(() => {
        fetchUsuarios();
        if (showRels != null) {
            fetchRelaciones(showRels)
        }
    }, [currentPage, showRels, label]);

    const handleBackButton = () => {
        setCurrentPage(Math.max(currentPage - 1, 0));
    };

    const handleNextButton = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleRelUpdate = (index, prop, value) => {
        let val = value;
        if (!isNaN(val) && !isNaN(parseFloat(val)))
            val = (+val);
        if (val == 'false')
            val = false;
        if (val == 'true')
            val = true
        switch (label) {
            case "AMIGO":
                const modRel1 = [...relAmigos];
                modRel1[index][prop] = val;
                setRelAmigos(modRel1);
                break;
            case "WATCHED":
                const modRel2 = [...relVistos];
                modRel2[index][prop] = val;
                setRelVistos(modRel2);
                break;
            case "LIKED_ACTOR":
                const modRel3= [...relActores];
                modRel3[index][prop] = val;
                setRelActores(modRel3);
                break;
            case "LIKED_DIRECTOR":
                const modRel4= [...relDirectores];
                modRel4[index][prop] = val;
                setRelDirectores(modRel4);
                break;
            case "LIKED_GENRE":
                const modRel5= [...relGeneros];
                modRel5[index][prop] = val;
                setRelGeneros(modRel5);
                break;
        
            default:
                break;
        }
    };

    const handleNodesUpdate = (index, prop, value) => {
        let val = value;
        if (!isNaN(val) && !isNaN(parseFloat(val)))
            val = (+val);
        else if (val == 'false')
            val = false;
        else if (val == 'true')
            val = true;
        const modUsuarios = [...usuarios]
        modUsuarios[index][prop] = val
        setUsuarios(modUsuarios)
    };

    const updateUsers = async () => {
        try {
            const response = await axios.patch(`${apiUrl}/usuarios/setNodeProps`, {
                data: usuarios
            });
            alert("Usuarios actualizados")
        } catch (error) {
            console.error('Error al subir cambios:', error);
        }
    }

    const handleRelaciones = () => {
        switch (label) {
            case "AMIGO":
                return [...relAmigos];
            case "WATCHED":
                return [...relVistos];
            case "LIKED_ACTOR":
                return [...relActores];
            case "LIKED_DIRECTOR":
                return [...relDirectores];
            case "LIKED_GENRE":
                return [...relGeneros];
        
            default:
                break;
        }
    }

    const updateRels = async (e) => {
        e.preventDefault();
        const relaciones = handleRelaciones();
        try {
            const response = await axios.patch(`${apiUrl}/usuarios/setRelsProps/${label}`, {
                nombre: showRels.nombre,
                apellido: showRels.apellido,
                data: relaciones
            });
            alert("Relaciones actualzadas")
            setShowRels(null);
        } catch (error) {
            console.error('Error al subir cambios:', error);
        }
    };

    return (
        <div>
            <h1>Usuarios</h1>
            {showRels != null ? (
                <div>
                <button onClick={() => setLabel("AMIGO")}>Amigos</button>
                <button onClick={() => setLabel("WATCHED")}>Vistos</button>
                <button onClick={() => setLabel("LIKED_ACTOR")}>Actores Favoritos</button>
                <button onClick={() => setLabel("LIKED_DIRECTOR")}>Directores Favoritos</button>
                <button onClick={() => setLabel("LIKED_GENRE")}>Generos Favoritos</button>
                <form>
                    <h3>{label}</h3><br/>
                    {label == "AMIGO" ? relAmigos.map((rel, index) => (
                    <div>
                    <h4>Amigo: {rel.nombre} {rel.apellido}</h4>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha == undefined ? "" : rel.fecha} 
                        onChange={(e) => handleRelUpdate(index, "fecha", e.target.value)} />
                    <label>Seguido</label>
                    <input type='text' value={rel.seguido == undefined ? "" : rel.seguido} 
                        onChange={(e) => handleRelUpdate(index, "seguido", e.target.value)} />
                    <label>Amigo</label>
                    <input type='text' value={rel.amigo == undefined ? "" : rel.amigo} 
                        onChange={(e) => handleRelUpdate(index, "amigo", e.target.value)} />
                    </div>
                    )): null}

                    {label == "WATCHED" ? relVistos.map((rel, index) => (
                    <div>
                    <h4>Pelicula: {rel.titulo}</h4>
                    <label>Fecha Visto</label>
                    <input type='text' value={rel.watchedDate == undefined ? "" : rel.watchedDate} 
                        onChange={(e) => handleRelUpdate(index, "watchedDate", e.target.value)} />
                    <label>Rating</label>
                    <input type='text' value={rel.rating == undefined ? "" : rel.rating} 
                        onChange={(e) => handleRelUpdate(index, "rating", e.target.value)} />
                    <label>Favorito</label>
                    <input type='text' value={rel.favorite == undefined ? "" : rel.favorite} 
                        onChange={(e) => handleRelUpdate(index, "favorite", e.target.value)} />
                    </div>
                    )): null}

                    {label == "LIKED_ACTOR" ? relActores.map((rel, index) => (
                    <div>
                    <h4>Actor: {rel.nombre} {rel.apellido}</h4>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha == undefined ? "" : rel.fecha} 
                        onChange={(e) => handleRelUpdate(index, "fecha", e.target.value)} />
                    <label>Calificacion</label>
                    <input type='text' value={rel.calificacion == undefined ? "" : rel.calificacion} 
                        onChange={(e) => handleRelUpdate(index, "calificacion", e.target.value)} />
                    <label>Es publico</label>
                    <input type='text' value={rel.isPublic == undefined ? "" : rel.isPublic} 
                        onChange={(e) => handleRelUpdate(index, "isPublic", e.target.value)} />
                    </div>
                    )): null}

                    {label == "LIKED_DIRECTOR" ? relDirectores.map((rel, index) => (
                    <div>
                    <h4>Director: {rel.nombre} {rel.apellido}</h4>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha == undefined ? "" : rel.fecha} 
                        onChange={(e) => handleRelUpdate(index, "fecha", e.target.value)} />
                    <label>Calificacion</label>
                    <input type='text' value={rel.calificacion == undefined ? "" : rel.calificacion} 
                        onChange={(e) => handleRelUpdate(index, "calificacion", e.target.value)} />
                    <label>Es publico</label>
                    <input type='text' value={rel.isPublic == undefined ? "" : rel.isPublic} 
                        onChange={(e) => handleRelUpdate(index, "isPublic", e.target.value)} />
                    </div>
                    )): null}

                    {label == "LIKED_GENRE" ? relGeneros.map((rel, index) => (
                    <div>
                    <h4>Genero: {rel.nombre} </h4><br/>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha == undefined ? "" : rel.fecha} 
                        onChange={(e) => handleRelUpdate(index, "fecha", e.target.value)} />
                    <label>Preferencia</label>
                    <input type='text' value={rel.preferencia == undefined ? "" : rel.preferencia} 
                        onChange={(e) => handleRelUpdate(index, "preferencia", e.target.value)} />
                    <label>Es publico</label>
                    <input type='text' value={rel.isPublic == undefined ? "" : rel.isPublic} 
                        onChange={(e) => handleRelUpdate(index, "isPublic", e.target.value)} />
                    </div>
                    )): null}
                    <br/>
                    <button type='submit' onClick={updateRels}>Actualizar</button>
                </form>
                </div>
            ) : null}
            <button onClick={handleBackButton} disabled={currentPage === 0}>
                Anterior
            </button>
            <button onClick={handleNextButton}>
                Siguiente
            </button>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Género</th>
                        <th>Pais</th>
                        <th>Preferencias</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>
                                <input type='text' value={usuario.nombre} 
                                onChange={(e) => handleNodesUpdate(index, "nombre", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.apellido} 
                                onChange={(e) => handleNodesUpdate(index, "apellido", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.edad} 
                                onChange={(e) => handleNodesUpdate(index, "edad", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.genero} 
                                onChange={(e) => handleNodesUpdate(index, "genero", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.pais} 
                                onChange={(e) => handleNodesUpdate(index, "pais", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.preferencias} 
                                onChange={(e) => handleNodesUpdate(index, "preferencias", e.target.value)}/>
                            </td>
                            <td>
                                <button onClick={() => setShowRels(usuario)}>
                                    Mostrar Relaciones</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={updateUsers}>
                Subir cambios</button>
        </div>
    );
};

export default Usuarios;