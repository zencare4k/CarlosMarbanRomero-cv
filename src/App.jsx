import React from 'react';
import Layout from './components/intro/layout';
import AudioToggleButton from './Shared/Buttons/AudioToggleButton';
import { AudioProvider } from './context/AudioContext';

const App = () => {
  return (
    <AudioProvider>
      <div>
        <AudioToggleButton />
        <Layout />
      </div>
    </AudioProvider>
  );
};

export default App;