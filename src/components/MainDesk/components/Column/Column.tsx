import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ICard } from "../../../../App";
import { Card } from "../Card";
import { v1 as uuid } from "uuid";

export interface ColumnProps {
  title: string;
  id: string;
  onChangeColumnTitle: (title: string, id: string) => void;
  onRemoveColumn: (id: string) => void;
  onAddCard: (columnId: string, title?: string, text?: string) => void;
  removeCard: (id: string) => void;
  changeCardTitle: (title: string, id: string) => void;
  changeCardText: (text: string, id: string) => void;
  cards: ICard;
}

const Column: React.FC<ColumnProps> = ({
  title,
  id,
  onChangeColumnTitle,
  onRemoveColumn,
  cards,
  onAddCard,
  removeCard,
  changeCardTitle,
  changeCardText,
}) => {
  const filteredCardsArray = Object.values(cards).filter(
    (card) => card.columnId === id
  );

  return (
    <StyledColumn>
      <ListHeader>
        <TextArea
          maxLength={100}
          spellCheck={false}
          rows={2}
          placeholder={"Column title"}
          value={title}
          onChange={(e: any) => {
            onChangeColumnTitle(e.target.value, id);
          }}
        ></TextArea>

        <RemoveColumnButton
          title="Remove column"
          variant="danger"
          onClick={() => onRemoveColumn(id)}
        >
          X
        </RemoveColumnButton>

        <AddCardButton
          title="Add card"
          onClick={() => {
            onAddCard(id);
          }}
        >
          +
        </AddCardButton>
      </ListHeader>

      <CardList>
        {filteredCardsArray.map((fCard) => {
          const cardId = uuid();
          return (
            <Card
              key={cardId}
              id={cardId}
              title={fCard.title}
              text={fCard.text}
              removeCard={removeCard}
              changeCardTitle={changeCardTitle}
              changeCardText={changeCardText}
            />
          );
        })}
      </CardList>
    </StyledColumn>
  );
};

export default Column;

const StyledColumn = styled.li`
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
  position: absolute;
  right: 4px;
  top: 40px;
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
const CardList = styled.ul`
  padding: 0;
  margin: 0;
`;
