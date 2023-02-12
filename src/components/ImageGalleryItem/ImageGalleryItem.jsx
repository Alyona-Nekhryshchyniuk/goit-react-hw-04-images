import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { createPortal } from 'react-dom';
import { useState, useReducer, useMemo, useRef, useCallback } from 'react';
let r = 0;
const modalRoot = document.querySelector('#modal-root');

function reducer(modal, action) {
  // console.log(action.payload.largeImgUrl);
  if (action.type === 'toggle') {
    console.log('in toggle');
    return !modal;
  } else if (action.type === 'escClick') {
    if (action.payload.code === 'Escape' && modal) {
      console.log('in escClick');
      return !modal;
    }
  } else if (action.type === 'backdropClick') {
    // console.log(modal);
    // console.log('back');
    if (action.payload.target === action.payload.currentTarget) {
      console.log('in backdropClick');
      return !modal;
    }
  }
}

const ImageGalleryItem = ({ items }) => {
  const largeImgRef = useRef('');

  const [modal, dispatch] = useReducer(reducer, false);

  // const [modal, setModal] = useState(false);
  // const [largeImgUrl, setlargeImgUrl] = useState('');

  // const onEscClick = code => {
  //   if (code === 'Escape' && modal) {
  //     toggleModal();
  //   }
  // };

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  // const onBackdropClick = (target, currentTarget) => {
  //   target === currentTarget && toggleModal();
  // };
  const callbackHook = useCallback(() => {
    // largeImgRef.current = largeImageURL;

    // setlargeImgUrl(largeImageURL);
    console.log('li toggle below');
    dispatch({ type: 'toggle' });
  }, []);
  return items.map(({ id, webformatURL, largeImageURL, type }) => {
    return (
      <li
        className={css['gallery-item']}
        key={id}
        onClick={callbackHook}
        click={(largeImgRef.current = largeImageURL)}
      >
        <img src={webformatURL} alt={type} />
        {modal &&
          createPortal(
            <Modal
              dispatch={dispatch}
              // largeImgUrl={largeImgUrl}
              // onEscClick={dispatch}
              // onBackdropClick={onBackdropClick}
            >
              <img src={largeImgRef.current} alt={type} />
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
