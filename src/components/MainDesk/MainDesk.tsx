import { Row, Container } from "react-bootstrap";
import { Column } from "../index";
import { StyledMain } from "./MainDesk.elements";

interface Props {
  state: {
    users: { id: number; name: string }[];
    todo: {
      title: string;
      items: { id: number; title: string; ownerId: number }[];
    };
    progress: {
      title: string;
      items: { id: number; title: string; ownerId: number }[];
    };
    testing: {
      title: string;
      items: { id: number; title: string; ownerId: number }[];
    };
    done: {
      title: string;
      items: { id: number; title: string; ownerId: number }[];
    };
  };
}

const MainDesk = ({ state }: Props) => {
  return (
    <StyledMain>
      <Container fluid>
        <Row>
          <Column name={state.todo.title} items={state.todo.items} />
          <Column name={state.progress.title} items={state.progress.items} />
          <Column name={state.testing.title} items={state.testing.items} />
          <Column name={state.done.title} items={state.done.items} />
        </Row>
      </Container>
    </StyledMain>
  );
};

export default MainDesk;
