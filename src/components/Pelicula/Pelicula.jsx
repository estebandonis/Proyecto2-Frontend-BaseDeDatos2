import estilos from './Pelicula.module.css'

import PropTypes from 'prop-types';

const Pelicula = ({ clasificacion, duracion, sinopsis, titulo, year }) => {

    return (
            <div className={estilos.styles}>
                <p>{clasificacion}</p>
                <p>{duracion}</p>
                <p>{sinopsis}</p>
                <p>{titulo}</p>
                <p>{year}</p>
            </div>
    );
};

Pelicula.propTypes = {
    clasificacion: PropTypes.string.isRequired,
    duracion: PropTypes.number.isRequired,
    sinopsis: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
};

export default Pelicula;
