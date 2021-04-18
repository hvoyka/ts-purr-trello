import styled from "styled-components";
import { Button } from "react-bootstrap";
import {
  ColumnCards,
  ColumnCard,
  DeskColumn,
  CardComments,
} from "../../../../App";
import { Card } from "../Card";
import { getCommentsCount } from "./utils";
import React, { FC, useMemo, useState } from "react";

export interface ColumnProps {
  column: DeskColumn;
  cards: ColumnCards;
  comments: CardComments;
  onTitleChange: (title: string) => void;
  onRemoveClick: () => void;
  onCardAdd: (columnId: string, title: string, text?: string) => void;
  onCardRemoveClick: (id: string) => void;
  onCardPropertyChange: (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => void;
  onCardClick: (id: string) => void;
}

const Column: FC<ColumnProps> = ({
  column,
  onTitleChange,
  onRemoveClick,
  cards,
  onCardAdd,
  onCardRemoveClick,
  onCardPropertyChange,
  onCardClick,
  comments,
}) => {
  const filteredCardsArray = useMemo(
    () => Object.values(cards).filter((card) => card.columnId === column.id),
    [cards, column.id]
  );
  const [isNewCardEdit, setIsNewCardEdit] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newColumnTitle, setNewColumnTitle] = useState(column.title);

  const handleTitleEdittingCloseClick = () => {
    setIsNewCardEdit(false);
    setNewCardTitle("");
  };

  const handleAddCardClick = () => {
    const trimmedTitle = newCardTitle.trim();

    if (trimmedTitle) {
      onCardAdd(column.id, newCardTitle);
      handleTitleEdittingCloseClick();
    }
  };

  const handleCardTitleAreaBlur = () => {
    const trimmedColumnTitle = newColumnTitle.trim();
    if (trimmedColumnTitle) {
      onTitleChange(trimmedColumnTitle);
    } else {
      setNewColumnTitle(column.title);
    }
  };

  return (
    <Root>
      <ListHeader>
        <TextArea
          maxLength={100}
          spellCheck={false}
          rows={2}
          placeholder="Column title"
          value={newColumnTitle}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNewColumnTitle(event.target.value);
          }}
          onBlur={handleCardTitleAreaBlur}
        />

        <RemoveColumnButton
          title="Remove column"
          variant="danger"
          onClick={onRemoveClick}
        >
          X
        </RemoveColumnButton>
      </ListHeader>

      <CardList>
        {filteredCardsArray.map((filteredCard) => {
          return (
            <Card
              key={filteredCard.id}
              card={filteredCard}
              onTextAreaChange={(propertyName, value) =>
                onCardPropertyChange(filteredCard.id, propertyName, value)
              }
              onClick={() => onCardClick(filteredCard.id)}
              onRemoveClick={() => onCardRemoveClick(filteredCard.id)}
              commentsCount={getCommentsCount(comments, filteredCard.id)}
            />
          );
        })}
      </CardList>
      {isNewCardEdit ? (
        <>
          <textarea
            autoFocus
            rows={1}
            placeholder="Column title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />

          <button onClick={handleAddCardClick}>Add card</button>

          <button onClick={handleTitleEdittingCloseClick}>x</button>
        </>
      ) : (
        <AddCardButton
          title="Add card"
          onClick={() => {
            setIsNewCardEdit(true);
          }}
        >
          +
        </AddCardButton>
      )}
    </Root>
  );
};

const Root = styled.li`
  position: relative;
  flex: 0 0 272px;
  width: 272px;
  border-radius: 10px;

  border: 1px solid var(--gray3);
  box-shadow: 2px 2px 5px rgba($color: var(--black), $alpha: 0.3);
  background-color: var(--gray4);

  display: flex;
  flex-direction: column;

  max-height: 100%;

  white-space: normal;
  padding: 5px;

  margin: 10px 4px;
`;
const RemoveColumnButton = styled(Button)`
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
  padding: 5px;
  font-size: 15px;
  line-height: 15px;
`;
const AddCardButton = styled(Button)`
  width: 100%;
  z-index: 1;
  padding: 5px;
  font-size: 15px;
  line-height: 15px;
`;
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
const ListHeader = styled.div`
  position: relative;
  flex: 0 0 auto;
  padding: 5px;
  padding-right: 8px;
  position: relative;
  min-height: 20px;
  padding-right: 36px;
`;
const CardList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export default Column;
