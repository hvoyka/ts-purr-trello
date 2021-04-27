import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ColumnCards, ColumnCard, CardComments } from "../../../../App";
import { Card } from "../Card";
import { getCommentsCount } from "./utils";
import React, { FC, useMemo, useState, KeyboardEvent } from "react";
import { TextArea } from "../../../ui";
import { Form, Field } from "react-final-form";
import { notEmpty } from "../../../../utils/validate";
import { FormApi } from "final-form";
import { DeskColumn } from "../../../../redux/ducks/columns/columnsSlice";

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
  onCardAddingClose: () => void;
}
interface Values {
  cardTitle?: string;
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
  onCardAddingClose,
  onAddCardClick,
}) => {
  const filteredCardsArray = useMemo(
    () => Object.values(cards).filter((card) => card.columnId === column.id),
    [cards, column.id]
  );

  const [newColumnTitle, setNewColumnTitle] = useState(column.title);

  const handleColumnTitleAreaEnterPress = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  const handleCardTitleEdittingCloseClick = () => {
    onCardAddingClose();
  };

  const onSubmit = async ({ cardTitle }: Values, form: FormApi) => {
    if (cardTitle) {
      onCardAdd(column.id, cardTitle);

      onCardAddingClose();
      form.reset();
    }
  };

  const handleCardAreaEnterPress = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      const trimmedValue = event.currentTarget.value.trim();
      if (trimmedValue) {
        onCardAdd(column.id, trimmedValue);
      }
      onCardAddingClose();
    }
  };

  const handleColumnTitleAreaBlur = (
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
          onBlur={handleColumnTitleAreaBlur}
          onKeyDown={handleColumnTitleAreaEnterPress}
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
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field<string>
                name="cardTitle"
                autoFocus
                spellCheck={false}
                maxRows={8}
                placeholder="Card title"
                onKeyDown={handleCardAreaEnterPress}
                validate={notEmpty}
                render={({ input: { onChange, value }, meta, ...props }) => {
                  return (
                    <TextArea onChange={onChange} value={value} {...props} />
                  );
                }}
              />

              <CardButtonsWrapper>
                <AddCardBtn type="submit">Add card</AddCardBtn>
                <CloseAddCardBlockBtn
                  type="button"
                  onClick={handleCardTitleEdittingCloseClick}
                >
                  x
                </CloseAddCardBlockBtn>
              </CardButtonsWrapper>
            </form>
          )}
        />
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

const CardButtonsWrapper = styled.div`
  display: flex;
`;

const AddCardBtn = styled.button`
  flex: 1 0 50%;
`;
const CloseAddCardBlockBtn = styled.button`
  flex: 1 0 50%;
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
