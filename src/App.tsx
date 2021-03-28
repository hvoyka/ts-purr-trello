import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk, UserModal } from "./components";
import { saveUserLS, loadUserLS } from "./utils/local-storage";

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

export interface IColumns {
  columns: IColumn[];
  cards: ICard[];
  addColumn: (title: string) => void;
  changeColumnTitle: (title: string, id: string) => void;
  removeColumn: (id: string) => void;
  addCard: (title: string, columnId: string, text: string) => void;
  removeCard: (id: string) => void;
  changeCardTitle: (title: string, id: string) => void;
}
export interface IUser {
  user: string;
}

export interface IComments {
  [index: number]: {
    id: string;
    cardId: string;
    text: string;
    author: string;
  };
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
  const [isModalShow, setIsModalShow] = useState(true);

  useEffect(() => {
    const usernameFromLS = loadUserLS();
    if (usernameFromLS) {
      setIsModalShow(false);
      setUserName(usernameFromLS);
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

    setColumns([...newState]);
  };

  const addColumn = (title: string) => {
    setColumns([...columns, { title, id: uuid() }]);
  };

  const removeColumn = (id: string) => {
    const newState = columns.filter((column) => column.id !== id);
    setColumns(newState);
  };
  const changeCardTitle = (id: string, title: string) => {
    const newState = cards.map((card) => {
      if (card.id === id) return { ...card, title };
      return card;
    });

    setCards(newState);
  };
  const addCard = (title: string, text: string, columnId: string) => {
    setCards([...cards, { id: uuid(), columnId, title, text }]);
  };

  const removeCard = (id: string) => {
    const newState = cards.filter((card) => card.id !== id);
    setCards(newState);
  };

  return (
    <div className="App">
      <Header name={userName} />
      <UserModal addUserName={addUserName} isModalShow={isModalShow} />
      <MainDesk
        columns={columns}
        addColumn={addColumn}
        changeColumnTitle={changeColumnTitle}
        removeColumn={removeColumn}
        cards={cards}
        addCard={addCard}
        removeCard={removeCard}
        changeCardTitle={changeCardTitle}
      />
    </div>
  );
}

export default App;
