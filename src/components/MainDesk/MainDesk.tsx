import { Container, Button } from "react-bootstrap";
import { DeskColumns, ColumnCards, ColumnCard, CardComments } from "../../App";
import { Column } from "./components";
import styled from "styled-components";
import { FC, useState, KeyboardEvent } from "react";
import { TextArea } from "../ui";
import { Form, Field } from "react-final-form";
import { required } from "../../utils/validators";

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
  columnIdWithCardAdding: string;
  onCardAddingClose: () => void;
  onAddCardClick: (columnId: string) => void;
}

interface AddColumnFormValues {
  columnTitle?: string;
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
  columnIdWithCardAdding,
  onCardAddingClose,
  onAddCardClick,
}) => {
  const [isColumnAdding, setIsColumnAdding] = useState(false);

  const handleEditTitleClose = () => {
    setIsColumnAdding(false);
  };

  const onSubmit = ({ columnTitle }: AddColumnFormValues) => {
    if (columnTitle) {
      onColumnAdd(columnTitle);
      handleEditTitleClose();
    }
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
                  isNewCardAdding={columnIdWithCardAdding === column.id}
                  onCardAddingClose={onCardAddingClose}
                  onAddCardClick={() => onAddCardClick(column.id)}
                />
              );
            })}
          </ColumnList>
          <EmptyColumn>
            {isColumnAdding ? (
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, pristine }) => (
                  <form onSubmit={handleSubmit}>
                    <Field<string>
                      name="columnTitle"
                      validate={required}
                      onKeyDown={(
                        event: KeyboardEvent<HTMLTextAreaElement>
                      ) => {
                        if (event.key === "Enter") handleSubmit();
                      }}
                      render={({ input: { onChange, value } }) => {
                        return (
                          <TextArea
                            onChange={onChange}
                            value={value}
                            autoFocus
                            maxRows={1}
                            placeholder="Column title"
                            spellCheck={false}
                          />
                        );
                      }}
                    />
                    <ColumnButtonsWrapper>
                      <AddColumnBtn disabled={submitting || pristine}>
                        Add column
                      </AddColumnBtn>
                      <CloseAddColumnBlockBtn
                        type="button"
                        onClick={handleEditTitleClose}
                      >
                        x
                      </CloseAddColumnBlockBtn>
                    </ColumnButtonsWrapper>
                  </form>
                )}
              />
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setIsColumnAdding(true);
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

const ColumnButtonsWrapper = styled.div`
  display: flex;
`;

const AddColumnBtn = styled.button`
  flex: 1 0 50%;
`;
const CloseAddColumnBlockBtn = styled.button`
  flex: 1 0 50%;
`;

export default MainDesk;
