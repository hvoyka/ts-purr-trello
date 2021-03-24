import React, { useState } from "react";

import { Header, MainDesk } from "./components";

function App() {
  const [trelloState, setTrelloState] = useState({
    users: [
      { id: 1, name: "Hvo" },
      { id: 2, name: "Admin" },
    ],
    todo: {
      title: "TODO",
      column: "todo",
      items: [
        { id: 1, title: "First todo item", ownerId: 2 },
        { id: 2, title: "Second todo item", ownerId: 1 },
        { id: 3, title: "Third todo item", ownerId: 1 },
      ],
    },
    progress: {
      title: "In Progres",
      column: "progress",
      items: [
        { id: 1, title: "First progress item", ownerId: 2 },
        { id: 2, title: "Second progress item", ownerId: 2 },
        { id: 3, title: "Third progress item", ownerId: 2 },
      ],
    },
    testing: {
      title: "Testing",
      column: "testing",
      items: [
        { id: 1, title: "First testing item", ownerId: 1 },
        { id: 2, title: "Second testing item", ownerId: 1 },
        { id: 3, title: "Third testing item", ownerId: 1 },
      ],
    },
    done: {
      title: "Done",
      column: "done",
      items: [{ id: 1, title: "First done item", ownerId: 1 }],
    },
  });

  const setColumnTitle = (title: string, columnName: string) => {
    switch (columnName) {
      case "todo":
        setTrelloState({
          ...trelloState,
          todo: { ...trelloState.todo, title },
        });
        break;
      case "progress":
        setTrelloState({
          ...trelloState,
          progress: { ...trelloState.progress, title },
        });
        break;
      case "testing":
        setTrelloState({
          ...trelloState,
          testing: { ...trelloState.testing, title },
        });
        break;
      case "done":
        setTrelloState({
          ...trelloState,
          done: { ...trelloState.done, title },
        });
        break;
      default:
        setTrelloState({
          ...trelloState,
        });
    }
  };

  return (
    <div className="App">
      <Header />
      <MainDesk state={trelloState} setColumnTitle={setColumnTitle} />
    </div>
  );
}

export default App;
