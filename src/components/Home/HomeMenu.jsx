import newPreviewImage from '../../assets/layout/newPreview.png';
import newMiddleImage from '../../assets/layout/newMiddle.png';

const HomeMenu = () => {
  return (
    <div>
      <img src={newPreviewImage} alt="New Preview" className="preview-image" />
      <img src={newMiddleImage} alt="New Middle" className="middle-image" />
    </div>
  );
};

export default HomeMenu;