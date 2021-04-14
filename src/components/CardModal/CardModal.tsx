import React, { FC } from "react";
import styled from "styled-components";
import { Modal } from "../UI";
import { ColumnCard, CardComments } from "../../App";
import { Comments } from "./components";

interface CardModalProps {
  card: ColumnCard;
  isVisible: boolean;
  comments: CardComments;
  onClose: () => void;
  onCommentAdd: (cardId: string, text: string) => void;
  onCommentRemoveClick: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
  onTextAreaChange: (propertyName: keyof ColumnCard, value: string) => void;
  columnTitle: string;
}

const CardModal: FC<CardModalProps> = ({
  card,
  isVisible,
  onClose,
  onTextAreaChange,
  comments,
  onCommentAdd,
  onCommentRemoveClick,
  onCommentChange,
  columnTitle,
}) => {
  if (!isVisible) return null;

  return (
    <Modal title="Card Modal" isVisible={isVisible} onClose={onClose}>
      <TextArea
        placeholder="Card title"
        rows={1}
        defaultValue={card.title}
        onBlur={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onTextAreaChange("title", event.target.value);
        }}
      />
      <TextArea
        placeholder="Description"
        defaultValue={card.text}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onTextAreaChange("text", event.target.value);
        }}
      />
      <Comments
        cardId={card.id}
        comments={comments}
        onCommentAdd={onCommentAdd}
        onCommentRemoveClick={onCommentRemoveClick}
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
