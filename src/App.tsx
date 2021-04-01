import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { defaultColumns, defaultCards } from "./utils/default-data";
import {
  LocalStorageKeys,
  setToLocalStorage,
  loadFromLocalStorage,
} from "./utils/local-storage";

export interface Column {
  id: string;
  title: string;
}
export interface Card {
  id: string;
  columnId: string;
  title: string;
  text: string;
}
export type Columns = Record<string, Column>;
export type Cards = Record<string, Card>;

function App() {
  const [columns, setColumns] = useState<Columns>({});

  const [cards, setCards] = useState<Cards>({});

  const [userName, setUserName] = useState("");
  const [isUserModalShow, setIsUserModalShow] = useState(true);
  const onUserModalClose = () => {
    setIsUserModalShow(false);
  };

  useEffect(() => {
    //load username
    const usernameFromLS = loadFromLocalStorage(LocalStorageKeys.USER_NAME);
    if (usernameFromLS) {
      setIsUserModalShow(false);
      setUserName(usernameFromLS);
    }

    //load columns
    const columnsFromLS = loadFromLocalStorage(LocalStorageKeys.COLUMNS);
    if (columnsFromLS) {
      setColumns(columnsFromLS);
    } else {
      setColumns(defaultColumns);
      setToLocalStorage(defaultColumns, LocalStorageKeys.COLUMNS);
    }

    //load cards
    const cardsFromLS = loadFromLocalStorage(LocalStorageKeys.CARDS);
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

  const onChangeCardTitle = (id: string, title: string) => {
    const cloneState = { ...cards };
    cloneState[id].title = title;
    setCards(cloneState);
    setToLocalStorage(cloneState, LocalStorageKeys.CARDS);
  };

  const onChangeCardText = (id: string, text: string) => {
    const cloneState = { ...cards };
    cloneState[id].text = text;
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

  return (
    <div className="App">
      <Header name={userName} />

      <UserModal
        addUserName={addUserName}
        isUserModalShow={isUserModalShow}
        onUserModalClose={onUserModalClose}
      />

      <MainDesk
        columns={columns}
        onAddColumn={onAddColumn}
        onChangeColumnTitle={onChangeColumnTitle}
        onRemoveColumn={onRemoveColumn}
        cards={cards}
        onAddCard={onAddCard}
        onRemoveCard={onRemoveCard}
        onChangeCardTitle={onChangeCardTitle}
        onChangeCardText={onChangeCardText}
      />
    </div>
  );
}

export default App;
