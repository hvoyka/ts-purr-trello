import React from "react";
import { Modal as BoostrapModal } from "react-bootstrap";

interface UserModalProps {
  title?: string;
  isModalShow: boolean;
  showCloseButton?: boolean;
  closeButton?: boolean;
  modalProps?: Record<string, any>;
  onModalClose: () => void;
}

const Modal: React.FC<UserModalProps> = ({
  isModalShow,
  onModalClose,
  showCloseButton,
  modalProps,
  children,
  title,
}) => {
  return (
    <>
      <BoostrapModal
        onHide={onModalClose}
        show={isModalShow}
        {...modalProps}
        animation={false}
        centered
      >
        <BoostrapModal.Header closeButton={showCloseButton}>
          {title}
        </BoostrapModal.Header>
        {children}
      </BoostrapModal>
    </>
  );
};

export default Modal;
