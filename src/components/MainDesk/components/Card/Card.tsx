import styled from "styled-components";
import { CardModal } from "../CardModal";
import React, { useState } from "react";

export interface CardProps {
  id: string;
  title: string;
  text: string;
  removeCard: (id: string) => void;
  changeCardTitle: (title: string, id: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  text,
  removeCard,
  changeCardTitle,
}) => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const enterClickHandler = () => {
    setIsCardModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsCardModalOpen(false);
  };

  return (
    <StyledCardBox>
      <CardTextArea
        maxLength={100}
        spellCheck={false}
        rows={1}
        placeholder={"Card title"}
        value={title}
        onChange={(e: any) => {
          changeCardTitle(id, e.target.value);
        }}
      ></CardTextArea>

      <EnterCardButton title="To card info" onClick={() => enterClickHandler()}>
        &#8617;
      </EnterCardButton>
      <RemoveCardButton title="Remove card" onClick={() => removeCard(id)}>
        X
      </RemoveCardButton>
      <CardModal
        isCardModalOpen={isCardModalOpen}
        closeModalHandler={closeModalHandler}
        id={id}
        title={title}
        text={text}
        changeCardTitle={changeCardTitle}
      />
    </StyledCardBox>
  );
};

export default Card;

const StyledCardBox = styled.div`
  flex: 1 1 auto;
  margin-bottom: 0;
  margin: 0 4px 10px;
  padding-bottom: 10px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid var(--gray3);
`;

const CardTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  resize: none;
  max-height: 256px;
  width: 100%;
  outline: none;
  border: none;
  -webkit-appearance: none;
  border-radius: 3px;
  display: block;
  color: var(--blue2);
  &:focus {
    background-color: var(--white);
    box-shadow: inset 0 0 0 2px var(--blue2);
  }
`;
const RemoveCardButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  border: 1px solid transparent;
  &:hover {
    border: 1px solid var(--blue2);
  }
`;
const EnterCardButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  border: 1px solid transparent;
  &:hover {
    transform: scale(1.05);
  }
`;
