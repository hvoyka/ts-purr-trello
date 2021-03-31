import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { defaultColumns, defaultCards } from "./utils/default-data";
import {
  LocalStorageKeys,
  setToLocalStorage,
  loadUserLS,
  loadColumnsLS,
  loadCardsLS,
} from "./utils/local-storage";

export interface IColumn {
  [index: string]: { title: string };
}
export interface ICard {
  [index: string]: {
    columnId: string;
    title: string;
    text: string;
  };
}

function App() {
  const [columns, setColumns] = useState({});

  const [cards, setCards] = useState({});

  const [userName, setUserName] = useState("");
  const [isUserModalShow, setIsUserModalShow] = useState(true);

  useEffect(() => {
    //load username
    const usernameFromLS = loadUserLS();
    if (usernameFromLS) {
      setIsUserModalShow(false);
      setUserName(usernameFromLS);
    }

    //load columns
    const columnsFromLS = loadColumnsLS();
    if (columnsFromLS) {
      setColumns(columnsFromLS);
    } else {
      setColumns(defaultColumns);
      setToLocalStorage(defaultColumns, LocalStorageKeys.COLUMNS);
    }

    //load cards
    const cardsFromLS = loadCardsLS();
    if (cardsFromLS) {
      setCards(cardsFromLS);
    } else {
      setCards(defaultCards);
      setToLocalStorage(defaultCards, LocalStorageKeys.CARDS);
    }
  }, []);

  const addUserName = (name: string) => {
    setUserName(name);
    setToLocalStorage(name, LocalStorageKeys.USER_NAME);
  };

  const onChangeColumnTitle = (title: string, id: string) => {
    const clone = JSON.parse(JSON.stringify(columns));
    clone[id] = { title };

    setColumns(clone);
    setToLocalStorage(clone, LocalStorageKeys.COLUMNS);
  };

  const onAddColumn = (title: string) => {
    const clone = JSON.parse(JSON.stringify(columns));
    clone[uuid()] = { title };

    setColumns(clone);
    setToLocalStorage(clone, LocalStorageKeys.COLUMNS);
  };

  const onRemoveColumn = (id: string) => {
    const clone = JSON.parse(JSON.stringify(columns));
    delete clone[id];

    setColumns(clone);
    setToLocalStorage(clone, LocalStorageKeys.COLUMNS);
  };

  const changeCardTitle = (id: string, title: string) => {
    /*   const newState = cards.map((card) => {
      if (card.id === id) return { ...card, title };
      return card;
    });

    setCards(newState);
    saveCardsLS(newState); */
  };

  const changeCardText = (id: string, text: string) => {
    /*  const newState = cards.map((card) => {
      if (card.id === id) return { ...card, text };
      return card;
    });

    setCards(newState);
    saveCardsLS(newState); */
  };

  const onAddCard = (columnId: string, title = "", text = "") => {
    const clone = JSON.parse(JSON.stringify(cards));
    clone[uuid()] = { columnId, title, text };
    setCards(clone);
    setToLocalStorage(clone, LocalStorageKeys.CARDS);
  };

  const removeCard = (id: string) => {
    /*  const newState = cards.filter((card) => card.id !== id);
    setCards(newState);
    saveCardsLS(newState); */
  };

  return (
    <div className="App">
      <Header name={userName} />
      <UserModal addUserName={addUserName} isUserModalShow={isUserModalShow} />
      <MainDesk
        columns={columns}
        onAddColumn={onAddColumn}
        onChangeColumnTitle={onChangeColumnTitle}
        onRemoveColumn={onRemoveColumn}
        cards={cards}
        onAddCard={onAddCard}
        removeCard={removeCard}
        changeCardTitle={changeCardTitle}
        changeCardText={changeCardText}
      />
    </div>
  );
}

export default App;
