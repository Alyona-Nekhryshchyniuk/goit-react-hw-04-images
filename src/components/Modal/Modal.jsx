import { FaRegWindowClose } from 'react-icons/fa';
import css from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

const Modal =({closeModal, onEscClick, onBackdropClick, children})=> {
  const EscClickCallback = ({ code }) => onEscClick(code);

  
  useEffect(()=>{document.addEventListener('keydown', EscClickCallback )
  return ()=>{document.removeEventListener('keydown', EscClickCallback)}
}, []);


  
    return (
      <div
        className={css.overlay}
        onClick={e => {
          onBackdropClick(e.target, e.currentTarget);
        }}
      >
        <button
          className={css['close-button']}
          onClick={() => closeModal()}
        >
          <FaRegWindowClose />
        </button>
        <div className={css.modal}>{children}</div>
      </div>
    );
  
};


Modal.propTypes = {
  children: PropTypes.object,
  closeModal: PropTypes.func,
  onEscClick: PropTypes.func,
  onBackdropClick: PropTypes.func,
};
export default Modal;
