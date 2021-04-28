import React, { useState, SetStateAction } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { CardModal } from "./components/CardModal";

import { LocalStorageKeys, setToLocalStorage } from "./utils/local-storage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { onAddUser } from "./redux/ducks/user/userSlice";
import {
  onCardTitleChange,
  onCardTextChange,
} from "./redux/ducks/cards/cardsSlice";

import { initCommentsData } from "./utils/init-default-data";

export interface CardComment {
  id: string;
  cardId: string;
  text: string;
  author: string;
}

export type CardComments = Record<string, CardComment>;

function App() {
  const [comments, setComments] = useState<CardComments>(initCommentsData);
  const [cardIdForModalView, setCardIdForModalView] = useState("");
  const [columnIdWithCardAdding, setColumnIdWithCardAdding] = useState("");

  const userName = useAppSelector((state) => state.user.name);
  const cards = useAppSelector((state) => state.cards.data);
  const columns = useAppSelector((state) => state.columns.data);
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

  const setCommentsData = (cloneComments: SetStateAction<CardComments>) => {
    setComments(cloneComments);
    setToLocalStorage(cloneComments, LocalStorageKeys.COMMENTS);
  };

  const onUserNameAdd = (name: string) => {
    dispatch(onAddUser(name));
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
          columns={columns}
          cards={cards}
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
        onCardTitleChange={(title) =>
          dispatch(onCardTitleChange(cardIdForModalView, title))
        }
        onCardTextChange={(text) =>
          dispatch(onCardTextChange(cardIdForModalView, text))
        }
        onCommentAdd={onCommentAdd}
        onCommentRemoveClick={onCommentRemoveClick}
        onCommentChange={onCommentChange}
      />
    </div>
  );
}

export default App;
