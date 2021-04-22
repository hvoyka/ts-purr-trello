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
import React, { FC, useMemo, useState, KeyboardEvent } from "react";
import { TextArea } from "../../../ui";

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
  isNewCardAdding: boolean;
  onAddCardClick: () => void;
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
  isNewCardAdding,
  onAddCardClick,
}) => {
  const filteredCardsArray = useMemo(
    () => Object.values(cards).filter((card) => card.columnId === column.id),
    [cards, column.id]
  );
  const [newCardTitle, setNewCardTitle] = useState("");

  const [newColumnTitle, setNewColumnTitle] = useState(column.title);

  const handleTitleEdittingCloseClick = () => {
    setNewCardTitle("");
  };

  const handleAddCardClick = () => {
    const trimmedTitle = newCardTitle.trim();

    if (trimmedTitle) {
      onCardAdd(column.id, newCardTitle);
      handleTitleEdittingCloseClick();
    }
  };

  const handleTitleAreaEnterPress = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleCardAreaEnterPress = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      handleAddCardClick();
      event.currentTarget.blur();
    }
  };
  const handleCardTitleAreaBlur = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const trimmedColumnTitle = event.target.value.trim();
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
          spellCheck={false}
          maxRows={8}
          placeholder="Column title"
          defaultValue={newColumnTitle}
          onBlur={handleCardTitleAreaBlur}
          onKeyDown={handleTitleAreaEnterPress}
          columnHeader
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
      {isNewCardAdding ? (
        <>
          <TextArea
            autoFocus
            spellCheck={false}
            maxRows={8}
            placeholder="Card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={handleCardAreaEnterPress}
          />

          <button onClick={handleAddCardClick}>Add card</button>

          <button onClick={handleTitleEdittingCloseClick}>x</button>
        </>
      ) : (
        <AddCardButton title="Add card" onClick={onAddCardClick}>
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
