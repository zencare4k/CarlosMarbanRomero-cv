import { useState, useRef } from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import middleImage from '../../assets/layout/advertising.png';
import newImage from '../../assets/images/Pantalla_de_abajo.png'; // Nueva imagen para reemplazo
import newVideoImage from '../../assets/images/pantalla_de_arriba.png'; // Nueva imagen para reemplazo del video
import introVideo from '../../assets/intro/introDS.mp4'; // Importa el video
import PropTypes from 'prop-types';

const MediaContent = ({ handleImageClick }) => {
  const [isReplaced, setIsReplaced] = useState(false);
  const videoRef = useRef(null);

  const handleClick = () => {
    setIsReplaced(true);
    handleImageClick();
  };

  return (
    <>
      {isReplaced ? (
        <>
          <img
            src={newImage}
            alt="Replaced"
            className="replaced-image"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()} // Prevenir clic derecho
          />
          <img
            src={newVideoImage}
            alt="Replaced Video"
            className="replaced-video-image"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()} // Prevenir clic derecho
          />
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
    </>
  );
};

MediaContent.propTypes = {
  handleImageClick: PropTypes.func.isRequired,
};

export default MediaContent;