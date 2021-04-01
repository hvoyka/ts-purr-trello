import React from "react";
import { Modal } from "react-bootstrap";

interface UserModalProps {
  title?: string;
  isModalShow: boolean;
  showCloseButton?: boolean;
  closeButton?: boolean;
  modalProps?: Record<string, any>;
  onModalClose: () => void;
}

const ModalWrapper: React.FC<UserModalProps> = ({
  isModalShow,
  onModalClose,
  showCloseButton,
  modalProps,
  children,
  title,
}) => {
  return (
    <>
      <Modal
        onHide={onModalClose}
        show={isModalShow}
        {...modalProps}
        animation={false}
        centered={true}
      >
        <Modal.Header closeButton={showCloseButton}>{title}</Modal.Header>
        {children}
      </Modal>
    </>
  );
};

export default ModalWrapper;
