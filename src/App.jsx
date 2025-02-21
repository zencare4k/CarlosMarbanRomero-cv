import React, { useState } from 'react';
import Layout from './components/intro/layout';
import AudioToggleButton from './Shared/Buttons/AudioToggleButton';
import { AudioProvider } from './context/AudioContext';
import CustomCursor from './components/Cursor/CustomCursor'; // Importa el componente CustomCursor

const App = () => {
  const [isInitialImageVisible, setIsInitialImageVisible] = useState(true);

  return (
    <AudioProvider>
      <div>
        <AudioToggleButton />
        <Layout setIsInitialImageVisible={setIsInitialImageVisible} />
        <CustomCursor isInitialImageVisible={isInitialImageVisible} /> {/* Agrega el componente CustomCursor */}
      </div>
    </AudioProvider>
  );
};

export default App;