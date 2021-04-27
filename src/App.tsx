import React, { useState, SetStateAction } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { CardModal } from "./components/CardModal";

import { LocalStorageKeys, setToLocalStorage } from "./utils/local-storage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { onAddUser } from "./redux/ducks/user/userSlice";

import {
  initColumnsData,
  initCardsData,
  initCommentsData,
} from "./utils/init-default-data";

export interface DeskColumn {
  id: string;
  title: string;
}
export interface ColumnCard {
  id: string;
  columnId: string;
  title: string;
  text: string;
  author: string;
}

export interface CardComment {
  id: string;
  cardId: string;
  text: string;
  author: string;
}

export type DeskColumns = Record<string, DeskColumn>;
export type ColumnCards = Record<string, ColumnCard>;
export type CardComments = Record<string, CardComment>;

function App() {
  const [columns, setColumns] = useState<DeskColumns>(initColumnsData);
  const [cards, setCards] = useState<ColumnCards>(initCardsData);
  const [comments, setComments] = useState<CardComments>(initCommentsData);
  const [cardIdForModalView, setCardIdForModalView] = useState("");
  const [columnIdWithCardAdding, setColumnIdWithCardAdding] = useState("");

  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  const onAddCardClick = (columnId: string) => {
    setColumnIdWithCardAdding(columnId);
  };

  const onCardAddingClose = () => {
    setColumnIdWithCardAdding("");
  };

  const onCardModalClose = () => {
    setCardIdForModalView("");
  };

  const onCardClick = (id: string) => {
    setCardIdForModalView(id);
    setColumnIdWithCardAdding("");
  };

  const setCardsData = (cloneCards: SetStateAction<ColumnCards>) => {
    setCards(cloneCards);
    setToLocalStorage(cloneCards, LocalStorageKeys.CARDS);
  };

  const setCommentsData = (cloneComments: SetStateAction<CardComments>) => {
    setComments(cloneComments);
    setToLocalStorage(cloneComments, LocalStorageKeys.COMMENTS);
  };

  const onUserNameAdd = (name: string) => {
    dispatch(onAddUser(name));
  };

  const onCardPropertyChange = (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => {
    const cloneCards = { ...cards };
    cloneCards[id][propertyName] = value;

    setCardsData(cloneCards);
  };

  const onCardAdd = (columnId: string, title: string, text: string = "") => {
    const cloneCards = { ...cards };
    const cardID = uuid();

    cloneCards[cardID] = {
      id: cardID,
      columnId,
      title,
      text,
      author: userName,
    };

    setCardsData(cloneCards);
  };

  const onCardRemoveClick = (id: string) => {
    const cloneCards = { ...cards };
    delete cloneCards[id];

    setCardsData(cloneCards);
  };

  const onCommentAdd = (cardId: string, text: string) => {
    const cloneComments = { ...comments };
    const commentID = uuid();

    cloneComments[commentID] = {
      id: commentID,
      cardId,
      text,
      author: userName,
    };

    setCommentsData(cloneComments);
  };

  const onCommentRemoveClick = (id: string) => {
    const cloneComments = { ...comments };
    delete cloneComments[id];

    setCommentsData(cloneComments);
  };

  const onCommentChange = (id: string, text: string) => {
    const cloneComments = { ...comments };
    cloneComments[id].text = text;

    setCommentsData(cloneComments);
  };

  const getColumnTitle = (cardIdForModalView: string): string => {
    const cardForModalView = cards[cardIdForModalView];
    const columnIdFromCard = cardForModalView?.columnId;
    const columnWithThisCard = columns[columnIdFromCard];

    return columnWithThisCard?.title;
  };

  return (
    <div className="App">
      <Header name={userName} />

      {userName ? (
        <MainDesk
          cards={cards}
          onCardAdd={onCardAdd}
          onCardRemoveClick={onCardRemoveClick}
          onCardPropertyChange={onCardPropertyChange}
          onCardClick={onCardClick}
          comments={comments}
          columnIdWithCardAdding={columnIdWithCardAdding}
          onCardAddingClose={onCardAddingClose}
          onAddCardClick={onAddCardClick}
        />
      ) : (
        <UserModal onConfirmClick={onUserNameAdd} isVisible={!userName} />
      )}

      <CardModal
        isVisible={!!cardIdForModalView}
        onClose={onCardModalClose}
        card={cards[cardIdForModalView]}
        columnTitle={getColumnTitle(cardIdForModalView)}
        comments={comments}
        onTextAreaChange={(propertyName, value) =>
          onCardPropertyChange(cardIdForModalView, propertyName, value)
        }
        onCommentAdd={onCommentAdd}
        onCommentRemoveClick={onCommentRemoveClick}
        onCommentChange={onCommentChange}
      />
    </div>
  );
}

export default App;
