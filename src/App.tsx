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
export type Columns = Record<string, Column>;

export interface ICard {
  [index: string]: {
    id: string;
    columnId: string;
    title: string;
    text: string;
  };
}

function App() {
  const [columns, setColumns] = useState<Columns>({});

  const [cards, setCards] = useState({});

  const [userName, setUserName] = useState("");
  const [isUserModalShow, setIsUserModalShow] = useState(true);

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
    const clone = JSON.parse(JSON.stringify(columns));
    clone[id] = { title };

    setColumns(clone);
    setToLocalStorage(clone, LocalStorageKeys.COLUMNS);
  };

  const onAddColumn = (title: string) => {
    const clone = { ...columns };
    const columnID = uuid();
    clone[columnID] = { id: columnID, title };

    setColumns(clone);
    setToLocalStorage(clone, LocalStorageKeys.COLUMNS);
  };

  const onRemoveColumn = (id: string) => {
    const clone = JSON.parse(JSON.stringify(columns));
    delete clone[id];

    setColumns(clone);
    setToLocalStorage(clone, LocalStorageKeys.COLUMNS);
  };

  const onChangeCardTitle = (id: string, title: string) => {
    const newState: Record<string, any> = { ...cards };
    newState[id].title = title;
    setCards(newState);
    setToLocalStorage(newState, LocalStorageKeys.CARDS);
  };

  const onChangeCardText = (id: string, text: string) => {
    const newState: Record<string, any> = { ...cards };
    newState[id].text = text;
    setCards(newState);
    setToLocalStorage(newState, LocalStorageKeys.CARDS);
  };

  const onAddCard = (columnId: string, title = "", text = "") => {
    const clone = JSON.parse(JSON.stringify(cards));
    const cardID = uuid();
    clone[cardID] = { id: cardID, columnId, title, text };
    setCards(clone);
    setToLocalStorage(clone, LocalStorageKeys.CARDS);
  };

  const onRemoveCard = (id: string) => {
    const newState = { ...cards };
    delete newState[id as keyof typeof cards];
    setCards(newState);
    setToLocalStorage(newState, LocalStorageKeys.CARDS);
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
        onRemoveCard={onRemoveCard}
        onChangeCardTitle={onChangeCardTitle}
        onChangeCardText={onChangeCardText}
      />
    </div>
  );
}

export default App;
