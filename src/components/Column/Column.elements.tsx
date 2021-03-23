import styled from "styled-components";
import { Col } from "react-bootstrap";

export const StyledColumn = styled(Col)`
  height: calc(100vh - 76px);
  margin-top: 10px;
  border-radius: 10px;
  background-color: azure;
  border: 1px solid #f3f3f3;
  box-shadow: 2px 2px 5px rgba($color: #000000, $alpha: 0.3);
`;
export const StyledTitle = styled.div`
  border-bottom: 1px solid #83ffcb;
  text-align: center;
`;
