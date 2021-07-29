import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const SuccessModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Successful!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default SuccessModal;
