import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from "@hooks";
import styles from './Actores.module.css';

const Actores = () => {
    const { apiUrl } = useApi();
    const [actores, setActores] = useState([]);

    useEffect(() => {
        // Función para cargar actores desde el backend
        const fetchActores = async () => {
            try {
                const response = await axios.get(`${apiUrl}/actores/info`);
                setActores(response.data); // Establecer actores en el estado con los datos recibidos
            } catch (error) {
                console.error('Error al cargar actores:', error);
            }
        };

        fetchActores(); // Llamar a la función para cargar actores al cargar el componente
    }, [apiUrl]);

    return (
        <div>
            <h1>Actores</h1>
            <table className={styles.actorTable}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Año de nacimiento</th>
                        <th>Nacionalidad</th>
                        <th>Premios</th>
                    </tr>
                </thead>
                <tbody>
                    {actores.map((actor, index) => (
                        <tr key={index}>
                            <td>{actor.nombre}</td>
                            <td>{actor.apellido}</td>
                            <td>{actor.yearBorn}</td>
                            <td>{actor.nacionalidad}</td>
                            <td>{actor.premios}</td>  
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Actores;
