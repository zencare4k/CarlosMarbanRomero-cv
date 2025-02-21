import React, { useEffect, useState } from 'react';
import cursorImage from '../../assets/Pointer/pointer.png'; // Asegúrate de que la ruta sea correcta

const CustomCursor = ({ isInitialImageVisible }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    if (!isInitialImageVisible) {
      // Ocultar el cursor del ratón
      document.body.style.cursor = 'none';
    } else {
      // Restaurar el cursor del ratón cuando el componente se desmonte
      document.body.style.cursor = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [isInitialImageVisible]);

  if (isInitialImageVisible) {
    return null; // No renderizar el cursor personalizado cuando la imagen inicial es visible
  }

  return (
    <img
      src={cursorImage}
      alt="Custom Cursor"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
        transform: 'translate(-0%, -100%)', // Ajusta la posición para que el puntero esté en la esquina inferior izquierda
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;