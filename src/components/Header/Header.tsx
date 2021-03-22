import { Navbar } from "react-bootstrap";
import css from "./Header.module.scss";
const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Purrweb Trello</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as: Hvo</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
