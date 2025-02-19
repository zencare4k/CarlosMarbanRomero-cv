import React, { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // Comienza muteado

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <AudioContext.Provider value={{ isAudioEnabled, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};