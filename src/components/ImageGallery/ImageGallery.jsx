import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ items }) => {
  return (
    <ul className={css.gallery}>
      <ImageGalleryItem items={items} />
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array,
};

export default ImageGallery;
