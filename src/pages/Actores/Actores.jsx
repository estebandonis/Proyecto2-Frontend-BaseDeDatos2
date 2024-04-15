import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from '@hooks';
import styles from './Actores.module.css';

const Actores = () => {
    const { apiUrl } = useApi();
    const [actores, setActores] = useState([]);
    const [nombreActorAEliminar, setNombreActorAEliminar] = useState('');
    const [apellidoActorAEliminar, setApellidoActorAEliminar] = useState('');
    const [showEliminarInput, setShowEliminarInput] = useState(false);

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

    const handleEliminarActor = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/actores/delete_node_by_name_and_lastname`, {
                data: {
                    label: 'Actor', // Etiqueta del nodo actor
                    name: nombreActorAEliminar, // Nombre del actor a eliminar
                    lastname: apellidoActorAEliminar // Apellido del actor a eliminar
                }
            });
            console.log(response.data); // Mensaje de confirmación de eliminación
    
            // Mostrar alerta de éxito
            alert(`Se eliminó el actor ${nombreActorAEliminar} ${apellidoActorAEliminar}`);
    
            // Actualizar la lista de actores después de eliminar el nodo
            const updatedActores = actores.filter(actor => actor.nombre !== nombreActorAEliminar || actor.apellido !== apellidoActorAEliminar);
            setActores(updatedActores);
    
            // Limpiar el campo de entrada y ocultar el input
            setNombreActorAEliminar('');
            setApellidoActorAEliminar('');
            setShowEliminarInput(false);
        } catch (error) {
            console.error('Error al eliminar actor:', error);
    
            // Mostrar alerta de error
            alert(`Error al eliminar el actor ${nombreActorAEliminar} ${apellidoActorAEliminar}`);
        }
    };
    
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
        setShowEliminarInput(true); // Mostrar input y botón de eliminación
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
                {/* Mostrar input y botón de eliminación si showEliminarInput es true */}
                {showEliminarInput && (
                    <div>
                        <input
                            type="text"
                            value={nombreActorAEliminar}
                            onChange={(e) => setNombreActorAEliminar(e.target.value)}
                            placeholder="Nombre del actor a eliminar"
                        />
                        <input
                            type="text"
                            value={apellidoActorAEliminar}
                            onChange={(e) => setApellidoActorAEliminar(e.target.value)}
                            placeholder="Apellido del actor a eliminar"
                        />
                        <button onClick={handleEliminarActor}>Eliminar</button>
                    </div>
                )}

                {/* Botones adicionales */}
                <div>
                    <button onClick={handleButton1Click}>Crear nodo con 1 label</button>
                    <button onClick={handleButton2Click}>Crear nodo con 2+ labels</button>
                    <button onClick={handleButton3Click}>Crear nodo con propiedades</button>
                    <button onClick={handleButton4Click}>Eliminar 1 nodo</button>
                    <button onClick={handleButton5Click}>Eliminar multiples nodos</button>
                    <button onClick={handleButton6Click}>Eliminar 1 relación</button>
                    <button onClick={handleButton7Click}>Eliminar multiples relaciones</button>
                </div>
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
