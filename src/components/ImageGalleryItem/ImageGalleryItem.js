import { useState } from 'react';
import './ImageGalleryItem.scss';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <>
      <li key={id} className="gallery-item">
        <img key={id} src={webformatURL} alt="" onClick={handleToggleModal} />
      </li>
      {toggleModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleToggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
};
