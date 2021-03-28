import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk } from "./components";

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

  const [user, setUser] = useState("Hvo");

  const changeColumnTitle = (title: string, id: string) => {
    const newState = columns.map((column) => {
      if (column.id === id) return { title, id };
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

  const addCard = (title: string, text: string, columnId: string) => {
    setCards([...cards, { id: uuid(), columnId, title, text }]);
  };

  return (
    <div className="App">
      <Header name={user} />
      <MainDesk
        columns={columns}
        addColumn={addColumn}
        changeColumnTitle={changeColumnTitle}
        removeColumn={removeColumn}
        cards={cards}
        addCard={addCard}
      />
    </div>
  );
}

export default App;
