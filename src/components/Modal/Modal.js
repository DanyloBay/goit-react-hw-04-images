import './Modal.scss';

import { useEffect } from 'react';

import PropTypes from 'prop-types';

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key !== 'Escape') {
        return;
      }

      onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickOutside = ({ target: { className } }) => {
    if (className !== 'overlay') {
      return;
    }

    onClose();
  };

  return (
    <div className="overlay" onClick={handleClickOutside}>
      <div className="modal">
        <img src={largeImageURL} alt="" width={750} height={550} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
