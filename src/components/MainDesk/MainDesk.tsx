import { Row, Container } from "react-bootstrap";
import { Column } from "../index";
import { StyledMain } from "./MainDesk.elements";

interface Props {
  state: {
    users: { id: number; name: string }[];
    todo: {
      title: string;
      column: string;
      items: { id: number; title: string; ownerId: number }[];
    };
    progress: {
      title: string;
      column: string;
      items: { id: number; title: string; ownerId: number }[];
    };
    testing: {
      title: string;
      column: string;
      items: { id: number; title: string; ownerId: number }[];
    };
    done: {
      title: string;
      column: string;
      items: { id: number; title: string; ownerId: number }[];
    };
  };
  setColumnTitle: (newTitle: string, columnName: string) => void;
}

const MainDesk = ({ state, setColumnTitle }: Props) => {
  return (
    <StyledMain>
      <Container fluid>
        <Row>
          <Column
            name={state.todo.title}
            items={state.todo.items}
            column={state.todo.column}
            setColumnTitle={setColumnTitle}
          />
          <Column
            name={state.progress.title}
            items={state.progress.items}
            column={state.progress.column}
            setColumnTitle={setColumnTitle}
          />
          <Column
            name={state.testing.title}
            items={state.testing.items}
            column={state.testing.column}
            setColumnTitle={setColumnTitle}
          />
          <Column
            name={state.done.title}
            items={state.done.items}
            column={state.done.column}
            setColumnTitle={setColumnTitle}
          />
        </Row>
      </Container>
    </StyledMain>
  );
};

export default MainDesk;
