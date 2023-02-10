import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ items, getSelectedImageInfo }) => {
  return items.map(({ id, webformatURL, largeImageURL, type }) => {
    return (
      <li
        className={css['gallery-item']}
        key={id}
        onClick={() => {
          getSelectedImageInfo(largeImageURL, type);
        }}
      >
        <img src={webformatURL} alt={type} />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  items: PropTypes.array,
  getSelectedImageInfo: PropTypes.func,
};

export default ImageGalleryItem;
