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
import backSound from '../../assets/sounds/Exit.wav'; // Importa el sonido de retroceso
import iconImage from '../../assets/icons/html.png'; // Importa el icono
import iconImage2 from '../../assets/icons/CSS.png'; // Importa el icono
import iconImage3 from '../../assets/icons/javascript.png'; // Importa el icono
import iconImage4 from '../../assets/icons/nodeJS.png'; // Importa el icono
import iconImage5 from '../../assets/icons/react.png'; // Importa el icono
import iconImage6 from '../../assets/icons/mongoDB.png'; // Importa el icono
import PropTypes from 'prop-types';

const MediaContent = ({ handleImageClick }) => {
  const [isReplaced, setIsReplaced] = useState(false);
  const [isBackgroundReplaced, setIsBackgroundReplaced] = useState(false);
  const [isFinalReplaced, setIsFinalReplaced] = useState(false); // Nuevo estado para las imágenes finales
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false); // Nuevo estado para el botón de retroceso
  const [isReplaceButtonVisible, setIsReplaceButtonVisible] = useState(true); // Estado para controlar la visibilidad del botón de reemplazo
  const videoRef = useRef(null);
  const audioRef = useRef(null); // Referencia para el audio de reemplazo
  const clickAudioRef = useRef(null); // Referencia para el audio de clic
  const backAudioRef = useRef(null); // Referencia para el audio de retroceso

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
    setIsReplaceButtonVisible(false); // Oculta el botón de reemplazo
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
    setIsReplaceButtonVisible(true); // Muestra el botón de reemplazo
    if (backAudioRef.current) {
      backAudioRef.current.currentTime = 0; // Reinicia el audio
      backAudioRef.current.play().catch(error => {
        console.error('Error attempting to play sound', error);
      });
    }
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
          <div className="background-text">Habilidades</div>
          <div className="additional-texts">
            <div className="text-with-icon" id='arriba'>
              <img src={iconImage} alt="Icon" className="icon"  />
              <div className="text">HTML</div>
            </div>
            <div className="text-with-icon" id='arriba'>
              <img src={iconImage2} alt="Icon" className="icon" />
              <div className="text">CSS</div>
            </div>
            <div className="text-with-icon" id='arriba'>
              <img src={iconImage3} alt="Icon" className="icon" />
              <div className="text">JavaScript</div>
            </div>
            <div className="text-with-icon" id='abajo'>
              <img src={iconImage4} alt="Icon" className="icon" />
              <div className="text">Node Js</div>
            </div>
            <div className="text-with-icon" id='abajo'>
              <img src={iconImage5} alt="Icon" className="icon" />
              <div className="text">React Framework</div>
            </div>
            <div className="text-with-icon" id='abajo'>
              <img src={iconImage6} alt="Icon" className="icon" />
              <div className="text">mongoDB</div>
            </div>
          </div>
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
          {isReplaceButtonVisible && (
            <div className="replace-button" onClick={handleBackgroundReplace}>
              <img
                src={buttonImage}
                alt="Reemplazar Imágenes"
                className="replace-button-image"
              />
              <div className="replace-button-text">Habilidades</div> {/* Añade el texto */}
            </div>
          )}
          {isBackButtonVisible && (
            <img
              src={backButtonImage}
              alt="Retroceder"
              onClick={handleBackButtonClick}
              className="back-button"
            />
          )}
          <audio ref={audioRef} src={replaceSound} /> {/* Elemento de audio para el sonido de reemplazo */}
          <audio ref={backAudioRef} src={backSound} /> {/* Elemento de audio para el sonido de retroceso */}
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
};

export default MediaContent;