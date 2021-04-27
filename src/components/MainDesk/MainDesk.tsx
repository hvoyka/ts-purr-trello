import { Container, Button } from "react-bootstrap";
import { ColumnCards, ColumnCard, CardComments } from "../../App";
import { Column } from "./components";
import styled from "styled-components";
import { FC, useState, KeyboardEvent } from "react";
import { TextArea } from "../ui";
import { Form, Field } from "react-final-form";
import { notEmpty } from "../../utils/validate";
import { useAppDispatch } from "../../redux/hooks";
import {
  onColumnAdd,
  onColumnRemove,
  onColumnTitleChange,
  DeskColumns,
} from "../../redux/ducks/columns/columnsSlice";

export interface MainDeskProps {
  cards: ColumnCards;
  comments: CardComments;
  columns: DeskColumns;

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
  cards,

  onCardPropertyChange,
  onCardClick,
  comments,
  columnIdWithCardAdding,
  onCardAddingClose,
  onAddCardClick,
}) => {
  const [isColumnAdding, setIsColumnAdding] = useState(false);

  const dispatch = useAppDispatch();

  const handleEditTitleClose = () => {
    setIsColumnAdding(false);
  };

  const onSubmit = async ({ columnTitle }: Values) => {
    if (columnTitle) {
      dispatch(onColumnAdd(columnTitle));

      handleEditTitleClose();
    }
  };
  const handleColumnAreaEnterPress = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      const trimmedValue = event.currentTarget.value.trim();
      if (trimmedValue) {
        dispatch(onColumnAdd(trimmedValue));
      }
      handleEditTitleClose();
    }
  };
  const handleColumnRemove = (id: string) => {
    dispatch(onColumnRemove(id));
  };
  const handleColumnTitleChange = (id: string, title: string) => {
    dispatch(onColumnTitleChange(id, title));
  };

  return (
    <Main>
      <Container fluid>
        <DeskWrapper>
          <ColumnList>
            {Object.values(columns).map((column) => {
              console.log(column);
              return (
                <Column
                  column={column}
                  key={column.id}
                  onTitleChange={(value) =>
                    handleColumnTitleChange(column.id, value)
                  }
                  onRemoveClick={() => handleColumnRemove(column.id)}
                  cards={cards}
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
                      <AddCardBtn
                        type="submit"
                        disabled={submitting || pristine}
                      >
                        Add column
                      </AddCardBtn>

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
