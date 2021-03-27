import { Row, Container } from "react-bootstrap";

import { Column } from "./components";
import styled from "styled-components";
import { IColumns } from "../../App";

const MainDesk = ({ columns }: any) => {
  return (
    <StyledMain>
      <Container fluid>
        <Row>
          {columns.map((column: any) => {
            return (
              <Column name={column.title} key={column.id} id={column.id} />
            );
          })}
        </Row>
      </Container>
    </StyledMain>
  );
};

export default MainDesk;

const StyledMain = styled.main`
  flex-grow: 1;
`;
