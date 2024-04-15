import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from "@hooks";
import styles from './Usuarios.module.css';

const Usuarios = () => {
    const { apiUrl } = useApi();
    const [usuarios, setUsuarios] = useState([]);
    const [updateForms, setUpdateForms] = useState([]);
    const [showRels, setShowRels] = useState(null);

    useEffect(() => {
        const fetchActores = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/info`);
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al cargar actores:', error);
            }
        };

        fetchActores();
    }, [apiUrl]);

    const handleButton1Click = () => {
        // Lógica para el botón 1
        console.log('Botón 1 clickeado');
    };

    const handleButton2Click = () => {
        // Lógica para el botón 2
        console.log('Botón 2 clickeado');
    };


    return (
        <div>
            <h1>Usuarios</h1>
            <div>
                {/* Botones */}
                <button onClick={handleButton1Click}>Gestionar propiedades de usuarios</button>
                <button onClick={handleButton2Click}>Gestionar propiedades de relaciones</button>
            </div>
            {showRels != null ? (
                <form>
                    <label>AMIGO</label><br/>

                    <label>WATCHED</label><br/>

                    <label>LIKED_ACTOR</label><br/>

                    <label>LIKED_DIRECTOR</label><br/>

                    <label>LIKED_GENRE</label><br/>

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
                                onChange={(e) => handleFormNode(usuario, "nombre", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.apellido} 
                                onChange={(e) => handleFormNode(usuario, "apellido", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.edad} 
                                onChange={(e) => handleFormNode(usuario, "edad", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.genero} 
                                onChange={(e) => handleFormNode(usuario, "genero", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.pais} 
                                onChange={(e) => handleFormNode(usuario, "pais", e.target.value)}/>
                            </td>
                            <td>
                                <input type='text' value={usuario.preferencias} 
                                onChange={(e) => handleFormNode(usuario, "preferencias", e.target.value)}/>
                            </td>
                            <td>
                                <button onClick={async () => updateUsers(updateForms)}>
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