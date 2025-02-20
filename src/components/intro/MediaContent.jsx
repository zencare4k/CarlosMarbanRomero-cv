import { useState } from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import introVideo from '../../assets/intro/introDS.mp4';
import middleImage from '../../assets/layout/advertising.png'; // Nueva imagen
import newPreviewImage from '../../assets/images/pantalla_de_abajo.png'; // Nueva imagen para reemplazo
import newMiddleImage from '../../assets/images/pantalla_de_arriba.png'; // Nueva imagen para reemplazo
import PropTypes from 'prop-types';

const MediaContent = ({ handleImageClick, videoRef }) => {
  const [isPreviewImageReplaced, setIsPreviewImageReplaced] = useState(false);
  const [isMiddleImageReplaced, setIsMiddleImageReplaced] = useState(false);

  const handlePreviewImageClick = () => {
    setIsPreviewImageReplaced(true);
    handleImageClick();
  };

  const handleMiddleImageClick = () => {
    setIsMiddleImageReplaced(true);
    handleImageClick();
  };

  return (
    <>
      <img
        src={isPreviewImageReplaced ? newPreviewImage : previewImage}
        alt="Preview"
        className="preview-image"
        onClick={handlePreviewImageClick}
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
        src={isMiddleImageReplaced ? newMiddleImage : middleImage}
        alt="Middle"
        className="middle-image"
        onClick={handleMiddleImageClick}
      />
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
  videoRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired,
};

export default MediaContent;