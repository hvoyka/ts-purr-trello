import React, { useState, FC, KeyboardEvent } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Modal } from "../ui";

interface UserModalProps {
  isVisible: boolean;
  onConfirmClick: (name: string) => void;
}

const UserModal: FC<UserModalProps> = ({ onConfirmClick, isVisible }) => {
  const [user, setUser] = useState("");

  const handleConfirmClick = () => {
    const trimmedUser = user.trim();
    if (trimmedUser) {
      onConfirmClick(trimmedUser);
    }
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleConfirmClick();
    }
  };

  return (
    <>
      <Modal title="User Modal" isVisible={isVisible}>
        <Input
          type="text"
          placeholder="User name"
          onChange={(event) => {
            setUser(event.target.value);
          }}
          defaultValue={user}
          onKeyDown={handleEnterPress}
        />
        <Button onClick={handleConfirmClick} variant="primary">
          Confirm
        </Button>
      </Modal>
    </>
  );
};

const Input = styled.input`
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  max-height: 256px;
  width: 100%;
  outline: none;
  border: 1px solid var(--blue3);
  -webkit-appearance: none;
  display: block;
  padding: 10px 20px;
  color: var(--blue2);
  margin-bottom: 15px;
  &:focus {
    background-color: var(--white);
    box-shadow: inset 0 0 0 2px var(--blue2);
  }
`;

export default UserModal;
