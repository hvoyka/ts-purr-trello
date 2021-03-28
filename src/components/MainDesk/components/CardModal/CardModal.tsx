import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

interface CardModalProps {
  id: string;
  title: string;
  text: string;
  isCardModalOpen: boolean;
  closeModalHandler: () => void;
  changeCardTitle: (title: string, id: string) => void;
}

const CardModal: React.FC<CardModalProps> = ({
  isCardModalOpen,
  closeModalHandler,
  id,
  title,
  text,
  changeCardTitle,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    closeModalHandler();
    setShow(false);
  };

  useEffect(() => {
    setShow(isCardModalOpen);
  }, [isCardModalOpen]);

  const changeHandler = (e: any) => {};
  const enterHandler = (e: any) => {};

  return (
    <>
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Comfirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardModal;
