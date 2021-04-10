import { Container, Button } from "react-bootstrap";
import {
  DeskColumns,
  ColumnCards,
  ColumnCard,
  CommentsCounts,
} from "../../App";
import { Column } from "./components";
import styled from "styled-components";
import React, { FC, useState } from "react";

export interface Props {
  columns: DeskColumns;
  cards: ColumnCards;
  commentsCounts: CommentsCounts;
  onAddColumn: (title: string) => void;
  onChangeColumnTitle: (title: string, id: string) => void;
  onRemoveColumn: (id: string) => void;
  onAddCard: (columnId: string, title?: string, text?: string) => void;
  onRemoveCard: (id: string) => void;

  onChangeCardProperty: (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => void;
  onCardClick: (id: string) => void;
}

const MainDesk: FC<Props> = ({
  columns,
  onAddColumn,
  onChangeColumnTitle,
  onRemoveColumn,
  cards,
  onAddCard,
  onRemoveCard,
  onChangeCardProperty,
  onCardClick,
  commentsCounts,
}) => {
  const [isNewColumnEdit, setIsNewColumnEdit] = useState(false);
  const [newColumnText, setnewColumnText] = useState("");

  const handleColumnAdd = () => {
    if (newColumnText.trim()) {
      onAddColumn(newColumnText);
      setIsNewColumnEdit(false);
      setnewColumnText("");
    }
  };
  return (
    <StyledMain>
      <Container fluid>
        <ColumnList>
          {Object.values(columns).map((column) => {
            return (
              <Column
                column={column}
                key={column.id}
                onChangeColumnTitle={onChangeColumnTitle}
                onRemoveColumn={onRemoveColumn}
                cards={cards}
                onAddCard={onAddCard}
                onRemoveCard={onRemoveCard}
                onChangeCardProperty={onChangeCardProperty}
                onCardClick={onCardClick}
                commentsCounts={commentsCounts}
              />
            );
          })}

          <EmptyColumn>
            {!isNewColumnEdit ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setIsNewColumnEdit(true);
                }}
              >
                Add column
              </Button>
            ) : (
              <div>
                <textarea
                  autoFocus
                  rows={1}
                  placeholder="Column title"
                  value={newColumnText}
                  onChange={(e) => setnewColumnText(e.target.value)}
                />

                <button onClick={handleColumnAdd}>Add column</button>

                <button
                  onClick={() => {
                    setIsNewColumnEdit(false);
                    setnewColumnText("");
                  }}
                >
                  x
                </button>
              </div>
            )}
          </EmptyColumn>
        </ColumnList>
      </Container>
    </StyledMain>
  );
};

const StyledMain = styled.main`
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
