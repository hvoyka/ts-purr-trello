import React, { FC } from "react";
import { Modal as BoostrapModal } from "react-bootstrap";

interface Props {
  title?: string;
  isModalShow: boolean;
  showCloseButton?: boolean;
  closeButton?: boolean;
  onModalClose: () => void;
}

const Modal: FC<Props> = ({
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
