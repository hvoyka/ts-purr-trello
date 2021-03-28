import styled from "styled-components";
import { Button } from "react-bootstrap";
import { IColumn, ICard } from "../../../../App";

export interface CardProps {
  id: string;
  title: string;
  text?: string;
}

const Card: React.FC<CardProps> = ({ id, title, text }) => {
  return (
    <StyledCardBox>
      <StyledCard>{title}</StyledCard>
      <button>X</button>
    </StyledCardBox>
  );
};

export default Card;

const StyledCardBox = styled.div`
  flex: 1 1 auto;
  margin-bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
`;
const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  flex-grow: 1;
  margin-right: 10px;
`;
