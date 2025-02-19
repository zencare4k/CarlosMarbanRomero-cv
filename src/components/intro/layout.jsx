import React, { useRef, useEffect, useContext, useState } from 'react';
import layoutImage from '../../assets/layout/layout.png';
import previewImage from '../../assets/layout/preview.png';
import introVideo from '../../assets/intro/introDS.mp4';
import middleImage from '../../assets/layout/advertising.png'; // Nueva imagen
import clickSound from '../../assets/sounds/Tap_Sound.wav'; // Importa el sonido
import backgroundMusic from '../../assets/sounds/Startup_1.wav'; // Importa la música de fondo
import carcasaImage from '../../assets/images/carcasa.jpg'; // Importa la imagen inicial
import { AudioContext } from '../../context/AudioContext'; // Importa el contexto
import '../../styles/layout.css';

const Layout = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null); // Referencia para el audio de clic
  const backgroundAudioRef = useRef(null); // Referencia para el audio de fondo
  const { isAudioEnabled } = useContext(AudioContext); // Usa el contexto
  const [isInitialImageVisible, setIsInitialImageVisible] = useState(true); // Estado para controlar la visibilidad de la imagen inicial

  useEffect(() => {
    if (!isInitialImageVisible) {
      const timer = setTimeout(() => {
        const backgroundAudioElement = backgroundAudioRef.current;
        if (backgroundAudioElement) {
          backgroundAudioElement.play().catch(error => {
            console.error('Error attempting to play background music', error);
          });
        }
      }, 1000); // Reproduce el audio de fondo después de 1 segundo

      return () => clearTimeout(timer);
    }
  }, [isInitialImageVisible]);

  const handleInitialImageClick = () => {
    const initialImageElement = document.querySelector('.initial-image');
    if (initialImageElement) {
      initialImageElement.classList.add('fade-out');
    }
    setTimeout(() => {
      setIsInitialImageVisible(false);
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.muted = false; // Desmutea el video
        videoElement.play().catch(error => {
          console.error('Error attempting to play video', error);
        });
      }
    }, 500); // Espera a que la transición de desvanecimiento termine
  };

  const handleImageClick = () => {
    const audioElement = audioRef.current; // Obtén el elemento de audio
    if (audioElement) {
      audioElement.currentTime = 0; // Reinicia el audio
      audioElement.play().catch(error => {
        console.error('Error attempting to play sound', error);
      });
    }
  };

  const handleClickAnywhere = () => {
    const audioElement = audioRef.current; // Obtén el elemento de audio
    if (audioElement) {
      audioElement.currentTime = 0; // Reinicia el audio
      audioElement.play().catch(error => {
        console.error('Error attempting to play sound', error);
      });
    }
  };

  return (
    <div className="layout-container" onClick={handleClickAnywhere}>
      {isInitialImageVisible ? (
        <img
          src={carcasaImage}
          alt="Initial"
          className="initial-image"
          onClick={handleInitialImageClick}
        />
      ) : (
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
          <audio ref={audioRef} src={clickSound} /> {/* Elemento de audio */}
          <audio ref={backgroundAudioRef} src={backgroundMusic} /> {/* Elemento de audio de fondo */}
        </>
      )}
    </div>
  );
};

export default Layout;