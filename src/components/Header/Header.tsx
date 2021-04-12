import { Navbar } from "react-bootstrap";
import React, { FC } from "react";

interface HeaderProps {
  name: string;
}

const Header: FC<HeaderProps> = ({ name }) => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Purrweb Trello</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as: {name}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
