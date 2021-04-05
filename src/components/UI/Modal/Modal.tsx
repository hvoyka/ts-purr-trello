import React, { FC } from "react";
import { Modal as BoostrapModal } from "react-bootstrap";

interface UserModalProps {
  title?: string;
  isModalShow: boolean;
  showCloseButton?: boolean;
  closeButton?: boolean;
  onModalClose: () => void;
}

const Modal: FC<UserModalProps> = ({
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
      {children}
    </BoostrapModal>
  );
};

export default Modal;
