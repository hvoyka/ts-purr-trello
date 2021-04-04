import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { CardModal } from "./components/CardModal";

import { LocalStorageKeys, setToLocalStorage } from "./utils/local-storage";

import {
  setUserNameData,
  setColumnsData,
  setCardsData,
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

export type DeskColumns = Record<string, DeskColumn>;
export type ColumnCards = Record<string, ColumnCard>;

function App() {
  const [columns, setColumns] = useState<DeskColumns>(setColumnsData());
  const [cards, setCards] = useState<ColumnCards>(setCardsData());
  const [userName, setUserName] = useState(setUserNameData());
  const [isUserModalShow, setIsUserModalShow] = useState(true);
  const [isShowCardModal, setIsShowCardModal] = useState(false);
  const [idCardModal, setIdCardModal] = useState("");

  useEffect(() => {
    if (userName) setIsUserModalShow(false);
  }, [userName]);

  const onUserModalClose = () => {
    setIsUserModalShow(false);
  };

  const onCardModalClose = () => {
    setIsShowCardModal(false);
  };

  const onCardModalOpen = (id: string) => {
    setIdCardModal(id);
    setIsShowCardModal(true);
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
      />

      <UserModal
        addUserName={addUserName}
        isUserModalShow={isUserModalShow}
        onUserModalClose={onUserModalClose}
      />
      {isShowCardModal ? (
        <CardModal
          isCardModalShow={isShowCardModal}
          onCardModalClose={onCardModalClose}
          id={idCardModal}
          title={cards[idCardModal].title}
          text={cards[idCardModal].text}
          onChangeCardProperty={onChangeCardProperty}
        />
      ) : null}
    </div>
  );
}

export default App;
