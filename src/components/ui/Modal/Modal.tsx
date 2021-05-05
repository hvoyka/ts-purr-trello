import React, { FC } from "react";
import { Modal as BoostrapModal } from "react-bootstrap";

interface ModalProps {
  title?: string;
  isVisible: boolean;
  closeButton?: boolean;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({ isVisible, onClose, children, title }) => {
  return (
    <BoostrapModal
      onHide={onClose || (() => {})}
      show={isVisible}
      animation={false}
      centered
    >
      <BoostrapModal.Header closeButton={!!onClose}>
        {title}
      </BoostrapModal.Header>
      <BoostrapModal.Body>{children}</BoostrapModal.Body>
    </BoostrapModal>
  );
};

export default Modal;
