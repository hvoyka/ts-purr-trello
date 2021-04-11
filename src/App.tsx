import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { CardModal } from "./components/CardModal";

import { LocalStorageKeys, setToLocalStorage } from "./utils/local-storage";

import {
  initUserNameData,
  initColumnsData,
  initCardsData,
  initCommentsData,
} from "./utils/init-default-data";

export enum CardPropertyKeys {
  TITLE = "title",
  TEXT = "text",
}

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
  const [userName, setUserName] = useState(initUserNameData);
  const [isUserModalShow, setIsUserModalShow] = useState(true);
  const [cardIdForModalView, setcardIdForModalView] = useState("");

  useEffect(() => {
    if (userName) setIsUserModalShow(false);
  }, [userName]);

  const onUserModalClose = () => {
    setIsUserModalShow(false);
  };

  const onCardModalClose = () => {
    setcardIdForModalView("");
  };

  const onCardClick = (id: string) => {
    setcardIdForModalView(id);
  };

  const onUserNameAdd = (name: string) => {
    setUserName(name);
    setToLocalStorage(name, LocalStorageKeys.USER_NAME);
  };

  const onColumnTitleChange = (title: string, id: string) => {
    const cloneColumns = { ...columns };
    cloneColumns[id] = { id, title };

    setColumns(cloneColumns);
    setToLocalStorage(cloneColumns, LocalStorageKeys.COLUMNS);
  };

  const onColumnAdd = (title: string) => {
    const cloneColumns = { ...columns };
    const columnID = uuid();
    cloneColumns[columnID] = { id: columnID, title };

    setColumns(cloneColumns);
    setToLocalStorage(cloneColumns, LocalStorageKeys.COLUMNS);
  };

  const onColumnRemove = (id: string) => {
    const cloneColumns = { ...columns };
    delete cloneColumns[id];

    setColumns(cloneColumns);
    setToLocalStorage(cloneColumns, LocalStorageKeys.COLUMNS);
  };

  const onCardPropertyChange = (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => {
    const cloneCards = { ...cards };
    cloneCards[id][propertyName] = value;

    setCards(cloneCards);
    setToLocalStorage(cloneCards, LocalStorageKeys.CARDS);
  };

  const onCardAdd = (columnId: string, title: string, text: string) => {
    const cloneCards = { ...cards };
    const cardID = uuid();

    cloneCards[cardID] = {
      id: cardID,
      columnId,
      title,
      text,
      author: userName,
    };

    setCards(cloneCards);
    setToLocalStorage(cloneCards, LocalStorageKeys.CARDS);
  };

  const onCardRemove = (id: string) => {
    const cloneCards = { ...cards };
    delete cloneCards[id];

    setCards(cloneCards);
    setToLocalStorage(cloneCards, LocalStorageKeys.CARDS);
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

    setComments(cloneComments);
    setToLocalStorage(cloneComments, LocalStorageKeys.COMMENTS);
  };

  const onCommentRemove = (id: string) => {
    const cloneComments = { ...comments };
    delete cloneComments[id];

    setComments(cloneComments);
    setToLocalStorage(cloneComments, LocalStorageKeys.COMMENTS);
  };

  const onCommentChange = (id: string, text: string) => {
    const cloneComments = { ...comments };
    cloneComments[id].text = text;

    setComments(cloneComments);
    setToLocalStorage(cloneComments, LocalStorageKeys.COMMENTS);
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
      <MainDesk
        columns={columns}
        onColumnAdd={onColumnAdd}
        onColumnTitleChange={onColumnTitleChange}
        onColumnRemove={onColumnRemove}
        cards={cards}
        onCardAdd={onCardAdd}
        onCardRemove={onCardRemove}
        onCardPropertyChange={onCardPropertyChange}
        onCardClick={onCardClick}
        comments={comments}
      />

      <UserModal
        onConfirmClick={onUserNameAdd}
        isVisible={isUserModalShow}
        onClose={onUserModalClose}
      />

      <CardModal
        isVisible={Boolean(cardIdForModalView)}
        onClose={onCardModalClose}
        card={cards[cardIdForModalView]}
        columnTitle={getColumnTitle(cardIdForModalView)}
        comments={comments}
        onTextAreaChange={(propertyName, value) =>
          onCardPropertyChange(cardIdForModalView, propertyName, value)
        }
        onCommentAdd={onCommentAdd}
        onCommentRemove={onCommentRemove}
        onCommentChange={onCommentChange}
      />
    </div>
  );
}

export default App;
