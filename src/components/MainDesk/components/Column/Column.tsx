import styled from "styled-components";
import { Button } from "react-bootstrap";
import {
  ColumnCards,
  ColumnCard,
  DeskColumn,
  CommentsCounts,
} from "../../../../App";
import { Card } from "../Card";
import React, { FC, useMemo, useState } from "react";

export interface ColumnProps {
  column: DeskColumn;
  commentsCounts: CommentsCounts;
  onColumnTitleChange: (title: string, id: string) => void;
  onColumnRemove: (id: string) => void;
  onCardAdd: (columnId: string, title: string, text: string) => void;
  onCardRemove: (id: string) => void;
  onCardPropertyChange: (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => void;
  onCardClick: (id: string) => void;
  cards: ColumnCards;
}

const Column: FC<ColumnProps> = ({
  column,
  onColumnTitleChange,
  onColumnRemove,
  cards,
  onCardAdd,
  onCardRemove,
  onCardPropertyChange,
  onCardClick,
  commentsCounts,
}) => {
  const filteredCardsArray = useMemo(
    () => Object.values(cards).filter((card) => card.columnId === column.id),
    [cards, column.id]
  );
  const [isNewCardEdit, setIsNewCardEdit] = useState(false);
  const [newCardTitle, setnewCardTitle] = useState("");

  const handleCardAdd = () => {
    if (newCardTitle.trim()) {
      onCardAdd(column.id, newCardTitle, "");
      setIsNewCardEdit(false);
      setnewCardTitle("");
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
          defaultValue={column.title}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onColumnTitleChange(event.target.value, column.id);
          }}
        />

        <RemoveColumnButton
          title="Remove column"
          variant="danger"
          onClick={() => onColumnRemove(column.id)}
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
              commentCount={commentsCounts[filteredCard.id]?.count}
              onCardPropertyChange={onCardPropertyChange}
              onCardClick={() => onCardClick(filteredCard.id)}
              onRemoveClick={() => onCardRemove(filteredCard.id)}
            />
          );
        })}

        {!isNewCardEdit ? (
          <AddCardButton
            title="Add card"
            onClick={() => {
              setIsNewCardEdit(true);
            }}
          >
            +
          </AddCardButton>
        ) : (
          <div>
            <textarea
              autoFocus
              rows={1}
              placeholder="Column title"
              value={newCardTitle}
              onChange={(e) => setnewCardTitle(e.target.value)}
            />

            <button onClick={handleCardAdd}>Add card</button>

            <button
              onClick={() => {
                setIsNewCardEdit(false);
                setnewCardTitle("");
              }}
            >
              x
            </button>
          </div>
        )}
      </CardList>
    </Root>
  );
};

const Root = styled.div`
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
  padding-right: 5px;
  padding-left: 5px;
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
  padding: 10px 8px;
  padding-right: 8px;
  position: relative;
  min-height: 20px;
  padding-right: 36px;
`;
const CardList = styled.div`
  padding: 0;
  margin: 0;
`;

export default Column;
