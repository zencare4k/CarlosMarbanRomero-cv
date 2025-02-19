import React, { useRef, useEffect } from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import introVideo from '../../assets/intro/introDS.mp4';
import middleImage from '../../assets/layout/advertising.png'; // Nueva imagen
import '../../styles/layout.css';

const Layout = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current.currentTime >= 3) {
        videoRef.current.pause();
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const handleClick = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = false;
      videoElement.play().catch(error => {
        console.error('Error attempting to play', error);
      });
    }
  };

  return (
    <div className="layout-container" onClick={handleClick}>
      <img src={previewImage} alt="Preview" className="preview-image" />
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted
        className="background-video"
        onEnded={() => videoRef.current.pause()}
      />
      <img src={middleImage} alt="Middle" className="middle-image" /> {/* Nueva imagen */}
      <img src={layoutImage} alt="Layout" className="layout-image" />
    </div>
  );
};

export default Layout;