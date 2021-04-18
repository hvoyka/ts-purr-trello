import React, { FC, KeyboardEvent } from "react";
import styled from "styled-components";
import { Modal } from "../ui";
import { ColumnCard, CardComments } from "../../App";
import { Comments } from "./components";
import TextareaAutosize from "react-textarea-autosize";

interface CardModalProps {
  card: ColumnCard | undefined;
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
  if (!isVisible || card === undefined) return null;

  const handleTitleAreaBlur = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const trimmedCardTitle = event.target.value.trim();
    if (trimmedCardTitle) {
      onTextAreaChange("title", trimmedCardTitle);
    }
  };

  const handleDescriptionAreaBlur = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const trimmedCardText = event.target.value.trim();
    if (trimmedCardText) {
      onTextAreaChange("text", event.target.value);
    }
  };

  const handleAreaEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <Modal title="Card Edit" isVisible={isVisible} onClose={onClose}>
      <TextArea
        placeholder="Card title"
        spellCheck={false}
        maxRows={2}
        defaultValue={card.title}
        onBlur={handleTitleAreaBlur}
        onKeyDown={handleAreaEnterPress}
      />
      <TextArea
        spellCheck={false}
        maxRows={8}
        placeholder="Description"
        defaultValue={card.text}
        onBlur={handleDescriptionAreaBlur}
        onKeyDown={handleAreaEnterPress}
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

const TextArea = styled(TextareaAutosize)`
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
