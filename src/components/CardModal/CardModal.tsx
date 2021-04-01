import React from "react";
import styled from "styled-components";
import { ModalWrapper } from "../UI";

interface CardModalProps {
  id: string;
  title: string;
  text: string;
  isCardModalShow: boolean;
  onCardModalClose: () => void;
  onChangeCardTitle: (title: string, id: string) => void;
  onChangeCardText: (text: string, id: string) => void;
}

const CardModal: React.FC<CardModalProps> = ({
  isCardModalShow,
  onCardModalClose,
  id,
  title,
  text,
  onChangeCardTitle,
  onChangeCardText,
}) => {
  const modalProps = {};
  return (
    <>
      <ModalWrapper
        title="Card Modal"
        isModalShow={isCardModalShow}
        showCloseButton={true}
        modalProps={modalProps}
        onModalClose={onCardModalClose}
      >
        <TextArea
          placeholder={"Card title"}
          rows={1}
          defaultValue={title}
          onChange={(e: any) => {
            onChangeCardTitle(id, e.target.value);
          }}
        />
        <TextArea
          placeholder={"Card text"}
          defaultValue={text}
          onChange={(e: any) => {
            onChangeCardText(id, e.target.value);
          }}
        />
        <div>Comments</div>
      </ModalWrapper>
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
