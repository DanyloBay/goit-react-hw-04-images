import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import './ImageGallery.scss';
export const ImageGallery = ({ dataImages }) => {
  return (
    <>
      <ul className="gallery">
        {dataImages.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
