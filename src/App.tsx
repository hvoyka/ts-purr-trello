import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { CardModal } from "./components/CardModal";

import { LocalStorageKeys, setToLocalStorage } from "./utils/local-storage";

import {
  setUserNameData,
  setColumnsData,
  setCardsData,
  setCommentsData,
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
  const [columns, setColumns] = useState<DeskColumns>(setColumnsData());
  const [cards, setCards] = useState<ColumnCards>(setCardsData());
  const [comments, setComments] = useState<CardComments>(setCommentsData());
  const [userName, setUserName] = useState(setUserNameData());
  const [isUserModalShow, setIsUserModalShow] = useState(true);
  const [idCardModal, setIdCardModal] = useState("");
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
    setIdCardModal("");
  };

  const onCardModalOpen = (id: string) => {
    setIdCardModal(id);
  };

  const addUserName = (name: string) => {
    setUserName(name);
    setToLocalStorage(name, LocalStorageKeys.USER_NAME);
  };

  const onChangeColumnTitle = (title: string, id: string) => {
    const cloneState = { ...columns };
    cloneState[id] = { id, title };

    setColumns(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.COLUMNS);
  };

  const onAddColumn = (title: string) => {
    const cloneState = { ...columns };
    const columnID = uuid();
    cloneState[columnID] = { id: columnID, title };

    setColumns(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.COLUMNS);
  };

  const onRemoveColumn = (id: string) => {
    const cloneState = { ...columns };
    delete cloneState[id];

    setColumns(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.COLUMNS);
  };

  const onChangeCardProperty = (
    id: string,
    propertyName: keyof ColumnCard,
    value: string
  ) => {
    const cloneState = { ...cards };
    cloneState[id][propertyName] = value;

    setCards(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.CARDS);
  };

  const onAddCard = (columnId: string, title = "", text = "") => {
    const cloneState = { ...cards };
    const cardID = uuid();
    cloneState[cardID] = { id: cardID, columnId, title, text };

    setCards(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.CARDS);
  };

  const onRemoveCard = (id: string) => {
    const cloneState = { ...cards };
    delete cloneState[id];

    setCards(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.CARDS);
  };

  const onAddComent = (cardId: string, text = "") => {
    const cloneState = { ...comments };
    const commentID = uuid();
    cloneState[commentID] = {
      id: commentID,
      cardId,
      text,
      author: userName,
    };

    setComments(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.COMMENTS);
  };

  const onRemoveComment = (id: string) => {
    const cloneState = { ...comments };
    delete cloneState[id];

    setComments(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.COMMENTS);
  };

  const onChangeComment = (id: string, text: string) => {
    const cloneState = { ...comments };
    cloneState[id] = { ...cloneState[id], text };

    setComments(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.COMMENTS);
  };

  return (
    <div className="App">
      <Header name={userName} />
      <MainDesk
        columns={columns}
        onAddColumn={onAddColumn}
        onChangeColumnTitle={onChangeColumnTitle}
        onRemoveColumn={onRemoveColumn}
        cards={cards}
        onAddCard={onAddCard}
        onRemoveCard={onRemoveCard}
        onChangeCardProperty={onChangeCardProperty}
        onCardModalOpen={onCardModalOpen}
        commentsCounts={commentsCounts}
      />

      <UserModal
        addUserName={addUserName}
        isUserModalShow={isUserModalShow}
        onUserModalClose={onUserModalClose}
      />

      <CardModal
        isCardModalShow={Boolean(idCardModal)}
        onCardModalClose={onCardModalClose}
        card={cards[idCardModal]}
        comments={comments}
        onChangeCardProperty={onChangeCardProperty}
        onAddComent={onAddComent}
        onRemoveComment={onRemoveComment}
        onChangeComment={onChangeComment}
      />
    </div>
  );
}

export default App;
