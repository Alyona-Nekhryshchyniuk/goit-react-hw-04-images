import { FaRegWindowClose } from 'react-icons/fa';
import css from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ dispatch, children }) => {
  const EscClickCallback = ({ code }) =>
    dispatch({ type: 'escClick', payload: { code } });

  useEffect(() => {
    document.addEventListener('keydown', EscClickCallback);
    return () => {
      document.removeEventListener('keydown', EscClickCallback);
    };
  }, [EscClickCallback]);

  return (
    <div
      className={css.overlay}
      onClick={e => {
        const target = e.target;
        const currentTarget = e.currentTarget;
        e.stopPropagation();
        dispatch({ type: 'backdropClick', payload: { target, currentTarget } });
      }}
    >
      <button
        className={css['close-button']}
        onClick={e => {
          e.stopPropagation();
          dispatch({ type: 'toggle' });
        }}
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
