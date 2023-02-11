import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { createPortal } from 'react-dom';
import { useState } from 'react';

const modalRoot = document.querySelector('#modal-root');

const ImageGalleryItem = ({ items }) => {
  const [modal, setModal] = useState(false);
  const [largeImgUrl, setlargeImgUrl] = useState('');

  const onEscClick = code => {
    if (code === 'Escape' && modal) {
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const onBackdropClick = (target, currentTarget) => {
    target === currentTarget && toggleModal();
  };

  return items.map(({ id, webformatURL, largeImageURL, type }) => {
    return (
      <li
        className={css['gallery-item']}
        key={id}
        onClick={() => {
          setlargeImgUrl(largeImageURL);
          toggleModal();
        }}
      >
        <img src={webformatURL} alt={type} />
        {modal &&
          createPortal(
            <Modal
              toggleModal={toggleModal}
              onEscClick={onEscClick}
              onBackdropClick={onBackdropClick}
            >
              <img src={largeImgUrl} alt={type} />
            </Modal>,
            modalRoot
          )}
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  items: PropTypes.array,
  getSelectedImageInfo: PropTypes.func,
};

export default ImageGalleryItem;
