import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import replaceSound from '../../assets/sounds/Enter.wav'; // Importa el sonido

const BackgroundReplaceButtons = ({ buttonImage1, buttonImage2, onBackgroundReplace }) => {
  const audioRef = useRef(null); // Referencia para el audio de reemplazo

  const handleBackgroundReplace = () => {
    onBackgroundReplace();
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia el audio
      audioRef.current.play().catch(error => {
        console.error('Error attempting to play sound', error);
      });
    }
  };

  return (
    <div className="background-replace-buttons">
      <div className="replace-button" onClick={handleBackgroundReplace}>
        <img
          src={buttonImage1}
          alt="Reemplazar Fondo 1"
          className="replace-button-image"
        />
      </div>
      <div className="replace-button" onClick={handleBackgroundReplace}>
        <img
          src={buttonImage2}
          alt="Reemplazar Fondo 2"
          className="replace-button-image"
        />
      </div>
      <audio ref={audioRef} src={replaceSound} /> {/* Elemento de audio para el sonido de reemplazo */}
    </div>
  );
};

BackgroundReplaceButtons.propTypes = {
  buttonImage1: PropTypes.string.isRequired,
  buttonImage2: PropTypes.string.isRequired,
  onBackgroundReplace: PropTypes.func.isRequired,
};

export default BackgroundReplaceButtons;