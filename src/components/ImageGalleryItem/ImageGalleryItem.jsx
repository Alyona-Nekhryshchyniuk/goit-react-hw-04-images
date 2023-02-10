import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { createPortal } from 'react-dom';
import { useState } from 'react';

const modalRoot = document.querySelector('#modal-root');

const ImageGalleryItem = ({ items }) => {
  const [modal, setModal] = useState(false);

  const onEscClick = code => {
    if (code === 'Escape' && modal) {
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModal(prevModal => !prevModal);
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
          toggleModal();
        }}
      >
        <img src={webformatURL} alt={type} />
        {modal &&
          createPortal(
            <Modal
              closeModal={toggleModal}
              onEscClick={onEscClick}
              onBackdropClick={onBackdropClick}
            >
              <img src={largeImageURL} alt={type} />
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
