import { Navbar } from "react-bootstrap";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
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
