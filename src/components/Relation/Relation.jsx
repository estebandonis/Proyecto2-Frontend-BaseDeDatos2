import estilos from './Relation.module.css'

import PropTypes from 'prop-types';

const Relation = ({ diferenciaTime, orden, esContinuacion }) => {

    return (
        <div className={estilos.wrapper}>
            <div className={estilos.caption}>
                <h3>SECUELA DE</h3>
                <p>Diferencia Tiempo: {diferenciaTime} min</p>
                <p>Orden: {orden.toString()}</p>
                <p>Es continuación: {esContinuacion.toString()}</p>
            </div>
            <div className={estilos.card}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Arrow_png_image.png/1024px-Arrow_png_image.png" alt="" />
            </div>
        </div>
    );
};

Relation.propTypes = {
    diferenciaTime: PropTypes.number.isRequired,
    orden: PropTypes.bool.isRequired,
    esContinuacion: PropTypes.bool.isRequired,
};

export default Relation;
