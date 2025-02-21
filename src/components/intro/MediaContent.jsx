import { useState, useRef } from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import middleImage from '../../assets/layout/advertising.png';
import newImage from '../../assets/images/Pantalla_de_abajo.png'; // Nueva imagen para reemplazo
import newVideoImage from '../../assets/images/pantalla_de_arriba.png'; // Nueva imagen para reemplazo del video
import introVideo from '../../assets/intro/introDS.mp4'; // Importa el video
import buttonImage from '../../assets/icons/skill_button.png'; // Imagen del botón
import backButtonImage from '../../assets/images/quit_button.png'; // Imagen del botón de retroceso
import replaceSound from '../../assets/sounds/Enter.wav'; // Importa el sonido
import clickSound from '../../assets/sounds/Tap_Sound.wav'; // Importa el sonido de clic
import backgroundImage from '../../assets/Background_Image/background_image.png'; // Importa la imagen de fondo
import PropTypes from 'prop-types';

const MediaContent = ({ handleImageClick }) => {
  const [isReplaced, setIsReplaced] = useState(false);
  const [isBackgroundReplaced, setIsBackgroundReplaced] = useState(false);
  const [isFinalReplaced, setIsFinalReplaced] = useState(false); // Nuevo estado para las imágenes finales
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false); // Nuevo estado para el botón de retroceso
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
    setIsBackButtonVisible(true); // Muestra el botón de retroceso
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia el audio
      audioRef.current.play().catch(error => {
        console.error('Error attempting to play sound', error);
      });
    }
  };

  const handleBackButtonClick = () => {
    setIsReplaced(true); // Muestra las imágenes de reemplazo
    setIsBackgroundReplaced(false); // Oculta la imagen de fondo reemplazada
    setIsFinalReplaced(false); // Restablece el estado de las imágenes finales
    setIsBackButtonVisible(false); // Oculta el botón de retroceso
  };

  return (
    <>
      {isBackgroundReplaced && (
        <>
          <img
            src={backgroundImage}
            alt="Background"
            className="background-image"
          />
          <div className="background-text">Java</div> {/* Añade el texto */}
          <div className='background-text2'></div>
        </>
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
            src={isFinalReplaced ? 'ruta/a/nuevaImagenVideoFinal.png' : newVideoImage} // Nueva imagen final del video
            alt="Replaced Video"
            className="replaced-video-image"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()} // Prevenir clic derecho
          />
          <div className="replace-button" onClick={handleBackgroundReplace}>
            <img
              src={buttonImage}
              alt="Reemplazar Imágenes"
              className="replace-button-image"
            />
            <div className="replace-button-text">Habilidades</div> {/* Añade el texto */}
          </div>
          {isBackButtonVisible && (
            <img
              src={backButtonImage}
              alt="Retroceder"
              onClick={handleBackButtonClick}
              className="back-button"
            />
          )}
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