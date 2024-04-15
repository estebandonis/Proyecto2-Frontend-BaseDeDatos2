import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from "@hooks";
import styles from './Usuarios.module.css';

const Usuarios = () => {
    const { apiUrl } = useApi();
    const [usuarios, setUsuarios] = useState([]);
    const [updateNodes, setUpdateNodes] = useState([]);
    const [updateRels, setUpdateRels] = useState({});
    const [showRels, setShowRels] = useState(null);

    useEffect(() => {
        const fetchActores = async () => {
            try {
                const response = await axios.get(`${apiUrl}/usuarios/info`);
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al cargar actores:', error);
            }
        };

        fetchActores();
    }, [apiUrl]);

    const handleRelUpdate = (label, prop, index, value) => {
        // Lógica para el botón 1
        console.log('Botón 1 clickeado');
    };

    const handleNodesUpdate = () => {
        // Lógica para el botón 2
        console.log('Botón 2 clickeado');
    };


    return (
        <div>
            <h1>Usuarios</h1>
            {showRels != null ? (
                <form>
                    <label>AMIGO</label><br/>
                    {updateRels["AMIGO"].map((rel, index) => (
                    <div>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha} 
                        onChange={(e) => handleRelUpdate("AMIGO", "fecha", index, e.target.value)} />
                    <label>Seguido</label>
                    <input type='text' value={rel.seguido.toString} 
                        onChange={(e) => handleRelUpdate("AMIGO", "seguido", index, e.target.value)} />
                    <label>Amigo</label>
                    <input type='text' value={rel.amigo.toString} 
                        onChange={(e) => handleRelUpdate("AMIGO", "amigo", index, e.target.value)} />
                    </div>
                    ))}
                    <label>WATCHED</label><br/>
                    {updateRels["WATCHED"].map((rel, index) => (
                    <div>
                    <label>FechaVisto</label>
                    <input type='text' value={rel.watchedDate} 
                        onChange={(e) => handleRelUpdate("WATCHED", "watchedDate", index, e.target.value)} />
                    <label>Rating</label>
                    <input type='text' value={rel.rating} 
                        onChange={(e) => handleRelUpdate("WATCHED", "rating", index, e.target.value)} />
                    <label>Favorito</label>
                    <input type='text' value={rel.favorite.toString()} 
                        onChange={(e) => handleRelUpdate("WATCHED", "favorite", index, e.target.value)} />
                    </div>
                    ))}

                    <label>LIKED_ACTOR</label><br/>
                    {updateRels["LIKED_ACTOR"].map((rel, index) => (
                    <div>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha} 
                        onChange={(e) => handleRelUpdate("LIKED_ACTOR", "fecha", index, e.target.value)} />
                    <label>Calificacion</label>
                    <input type='text' value={rel.seguido} 
                        onChange={(e) => handleRelUpdate("LIKED_ACTOR", "calificacion", index, e.target.value)} />
                    <label>Es publico</label>
                    <input type='text' value={rel.isPublic} 
                        onChange={(e) => handleRelUpdate("LIKED_ACTOR", "isPublic", index, e.target.value)} />
                    </div>
                    ))}

                    <label>LIKED_DIRECTOR</label><br/>
                    {updateRels["LIKED_DIRECTOR"].map((rel, index) => (
                    <div>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha} 
                        onChange={(e) => handleRelUpdate("LIKED_DIRECTOR", "fecha", index, e.target.value)} />
                    <label>Calificacion</label>
                    <input type='text' value={rel.seguido} 
                        onChange={(e) => handleRelUpdate("LIKED_DIRECTOR", "calificacion", index, e.target.value)} />
                    <label>Es publico</label>
                    <input type='text' value={rel.isPublic} 
                        onChange={(e) => handleRelUpdate("LIKED_DIRECTOR", "isPublic", index, e.target.value)} />
                    </div>
                    ))}

                    <label>LIKED_GENRE</label><br/>
                    {updateRels["LIKED_GENRE"].map((rel, index) => (
                    <div>
                    <label>Fecha</label>
                    <input type='text' value={rel.fecha} 
                        onChange={(e) => handleRelUpdate("LIKED_GENRE", "fecha", index, e.target.value)} />
                    <label>Preferencia</label>
                    <input type='text' value={rel.seguido} 
                        onChange={(e) => handleRelUpdate("LIKED_GENRE", "preferencia", index, e.target.value)} />
                    <label>Es publico</label>
                    <input type='text' value={rel.isPublic} 
                        onChange={(e) => handleRelUpdate("LIKED_GENRE", "isPublic", index, e.target.value)} />
                    </div>
                    ))}
                </form>
            ) : null}
            
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
                                onChange={(e) => handleNodesUpdate(usuario, "nombre", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.apellido} 
                                onChange={(e) => handleNodesUpdate(usuario, "apellido", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.edad} 
                                onChange={(e) => handleNodesUpdate(usuario, "edad", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.genero} 
                                onChange={(e) => handleNodesUpdate(usuario, "genero", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.pais} 
                                onChange={(e) => handleNodesUpdate(usuario, "pais", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.preferencias} 
                                onChange={(e) => handleNodesUpdate(usuario, "preferencias", e.target.value)}/>
                            </td>
                            <td>
                                <button onClick={async () => updateUsers(updateNodes)}>
                                    Subir cambios</button>
                                <button onClick={async () => setShowRels(usuario)}>
                                    Mostrar Relaciones</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;