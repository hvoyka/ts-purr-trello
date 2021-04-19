import React, { FC, KeyboardEvent } from "react";
import { Modal } from "../ui";
import { ColumnCard, CardComments } from "../../App";
import { Comments } from "./components";
import { TextArea } from "../ui";
import styled from "styled-components";

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
  if (!card) return null;

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
      />
      <Comments
        cardId={card.id}
        comments={comments}
        onCommentAdd={onCommentAdd}
        onCommentRemoveClick={onCommentRemoveClick}
        onCommentChange={onCommentChange}
      />
      <Info>
        Card author: <b>{card.author}</b> - column: <b>{columnTitle}</b>
      </Info>
    </Modal>
  );
};

const Info = styled.div`
  overflow-wrap: break-word;
`;

export default CardModal;
