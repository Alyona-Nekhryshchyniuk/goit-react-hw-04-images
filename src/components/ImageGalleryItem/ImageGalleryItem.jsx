import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { reducer } from '../../reducer';
import { createPortal } from 'react-dom';
import { useReducer, useRef } from 'react';

const modalRoot = document.querySelector('#modal-root');

const ImageGalleryItem = ({ items }) => {
  const largeImgRef = useRef('');
  console.log('rerender');

  const [modal, dispatch] = useReducer(reducer, false);
  console.log(modal);
  return items.map(({ id, webformatURL, largeImageURL, type }) => {
    return (
      <li
        className={css['gallery-item']}
        key={id}
        onClick={e => {
          largeImgRef.current = largeImageURL;
          dispatch({ type: 'toggle' });
        }}
      >
        <img src={webformatURL} alt={type} />
        {modal &&
          createPortal(
            <Modal dispatch={dispatch}>
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
