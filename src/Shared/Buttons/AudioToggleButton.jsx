import React, { useContext } from 'react';
import { AudioContext } from '../../context/AudioContext';
import muteIcon from '../../assets/icons/mute.jpg';
import unmuteIcon from '../../assets/icons/unmute.jpg';

const AudioToggleButton = () => {
  const { isAudioEnabled, toggleAudio } = useContext(AudioContext);

  return (
    <img
      src={isAudioEnabled ? unmuteIcon : muteIcon}
      alt={isAudioEnabled ? 'Desactivar Audio' : 'Activar Audio'}
      className="audio-toggle-button"
      onClick={toggleAudio}
    />
  );
};

export default AudioToggleButton;