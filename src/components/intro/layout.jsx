import React, { useRef, useEffect, useContext, useState } from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import introVideo from '../../assets/intro/introDS.mp4';
import middleImage from '../../assets/layout/advertising.png'; // Nueva imagen
import clickSound from '../../assets/sounds/Tap_Sound.wav'; // Importa el sonido
import { AudioContext } from '../../context/AudioContext'; // Importa el contexto
import '../../styles/layout.css';

const Layout = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null); // Referencia para el audio
  const { isAudioEnabled, toggleAudio } = useContext(AudioContext); // Usa el contexto
  const [hasUnmuted, setHasUnmuted] = useState(false); // Estado para controlar si ya se ha desmuteado

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

  useEffect(() => {
    if (!hasUnmuted) {
      const timer = setTimeout(() => {
        toggleAudio(); // Desmutea automáticamente después de 1 segundo
        setHasUnmuted(true); // Marca que ya se ha desmuteado
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasUnmuted, toggleAudio]);

  const handleImageClick = () => {
    const audioElement = audioRef.current; // Obtén el elemento de audio
    if (audioElement) {
      audioElement.currentTime = 0; // Reinicia el audio
      audioElement.play().catch(error => {
        console.error('Error attempting to play sound', error);
      });
    }
  };

  return (
    <div className="layout-container">
      <img src={previewImage} alt="Preview" className="preview-image" onClick={handleImageClick} />
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted={!isAudioEnabled}
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
      <audio ref={audioRef} src={clickSound} /> {/* Elemento de audio */}
    </div>
  );
};

export default Layout;