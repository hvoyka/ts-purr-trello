import { useState } from "react";
import { Header, MainDesk, UserModal } from "./components";
import { CardModal } from "./components/CardModal";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { addUser } from "./redux/ducks/user";
import { changeCardTitle, changeCardText } from "./redux/ducks/cards";

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

  const addCardingClose = () => {
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
    dispatch(addUser(name));
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
          addCardingClose={addCardingClose}
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
        changeCardTitle={(title) =>
          dispatch(changeCardTitle({ id: cardIdForModalView, title }))
        }
        changeCardText={(text) =>
          dispatch(changeCardText({ id: cardIdForModalView, text }))
        }
      />
    </div>
  );
}

export default App;
