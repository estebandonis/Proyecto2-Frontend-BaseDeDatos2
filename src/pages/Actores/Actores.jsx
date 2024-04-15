import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from "@hooks";
import styles from './Actores.module.css';

const Actores = () => {
    const { apiUrl } = useApi();
    const [actores, setActores] = useState([]);

    useEffect(() => {
        const fetchActores = async () => {
            try {
                const response = await axios.get(`${apiUrl}/actores/info`);
                setActores(response.data);
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

    const handleButton3Click = () => {
        // Lógica para el botón 3
        console.log('Botón 3 clickeado');
    };

    const handleButton4Click = () => {
        // Lógica para el botón 4
        console.log('Botón 4 clickeado');
    };

    const handleButton5Click = () => {
        // Lógica para el botón 5
        console.log('Botón 5 clickeado');
    };

    const handleButton6Click = () => {
        // Lógica para el botón 6
        console.log('Botón 6 clickeado');
    };

    const handleButton7Click = () => {
        // Lógica para el botón 7
        console.log('Botón 7 clickeado');
    };

    return (
        <div>
            <h1>Actores</h1>
            <div>
                {/* Botones */}
                <button onClick={handleButton1Click}>Crear nodo con 1 label</button>
                <button onClick={handleButton2Click}>Crear nodo con 2+ labels</button>
                <button onClick={handleButton3Click}>Crear nodo con propiedades</button>
                <button onClick={handleButton4Click}>Eliminar 1 nodo</button>
                <button onClick={handleButton5Click}>Eliminar multiples nodos</button>
                <button onClick={handleButton6Click}>Eliminar 1 relación</button>
                <button onClick={handleButton7Click}>Eliminar multiples relaciones</button>
            </div>
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
