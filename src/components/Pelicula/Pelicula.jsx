import estilos from './Pelicula.module.css'

import PropTypes from 'prop-types';

const Pelicula = ({ clasificacion, duracion, sinopsis, titulo, year }) => {

    const click = () => {
        console.log("click")
    }

    return (
        <div className={estilos.wrapper}>
            <div className={estilos.card} onClick={click}>
                <img src={"https://w7.pngwing.com/pngs/650/454/png-transparent-clapperboard-icon-scalable-graphics-clapperboard-angle-white-text-thumbnail.png"} alt="" />
                <div className={estilos.intro}>
                    <div className={estilos.name}>{titulo}</div>
                    <p>Sinopsis: {sinopsis}</p>
                    <p>Año: {year}</p>
                    <p>Duración: {duracion}</p>
                    <p>Clasificación: {clasificacion}</p>
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
};

export default Pelicula;
