import { Container, Button } from "react-bootstrap";
import { DeskColumns, ColumnCards, ColumnCard, CardComments } from "../../App";
import { Column } from "./components";
import styled from "styled-components";
import { FC, useState, ChangeEvent } from "react";
import { TextArea } from "../ui";

export interface MainDeskProps {
  columns: DeskColumns;
  cards: ColumnCards;
  comments: CardComments;
  onColumnAdd: (title: string) => void;
  onColumnTitleChange: (title: string, id: string) => void;
  onColumnRemoveClick: (id: string) => void;
  onCardAdd: (columnId: string, title: string, text?: string) => void;
  onCardRemoveClick: (id: string) => void;

  onCardPropertyChange: (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => void;
  onCardClick: (id: string) => void;
}

const MainDesk: FC<MainDeskProps> = ({
  columns,
  onColumnAdd,
  onColumnTitleChange,
  onColumnRemoveClick,
  cards,
  onCardAdd,
  onCardRemoveClick,
  onCardPropertyChange,
  onCardClick,
  comments,
}) => {
  const [isNewColumnEdit, setIsNewColumnEdit] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [idColumnWereNewCardEdit, setIdColumnWereNewCardEdit] = useState("");

  const handleEditTitleClose = () => {
    setIsNewColumnEdit(false);
    setNewColumnTitle("");
  };

  const handleColumnAddClick = () => {
    const trimmedTitle = newColumnTitle.trim();
    if (trimmedTitle) {
      onColumnAdd(newColumnTitle);
      handleEditTitleClose();
    }
  };

  const onAnyNewCardEdit = (columnId: string) => {
    setIdColumnWereNewCardEdit(columnId);
  };
  return (
    <Main>
      <Container fluid>
        <DeskWrapper>
          <ColumnList>
            {Object.values(columns).map((column) => {
              return (
                <Column
                  column={column}
                  key={column.id}
                  onTitleChange={(value) =>
                    onColumnTitleChange(column.id, value)
                  }
                  onRemoveClick={() => onColumnRemoveClick(column.id)}
                  cards={cards}
                  onCardAdd={onCardAdd}
                  onCardRemoveClick={onCardRemoveClick}
                  onCardPropertyChange={onCardPropertyChange}
                  onCardClick={onCardClick}
                  comments={comments}
                  isThisNewCardEdit={idColumnWereNewCardEdit === column.id}
                  onThisNewCardEdit={() => onAnyNewCardEdit(column.id)}
                />
              );
            })}
          </ColumnList>
          <EmptyColumn>
            {isNewColumnEdit ? (
              <>
                <TextArea
                  autoFocus
                  maxRows={1}
                  placeholder="Column title"
                  value={newColumnTitle}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setNewColumnTitle(event.target.value)
                  }
                />

                <button onClick={handleColumnAddClick}>Add column</button>

                <button onClick={handleEditTitleClose}>x</button>
              </>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setIsNewColumnEdit(true);
                }}
              >
                Add column
              </Button>
            )}
          </EmptyColumn>
        </DeskWrapper>
      </Container>
    </Main>
  );
};

const Main = styled.main`
  flex-grow: 1;
`;
const DeskWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  height: calc(100vh - 70px);
  display: flex;
`;
const ColumnList = styled.ul`
  display: flex;
  align-items: flex-start;

  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
`;
const EmptyColumn = styled.div`
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

export default MainDesk;
