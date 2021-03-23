import React, { useState } from "react";
import "./assets/styles/bootstrap.min.css";
import GlobalStyle from "./assets/styles/globalStyles.elements";
import { Header, MainDesk } from "./components";

function App() {
  const [trelloState, setTrelloState] = useState({
    users: [
      { id: 1, name: "Hvo" },
      { id: 2, name: "Admin" },
    ],
    todo: {
      title: "TODO",
      items: [
        { id: 1, title: "First todo item", ownerId: 2 },
        { id: 2, title: "Second todo item", ownerId: 1 },
        { id: 3, title: "Third todo item", ownerId: 1 },
      ],
    },
    progress: {
      title: "In Progres",
      items: [
        { id: 1, title: "First progress item", ownerId: 2 },
        { id: 2, title: "Second progress item", ownerId: 2 },
        { id: 3, title: "Third progress item", ownerId: 2 },
      ],
    },
    testing: {
      title: "Testing",
      items: [
        { id: 1, title: "First testing item", ownerId: 1 },
        { id: 2, title: "Second testing item", ownerId: 1 },
        { id: 3, title: "Third testing item", ownerId: 1 },
      ],
    },
    done: {
      title: "Done",
      items: [{ id: 1, title: "First done item", ownerId: 1 }],
    },
  });

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <MainDesk state={trelloState} />
    </div>
  );
}

export default App;
