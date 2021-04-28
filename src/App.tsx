import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { CardModal } from "./components/CardModal";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { onAddUser } from "./redux/ducks/user/userSlice";
import {
  onCardTitleChange,
  onCardTextChange,
} from "./redux/ducks/cards/cardsSlice";

function App() {
  const [cardIdForModalView, setCardIdForModalView] = useState("");
  const [columnIdWithCardAdding, setColumnIdWithCardAdding] = useState("");

  const userName = useAppSelector((state) => state.user.name);
  const cards = useAppSelector((state) => state.cards.data);
  const columns = useAppSelector((state) => state.columns.data);
  const comments = useAppSelector((state) => state.comments.data);
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
  };

  const onCommentRemoveClick = (id: string) => {
    const cloneComments = { ...comments };
    delete cloneComments[id];
  };

  const onCommentChange = (id: string, text: string) => {
    const cloneComments = { ...comments };
    cloneComments[id].text = text;
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
