import React, { FC } from "react";
import { Modal as BoostrapModal } from "react-bootstrap";

interface ModalProps {
  title?: string;
  isModalShow: boolean;
  showCloseButton?: boolean;
  closeButton?: boolean;
  onModalClose: () => void;
}

const Modal: FC<ModalProps> = ({
  isModalShow,
  onModalClose,
  showCloseButton,
  children,
  title,
}) => {
  return (
    <BoostrapModal
      onHide={onModalClose}
      show={isModalShow}
      animation={false}
      centered
    >
      <BoostrapModal.Header closeButton={showCloseButton}>
        {title}
      </BoostrapModal.Header>
      <BoostrapModal.Body>{children}</BoostrapModal.Body>
    </BoostrapModal>
  );
};

export default Modal;
