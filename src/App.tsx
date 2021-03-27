import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk } from "./components";

export interface IColumn {
  title: string;
  id: string;
}

export interface IColumns {
  columns: IColumn[];
}
export interface IUser {
  user: string;
}
export interface ICard {
  [index: number]: {
    id: string;
    columnId: string;
    title: string;
    text: string;
  };
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
      columnId: "",
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

  return (
    <div className="App">
      <Header name={user} />
      <MainDesk columns={columns} />
    </div>
  );
}

export default App;
