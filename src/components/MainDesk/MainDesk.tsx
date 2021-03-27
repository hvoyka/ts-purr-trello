import { Row, Container } from "react-bootstrap";
import { IColumn, IColumns } from "../../App";
import { Column } from "./components";
import styled from "styled-components";

const MainDesk: React.FC<IColumns> = ({ columns }) => {
  return (
    <StyledMain>
      <Container fluid>
        <Row>
          {columns.map((column: IColumn) => {
            return (
              <Column title={column.title} key={column.id} id={column.id} />
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
