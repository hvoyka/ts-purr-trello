import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

interface CardModalProps {
  id: string;
  title: string;
  text: string;
  isCardModalOpen: boolean;
  closeModalHandler: () => void;
  changeCardTitle: (title: string, id: string) => void;
  changeCardText: (text: string, id: string) => void;
}

const CardModal: React.FC<CardModalProps> = ({
  isCardModalOpen,
  closeModalHandler,
  id,
  title,
  text,
  changeCardTitle,
  changeCardText,
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
        <Modal.Header closeButton>
          <TextArea
            placeholder={"Card title"}
            rows={1}
            onChange={(e: any) => {
              changeCardTitle(id, e.target.value);
            }}
          >
            {title}
          </TextArea>
        </Modal.Header>
        <Modal.Body>
          <TextArea
            placeholder={"Card text"}
            onChange={(e: any) => {
              changeCardText(id, e.target.value);
            }}
          >
            {text}
          </TextArea>
        </Modal.Body>
        <Modal.Body>
          <div>Comments</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardModal;

const TextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  resize: none;
  max-height: 256px;
  width: 100%;
  outline: none;
  border: none;
  -webkit-appearance: none;
  border-radius: 3px;
  display: block;
  color: var(--blue2);
  &:focus {
    background-color: var(--white);
    box-shadow: inset 0 0 0 2px var(--blue2);
  }
`;
