import { Container, Button } from "react-bootstrap";
import { IColumn, ICard } from "../../App";
import { Column } from "./components";
import styled from "styled-components";

export interface MainDeskProps {
  columns: IColumn;
  cards: ICard;
  onAddColumn: (title: string) => void;
  onChangeColumnTitle: (title: string, id: string) => void;
  onRemoveColumn: (id: string) => void;
  onAddCard: (columnId: string, title?: string, text?: string) => void;
  removeCard: (id: string) => void;
  changeCardTitle: (title: string, id: string) => void;
  changeCardText: (text: string, id: string) => void;
}

const MainDesk: React.FC<MainDeskProps> = ({
  columns,
  onAddColumn,
  onChangeColumnTitle,
  onRemoveColumn,
  cards,
  onAddCard,
  removeCard,
  changeCardTitle,
  changeCardText,
}) => {
  return (
    <StyledMain>
      <Container fluid>
        <ColumnList>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <Column
                title={column.title}
                key={id}
                id={id}
                onChangeColumnTitle={onChangeColumnTitle}
                onRemoveColumn={onRemoveColumn}
                cards={cards}
                onAddCard={onAddCard}
                removeCard={removeCard}
                changeCardTitle={changeCardTitle}
                changeCardText={changeCardText}
              />
            );
          })}
          <EmptyColumn>
            <Button
              variant="secondary"
              onClick={() => {
                onAddColumn("");
              }}
            >
              Add column
            </Button>
          </EmptyColumn>
        </ColumnList>
      </Container>
    </StyledMain>
  );
};

export default MainDesk;

const StyledMain = styled.main`
  flex-grow: 1;
`;
const ColumnList = styled.ul`
  display: flex;
  align-items: flex-start;
  height: calc(100vh - 56px);
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
`;
const EmptyColumn = styled.li`
  position: relative;
  flex: 0 0 272px;
  width: 272px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  max-height: 100%;

  white-space: normal;
  padding-right: 5px;
  padding-left: 5px;
  margin: 10px 4px;
`;
