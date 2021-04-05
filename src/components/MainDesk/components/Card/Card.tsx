import styled from "styled-components";
import { ColumnCard } from "../../../../App";
import React, { FC } from "react";

export interface CardProps {
  card: ColumnCard;
  onRemoveCard: (id: string) => void;
  onChangeCardProperty: (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => void;
  onCardModalOpen: (id: string) => void;
}

const Card: FC<CardProps> = ({
  card,
  onRemoveCard,
  onChangeCardProperty,
  onCardModalOpen,
}) => {
  return (
    <StyledCardBox>
      <CardTextArea
        maxLength={100}
        spellCheck={false}
        rows={1}
        placeholder="Card title"
        value={card.title}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onChangeCardProperty(card.id, "title", event.target.value);
        }}
      />

      <EnterCardButton
        title="To card info"
        onClick={() => onCardModalOpen(card.id)}
      >
        &#8617;
      </EnterCardButton>

      <RemoveCardButton
        title="Remove card"
        onClick={() => onRemoveCard(card.id)}
      >
        X
      </RemoveCardButton>
    </StyledCardBox>
  );
};

const StyledCardBox = styled.div`
  flex: 1 1 auto;
  margin-bottom: 0;
  margin: 0 4px 10px;
  padding-bottom: 10px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid var(--gray3);
`;

const CardTextArea = styled.textarea`
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
const RemoveCardButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  border: 1px solid transparent;
  &:hover {
    border: 1px solid var(--blue2);
  }
`;
const EnterCardButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  border: 1px solid transparent;
  &:hover {
    transform: scale(1.05);
  }
`;

export default Card;
