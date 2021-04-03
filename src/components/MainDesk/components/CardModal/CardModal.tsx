import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

interface CardModalProps {
  id: string;
  title: string;
  text: string;
  isCardModalOpen: boolean;
  closeModalHandler: () => void;
  onChangeCardTitle: (title: string, id: string) => void;
  onChangeCardText: (text: string, id: string) => void;
}

const CardModal: React.FC<CardModalProps> = ({
  isCardModalOpen,
  closeModalHandler,
  id,
  title,
  text,
  onChangeCardTitle,
  onChangeCardText,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    closeModalHandler();
    setShow(false);
  };

  useEffect(() => {
    setShow(isCardModalOpen);
  }, [isCardModalOpen]);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered={true} animation={false}>
        <Modal.Header closeButton>
          <TextArea
            placeholder={"Card title"}
            rows={1}
            defaultValue={title}
            onChange={(e: any) => {
              onChangeCardTitle(id, e.target.value);
            }}
          />
        </Modal.Header>

        <Modal.Body>
          <TextArea
            placeholder={"Card text"}
            defaultValue={text}
            onChange={(e: any) => {
              onChangeCardText(id, e.target.value);
            }}
          />
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
