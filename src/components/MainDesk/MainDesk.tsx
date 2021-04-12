import { Container, Button } from "react-bootstrap";
import { DeskColumns, ColumnCards, ColumnCard, CardComments } from "../../App";
import { Column } from "./components";
import styled from "styled-components";
import React, { FC, useState } from "react";

export interface MainDeskProps {
  columns: DeskColumns;
  cards: ColumnCards;
  comments: CardComments;
  onColumnAdd: (title: string) => void;
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
}

const MainDesk: FC<MainDeskProps> = ({
  columns,
  onColumnAdd,
  onColumnTitleChange,
  onColumnRemove,
  cards,
  onCardAdd,
  onCardRemove,
  onCardPropertyChange,
  onCardClick,
  comments,
}) => {
  const [isNewColumnEdit, setIsNewColumnEdit] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const handleEditTitleClose = () => {
    setIsNewColumnEdit(false);
    setNewColumnTitle("");
  };

  const handleColumnAdd = () => {
    const trimmedTitle = newColumnTitle.trim();
    if (trimmedTitle) {
      onColumnAdd(newColumnTitle);
      handleEditTitleClose();
    }
  };
  return (
    <Main>
      <Container fluid>
        <ColumnList>
          {Object.values(columns).map((column) => {
            return (
              <Column
                column={column}
                key={column.id}
                onTitleChange={(value) => onColumnTitleChange(column.id, value)}
                onRemove={() => onColumnRemove(column.id)}
                cards={cards}
                onCardAdd={onCardAdd}
                onCardRemove={onCardRemove}
                onCardPropertyChange={onCardPropertyChange}
                onCardClick={onCardClick}
                comments={comments}
              />
            );
          })}
          <EmptyColumn>
            {isNewColumnEdit ? (
              <>
                <textarea
                  autoFocus
                  rows={1}
                  placeholder="Column title"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                />

                <button onClick={handleColumnAdd}>Add column</button>

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
        </ColumnList>
      </Container>
    </Main>
  );
};

const Main = styled.main`
  flex-grow: 1;
`;
const ColumnList = styled.div`
  display: flex;
  align-items: flex-start;
  height: calc(100vh - 70px);
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
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
