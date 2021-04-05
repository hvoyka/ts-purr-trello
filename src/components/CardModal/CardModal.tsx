import React, { FC } from "react";
import styled from "styled-components";
import { Modal } from "../UI";
import { ColumnCard, CardComments } from "../../App";
import { Comments } from "./components";

interface Props {
  card: ColumnCard;
  isCardModalShow: boolean;
  comments: CardComments;
  onCardModalClose: () => void;
  onAddComent: (cardId: string, text: string) => void;
  onRemoveComment: (id: string) => void;
  onChangeComment: (id: string, text: string) => void;
  onChangeCardProperty: (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => void;
}

const CardModal: FC<Props> = ({
  card,
  isCardModalShow,
  onCardModalClose,
  onChangeCardProperty,
  comments,
  onAddComent,
  onRemoveComment,
  onChangeComment,
}) => {
  if (!isCardModalShow) return null;
  return (
    <Modal
      title="Card Modal"
      isModalShow={isCardModalShow}
      showCloseButton
      onModalClose={onCardModalClose}
    >
      <TextArea
        placeholder="Card title"
        rows={1}
        defaultValue={card.title}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onChangeCardProperty(card.id, "title", event.target.value);
        }}
      />
      <TextArea
        placeholder="Card text"
        defaultValue={card.text}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onChangeCardProperty(card.id, "text", event.target.value);
        }}
      />
      <Comments
        cardId={card.id}
        comments={comments}
        onAddComent={onAddComent}
        onRemoveComment={onRemoveComment}
        onChangeComment={onChangeComment}
      />
    </Modal>
  );
};

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

export default CardModal;
