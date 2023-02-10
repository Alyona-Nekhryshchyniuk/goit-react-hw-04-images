import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import {useState} from 'react';

const modalRoot = document.querySelector('#modal-root');

const ImageGallery =({items})=> {
  
const [selectedImg, setSelectedImg] = useState({url: '',
type: ''});
const [modal, setModal] = useState(false);


  const getSelectedImageInfo = (largeImageURL, type) => {
    setSelectedImg({ url: largeImageURL, type: type })

    toggleModal();
  };

  const onEscClick = code => {
    if (code === 'Escape' && modal) {
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModal(prevModal => (!prevModal.modal));
  };

  const onBackdropClick = (target, currentTarget) => {
    target === currentTarget && toggleModal();
  };

  
    const { url, type } = selectedImg;
 
    return (
      <>
        <ul className={css.gallery}>
          <ImageGalleryItem
            items={items}
            getSelectedImageInfo={getSelectedImageInfo}
          />
        </ul>
        {modal &&
          createPortal(
            <Modal
              closeModal={toggleModal}
              onEscClick={onEscClick}
              onBackdropClick={onBackdropClick}
            >
              <img src={url} alt={type} />
            </Modal>,
            modalRoot
          )}
      </>
    );
  
}

ImageGallery.propTypes = {
  items: PropTypes.array,
};

export default ImageGallery;
