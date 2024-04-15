import estilos from './Pelicula.module.css'

import PropTypes from 'prop-types';

const Pelicula = ({ clasificacion, duracion, sinopsis, titulo, year, averRating, genero, directorName, directorApellido, actorName, actorApellido }) => {

    return (
        <div className={estilos.wrapper}>
            <div className={estilos.card}>
                <img src={"https://w7.pngwing.com/pngs/650/454/png-transparent-clapperboard-icon-scalable-graphics-clapperboard-angle-white-text-thumbnail.png"} alt="" />
                <div className={estilos.intro}>
                    <div className={estilos.name}>{titulo}</div>
                    <p>Sinopsis: {sinopsis}</p>
                    <p>Año: {year}</p>
                    <p>Duración: {duracion} min</p>
                    <p>Clasificación: {clasificacion}</p>
                    {averRating === undefined ? 
                    null : <p>Rating: {averRating.toFixed(2)}</p>}
                    {genero === undefined ?
                    null : <p>Genero: {genero}</p>}
                    {directorName === undefined ?
                    null : <p>Director: {directorName} {directorApellido}</p>}
                    {actorName === undefined ?
                    null : <p>Actor Principal: {actorName} {actorApellido}</p>}
                </div>
            </div>
        </div>
    );
};

Pelicula.propTypes = {
    clasificacion: PropTypes.string.isRequired,
    duracion: PropTypes.number.isRequired,
    sinopsis: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    averRating: PropTypes.number,
    genero: PropTypes.string,
    directorName: PropTypes.string,
    directorApellido: PropTypes.string,
    actorName: PropTypes.string,
    actorApellido: PropTypes.string
};

export default Pelicula;
