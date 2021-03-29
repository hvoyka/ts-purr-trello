import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import {
  saveUserLS,
  loadUserLS,
  saveColumnsLS,
  loadColumnsLS,
  saveCardsLS,
  loadCardsLS,
} from "./utils/local-storage";

export interface IColumn {
  title: string;
  id: string;
}
export interface ICard {
  id: string;
  columnId: string;
  title: string;
  text: string;
}

function App() {
  const [columns, setColumns] = useState([
    {
      title: "TODO",
      id: uuid(),
    },
    {
      title: "In Progres",
      id: uuid(),
    },
    {
      title: "Testing",
      id: uuid(),
    },
    {
      title: "Done",
      id: uuid(),
    },
  ]);

  const [cards, setCards] = useState([
    {
      id: uuid(),
      columnId: "11111",
      title: "First card",
      text: "First text",
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: uuid(),
      cardId: "",
      text: "First text",
      author: "Hvo",
    },
  ]);

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
      saveColumnsLS(columns);
    }

    //load cards
    const cardsFromLS = loadCardsLS();
    if (cardsFromLS) {
      setCards(cardsFromLS);
    }
  }, []);

  const addUserName = (name: string) => {
    setUserName(name);
    saveUserLS(name);
  };

  const changeColumnTitle = (title: string, id: string) => {
    const newState = columns.map((column) => {
      if (column.id === id) return { ...column, title };
      return column;
    });

    setColumns(newState);
    saveColumnsLS(newState);
  };

  const addColumn = (title: string) => {
    const newState = [...columns, { title, id: uuid() }];
    setColumns(newState);
    saveColumnsLS(newState);
  };

  const removeColumn = (id: string) => {
    const newState = columns.filter((column) => column.id !== id);
    setColumns(newState);
    saveColumnsLS(newState);
  };

  const changeCardTitle = (id: string, title: string) => {
    const newState = cards.map((card) => {
      if (card.id === id) return { ...card, title };
      return card;
    });

    setCards(newState);
    saveCardsLS(newState);
  };

  const changeCardText = (id: string, text: string) => {
    const newState = cards.map((card) => {
      if (card.id === id) return { ...card, text };
      return card;
    });

    setCards(newState);
    saveCardsLS(newState);
  };

  const addCard = (title: string, text: string, columnId: string) => {
    const newState = [...cards, { id: uuid(), columnId, title, text }];
    setCards(newState);
    saveCardsLS(newState);
  };

  const removeCard = (id: string) => {
    const newState = cards.filter((card) => card.id !== id);
    setCards(newState);
    saveCardsLS(newState);
  };

  return (
    <div className="App">
      <Header name={userName} />
      <UserModal addUserName={addUserName} isUserModalShow={isUserModalShow} />
      <MainDesk
        columns={columns}
        addColumn={addColumn}
        changeColumnTitle={changeColumnTitle}
        removeColumn={removeColumn}
        cards={cards}
        addCard={addCard}
        removeCard={removeCard}
        changeCardTitle={changeCardTitle}
        changeCardText={changeCardText}
      />
    </div>
  );
}

export default App;
