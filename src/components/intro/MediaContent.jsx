import React from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import introVideo from '../../assets/intro/introDS.mp4';
import middleImage from '../../assets/layout/advertising.png'; // Nueva imagen

const MediaContent = ({ handleImageClick, videoRef }) => {
  return (
    <>
      <img src={previewImage} alt="Preview" className="preview-image" onClick={handleImageClick} />
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted={true} // Asegúrate de que el video esté siempre muteado
        className="background-video"
        onEnded={() => videoRef.current.pause()}
      />
      <img src={middleImage} alt="Middle" className="middle-image" onClick={handleImageClick} /> {/* Nueva imagen */}
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

export default MediaContent;