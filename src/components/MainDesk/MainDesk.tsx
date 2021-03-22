import { Container, Row, Col } from "react-bootstrap";
import css from "./MainDesk.module.scss";

const MainDesk = () => {
  return (
    <main className={css.main}>
      <Container>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </main>
  );
};

export default MainDesk;
