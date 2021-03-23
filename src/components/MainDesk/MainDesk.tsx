import { Row, Container } from "react-bootstrap";
import { Column } from "../index";
import { StyledMain } from "./MainDesk.elements";
const MainDesk = () => {
  return (
    <StyledMain>
      <Container fluid>
        <Row>
          <Column name={"TODO"} />
          <Column name={"In Progres"} />
          <Column name={"Testing"} />
          <Column name={"Done"} />
        </Row>
      </Container>
    </StyledMain>
  );
};

export default MainDesk;
