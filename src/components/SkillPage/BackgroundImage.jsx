import React from 'react';
import PropTypes from 'prop-types';
import backgroundImage from '../../assets/Background_Image/background_image.png'; // Asegúrate de que la ruta sea correcta

const BackgroundImage = ({ text }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1, // Asegúrate de que el z-index sea menor que el de layout-image
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </div>
  );
};

BackgroundImage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BackgroundImage;