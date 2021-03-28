import styled from "styled-components";
import { Button } from "react-bootstrap";
import { IColumn, ICard } from "../../../../App";
import { Card } from "../Card";

export interface ColumnProps {
  title: string;
  id: string;
  changeColumnTitle: (title: string, id: string) => void;
  removeColumn: (id: string) => void;
  addCard: (title: string, columnId: string, text: string) => void;
  removeCard: (id: string) => void;
  changeCardTitle: (title: string, id: string) => void;
  cards: ICard[];
}

const Column: React.FC<ColumnProps> = ({
  title,
  id,
  changeColumnTitle,
  removeColumn,
  cards,
  addCard,
  removeCard,
  changeCardTitle,
}) => {
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
            changeColumnTitle(e.target.value, id);
          }}
        ></TextArea>
        <RemoveColumnButton
          title="Remove column"
          variant="danger"
          onClick={() => removeColumn(id)}
        >
          X
        </RemoveColumnButton>
        <AddCardButton
          title="Add card"
          onClick={() => {
            addCard("New card", "", id);
          }}
        >
          +
        </AddCardButton>
      </ListHeader>
      <CardList>
        {cards
          .filter((card) => card.columnId === id)
          .map((fCard) => {
            return (
              <Card
                key={fCard.id}
                id={fCard.id}
                title={fCard.title}
                removeCard={removeCard}
                changeCardTitle={changeCardTitle}
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
