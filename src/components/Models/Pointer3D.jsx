import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Model = ({ modelPath }) => {
  const obj = useLoader(OBJLoader, modelPath);
  const ref = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(mouse.x * 5, mouse.y * 5, 0);
      ref.current.rotation.x = mouse.y * Math.PI;
      ref.current.rotation.y = mouse.x * Math.PI;
    }
  });

  return <primitive ref={ref} object={obj} />;
};

const Pointer3D = ({ modelPath }) => {
  useEffect(() => {
    // Ocultar el cursor del ratón
    document.body.style.cursor = 'none';
    return () => {
      // Restaurar el cursor del ratón cuando el componente se desmonte
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model modelPath={modelPath} />
    </Canvas>
  );
};

export default Pointer3D;