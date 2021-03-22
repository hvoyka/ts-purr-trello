import { Container, Row, Col } from "react-bootstrap";
import css from "./MainDesk.module.scss";
import { Column } from "../index";

const MainDesk = () => {
  return (
    <main className={css.main}>
      <Container>
        <Row>
          <Column />
          <Col>In Progres</Col>
          <Col>Testing</Col>
          <Col>Done</Col>
        </Row>
      </Container>
    </main>
  );
};

export default MainDesk;
