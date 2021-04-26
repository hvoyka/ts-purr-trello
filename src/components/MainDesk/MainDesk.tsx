import { Container, Button } from "react-bootstrap";
import { DeskColumns, ColumnCards, ColumnCard, CardComments } from "../../App";
import { Column } from "./components";
import styled from "styled-components";
import { FC, useState, KeyboardEvent } from "react";
import { TextArea } from "../ui";
import { Form, Field } from "react-final-form";
import { notEmpty } from "../../utils/validate";

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

interface Values {
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

  const onSubmit = async ({ columnTitle }: Values) => {
    if (columnTitle) {
      onColumnAdd(columnTitle);
      handleEditTitleClose();
    }
  };
  const handleColumnAreaEnterPress = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      const trimmedValue = event.currentTarget.value.trim();
      if (trimmedValue) {
        onColumnAdd(trimmedValue);
      }
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
                      autoFocus
                      maxRows={1}
                      placeholder="Column title"
                      spellCheck={false}
                      validate={notEmpty}
                      onKeyDown={handleColumnAreaEnterPress}
                      render={({
                        input: { onChange, value },
                        meta,
                        ...props
                      }) => {
                        return (
                          <TextArea
                            onChange={onChange}
                            value={value}
                            {...props}
                          />
                        );
                      }}
                    />
                    <CardButtonsWrapper>
                      <AddCardBtn type="submit">Add column</AddCardBtn>
                      <CloseAddCardBlockBtn
                        type="button"
                        onClick={handleEditTitleClose}
                      >
                        x
                      </CloseAddCardBlockBtn>
                    </CardButtonsWrapper>
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

const CardButtonsWrapper = styled.div`
  display: flex;
`;

const AddCardBtn = styled.button`
  flex: 1 0 50%;
`;
const CloseAddCardBlockBtn = styled.button`
  flex: 1 0 50%;
`;

export default MainDesk;
