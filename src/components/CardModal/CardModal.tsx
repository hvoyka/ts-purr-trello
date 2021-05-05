import { FC, KeyboardEvent, ChangeEvent } from "react";
import { Modal } from "../ui";
import { CardComments } from "../../redux/ducks/comments";
import { ColumnCard } from "../../redux/ducks/cards";
import { Comments } from "./components";
import { TextArea } from "../ui";
import styled from "styled-components";

interface CardModalProps {
  card: ColumnCard | undefined;
  isVisible: boolean;
  comments: CardComments;
  onClose: () => void;
  onCardTitleChange: (title: string) => void;
  onCardTextChange: (text: string) => void;
  columnTitle: string;
}

const CardModal: FC<CardModalProps> = ({
  card,
  isVisible,
  onClose,
  onCardTitleChange,
  onCardTextChange,
  comments,
  columnTitle,
}) => {
  if (!card) return null;

  const handleTitleAreaBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const trimmedCardTitle = event.target.value.trim();
    if (trimmedCardTitle) {
      onCardTitleChange(trimmedCardTitle);
    }
  };

  const handleDescriptionAreaBlur = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const trimmedCardText = event.target.value.trim();
    if (trimmedCardText) {
      onCardTextChange(event.target.value);
    }
  };

  const handleAreaEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <Modal title="Card Edit" isVisible={isVisible} onClose={onClose}>
      <StyledTextArea
        placeholder="Card title"
        spellCheck={false}
        maxRows={2}
        defaultValue={card.title}
        onBlur={handleTitleAreaBlur}
        onKeyDown={handleAreaEnterPress}
      />
      <StyledTextArea
        spellCheck={false}
        maxRows={8}
        placeholder="Description"
        defaultValue={card.text}
        onBlur={handleDescriptionAreaBlur}
      />
      <Comments cardId={card.id} comments={comments} />
      <Info>
        Card author: <b>{card.author}</b> - column: <b>{columnTitle}</b>
      </Info>
    </Modal>
  );
};

const Info = styled.div`
  overflow-wrap: break-word;
`;

const StyledTextArea = styled(TextArea)`
  margin-bottom: 10px;
`;

export default CardModal;
