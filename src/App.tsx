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

export interface CommentCount {
  id: string;
  count: number;
}

export type DeskColumns = Record<string, DeskColumn>;
export type ColumnCards = Record<string, ColumnCard>;
export type CardComments = Record<string, CardComment>;
export type CommentsCounts = Record<string, CommentCount>;

function App() {
  const [columns, setColumns] = useState<DeskColumns>(initColumnsData);
  const [cards, setCards] = useState<ColumnCards>(initCardsData);
  const [comments, setComments] = useState<CardComments>(initCommentsData);
  const [userName, setUserName] = useState(initUserNameData);
  const [isUserModalShow, setIsUserModalShow] = useState(true);
  const [cardIdForModalView, setcardIdForModalView] = useState("");
  const [commentsCounts, setCommentsCounts] = useState<CommentsCounts>({
    "1": { id: "1", count: 0 },
  });

  useEffect(() => {
    const result: CommentsCounts = {};
    Object.values(comments).forEach((comment) => {
      result[comment.cardId] = result[comment.cardId]
        ? {
            ...result[comment.cardId],
            count: result[comment.cardId].count + 1,
          }
        : { id: comment.cardId, count: 1 };
    });
    setCommentsCounts(result);
  }, [comments]);

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

  const onCardAdd = (columnId: string, title = "", text = "") => {
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

  const onCommentAdd = (cardId: string, text = "") => {
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
    cloneComments[id] = { ...cloneComments[id], text };

    setComments(cloneComments);
    setToLocalStorage(cloneComments, LocalStorageKeys.COMMENTS);
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
        commentsCounts={commentsCounts}
      />

      <UserModal
        onUserNameAdd={onUserNameAdd}
        isUserModalShow={isUserModalShow}
        onUserModalClose={onUserModalClose}
      />

      <CardModal
        isCardModalShow={Boolean(cardIdForModalView)}
        onCardModalClose={onCardModalClose}
        card={cards[cardIdForModalView]}
        columnTitle={columns[cards[cardIdForModalView]?.columnId]?.title}
        comments={comments}
        onCardPropertyChange={onCardPropertyChange}
        onCommentAdd={onCommentAdd}
        onCommentRemove={onCommentRemove}
        onCommentChange={onCommentChange}
      />
    </div>
  );
}

export default App;
