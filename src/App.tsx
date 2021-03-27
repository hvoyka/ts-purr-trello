import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Header, MainDesk } from "./components";

export interface IColumns {
  [index: number]: { title: string; id: string };
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

  return (
    <div className="App">
      <Header />
      <MainDesk columns={columns} />
    </div>
  );
}

export default App;
