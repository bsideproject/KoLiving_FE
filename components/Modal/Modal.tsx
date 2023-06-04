import React from 'react';
import styles from './Modal.module.scss';

function Modal() {
  return (
    <div className={styles.overlay}>
      <div className={styles['modal-wrap']}>
        <h2>Title</h2>
        <p>Lorem ipsum dolor sit amet consectetur. Varius nunc aliquam nullam vitae.</p>
      </div>
    </div>
  );
}

export default Modal;
