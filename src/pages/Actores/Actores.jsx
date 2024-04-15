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
    const [showCrearActorInputs, setShowCrearActorInputs] = useState(false);
    const [nuevoActor, setNuevoActor] = useState({
        nombre: '',
        apellido: '',
        yearBorn: '',
        nacionalidad: '',
        premios: ''
    });

    // Definir la función fetchActores fuera de useEffect
    const fetchActores = async () => {
        try {
            const response = await axios.get(`${apiUrl}/actores/info`);
            setActores(response.data);
        } catch (error) {
            console.error('Error al cargar actores:', error);
        }
    };

    useEffect(() => {
        fetchActores(); // Llamar a fetchActores cuando cambia apiUrl
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
            const updatedActores = actores.filter(
                (actor) => actor.nombre !== nombreActorAEliminar || actor.apellido !== apellidoActorAEliminar
            );
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoActor({ ...nuevoActor, [name]: value });
    };

    const handleCrearNuevoActor = async () => {
        try {
            const response = await axios.post(`${apiUrl}/actores/create_node_with_properties`, {
                label: 'Actor',
                properties: nuevoActor
            });
            console.log(response.data); // Mensaje de confirmación de creación

            // Mostrar alerta de éxito
            alert('¡Actor creado exitosamente!');

            // Limpiar los campos de entrada y ocultar los inputs
            setNuevoActor({
                nombre: '',
                apellido: '',
                yearBorn: '',
                nacionalidad: '',
                premios: ''
            });
            setShowCrearActorInputs(false);

            // Actualizar la lista de actores después de la creación
            fetchActores();
        } catch (error) {
            console.error('Error al crear el actor:', error);

            // Mostrar alerta de error
            alert('Error al crear el actor. Por favor, inténtalo de nuevo.');
        }
    };

    const handleButton1Click = () => {
        setShowCrearActorInputs(true);
    };

    const handleButton4Click = () => {
        setShowEliminarInput(true); // Mostrar input y botón de eliminación
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

                {/* Mostrar inputs para crear un nuevo actor si showCrearActorInputs es true */}
                {showCrearActorInputs && (
                    <div>
                        <input
                            type="text"
                            name="nombre"
                            value={nuevoActor.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre del actor"
                        />
                        <input
                            type="text"
                            name="apellido"
                            value={nuevoActor.apellido}
                            onChange={handleInputChange}
                            placeholder="Apellido del actor"
                        />
                        <input
                            type="text"
                            name="yearBorn"
                            value={nuevoActor.yearBorn}
                            onChange={handleInputChange}
                            placeholder="Año de nacimiento"
                        />
                        <input
                            type="text"
                            name="nacionalidad"
                            value={nuevoActor.nacionalidad}
                            onChange={handleInputChange}
                            placeholder="Nacionalidad"
                        />
                        <input
                            type="text"
                            name="premios"
                            value={nuevoActor.premios}
                            onChange={handleInputChange}
                            placeholder="Premios"
                        />
                        <button onClick={handleCrearNuevoActor}>Crear</button>
                    </div>
                )}

                {/* Botones adicionales */}
                <div>
                    <button onClick={handleButton1Click}>Crear nodo con 1 label</button>
                    <button onClick={handleButton4Click}>Eliminar 1 nodo</button>
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
