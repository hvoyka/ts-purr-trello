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
  onCommentAdd: (cardId: string, text: string) => void;
  onCommentRemove: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
  onCardPropertyChange: (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => void;
  columnTitle: string;
}

const CardModal: FC<Props> = ({
  card,
  isCardModalShow,
  onCardModalClose,
  onCardPropertyChange,
  comments,
  onCommentAdd,
  onCommentRemove,
  onCommentChange,
  columnTitle,
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
        onBlur={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onCardPropertyChange(card.id, "title", event.target.value);
        }}
      />
      <TextArea
        placeholder="Description"
        defaultValue={card.text}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onCardPropertyChange(card.id, "text", event.target.value);
        }}
      />
      <Comments
        cardId={card.id}
        comments={comments}
        onCommentAdd={onCommentAdd}
        onCommentRemove={onCommentRemove}
        onCommentChange={onCommentChange}
      />
      <p>
        Card author: <b>{card.author}</b> - column: <b>{columnTitle}</b>
      </p>
    </Modal>
  );
};

const TextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  resize: none;
  max-height: 256px;
  width: 100%;
  outline: none;
  border: 1px solid var(--gray2);

  -webkit-appearance: none;
  display: block;
  color: var(--blue2);
  margin-bottom: 15px;
  &:focus {
    background-color: var(--white);
    background-color: var(--blue3);
  }
`;

export default CardModal;
