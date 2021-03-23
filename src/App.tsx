import React from "react";
import "./assets/styles/bootstrap.min.css";
import GlobalStyle from "./assets/styles/globalStyles.elements";
import { Header, MainDesk } from "./components";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <MainDesk />
    </div>
  );
}

export default App;
