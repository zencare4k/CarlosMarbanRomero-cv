import { useState, useRef } from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import middleImage from '../../assets/layout/advertising.png';
import newImage from '../../assets/images/Pantalla_de_abajo.png'; // Nueva imagen para reemplazo
import newVideoImage from '../../assets/images/pantalla_de_arriba.png'; // Nueva imagen para reemplazo del video
import introVideo from '../../assets/intro/introDS.mp4'; // Importa el video
import buttonImage from '../../assets/icons/skill_button.png'; // Imagen del botón
import replaceSound from '../../assets/sounds/Enter.wav'; // Importa el sonido
import clickSound from '../../assets/sounds/Tap_Sound.wav'; // Importa el sonido de clic
import backgroundImage from '../../assets/Background_Image/background_image.png'; // Importa la imagen de fondo
import PropTypes from 'prop-types';

const MediaContent = ({ handleImageClick, isInitialImageVisible }) => {
  const [isReplaced, setIsReplaced] = useState(false);
  const [isBackgroundReplaced, setIsBackgroundReplaced] = useState(false);
  const [isFinalReplaced, setIsFinalReplaced] = useState(false); // Nuevo estado para las imágenes finales
  const videoRef = useRef(null);
  const audioRef = useRef(null); // Referencia para el audio de reemplazo
  const clickAudioRef = useRef(null); // Referencia para el audio de clic

  const handleClick = () => {
    if (!isReplaced) {
      setIsReplaced(true);
      handleImageClick();
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0; // Reinicia el audio
        clickAudioRef.current.play().catch(error => {
          console.error('Error attempting to play sound', error);
        });
      }
    }
  };

  const handleBackgroundReplace = () => {
    setIsBackgroundReplaced(true);
    setIsFinalReplaced(true); // Actualiza el estado para las imágenes finales
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia el audio
      audioRef.current.play().catch(error => {
        console.error('Error attempting to play sound', error);
      });
    }
  };

  return (
    <>
      {isBackgroundReplaced && (
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
      )}
      {isReplaced ? (
        <>
          <img
            src={isFinalReplaced ? 'ruta/a/nuevaImagenFinal.png' : newImage} // Nueva imagen final
            alt="Replaced"
            className="replaced-image"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()} // Prevenir clic derecho
          />
         
          <img
            src={buttonImage}
            alt="Reemplazar Imágenes"
            onClick={handleBackgroundReplace}
            className="replace-button"
          />
          <audio ref={audioRef} src={replaceSound} /> {/* Elemento de audio para el sonido de reemplazo */}
        </>
      ) : (
        <>
          <img
            src={previewImage}
            alt="Preview"
            className="preview-image"
            onClick={handleClick}
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()} // Prevenir clic derecho
          />
          <video
            ref={videoRef}
            src={introVideo}
            autoPlay
            muted={true} // Asegúrate de que el video esté siempre muteado
            className="background-video"
            onEnded={() => videoRef.current.pause()}
          />
          <img
            src={middleImage}
            alt="Middle"
            className="middle-image"
            onClick={handleClick}
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()} // Prevenir clic derecho
          />
        </>
      )}
      <img
        src={layoutImage}
        alt="Layout"
        className="layout-image"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()} // Prevenir clic derecho
      />
      <audio ref={clickAudioRef} src={clickSound} /> {/* Elemento de audio para el sonido de clic */}
    </>
  );
};

MediaContent.propTypes = {
  handleImageClick: PropTypes.func.isRequired,
  isInitialImageVisible: PropTypes.bool.isRequired,
};

export default MediaContent;