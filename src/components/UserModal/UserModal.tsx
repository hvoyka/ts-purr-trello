import React, { useState, FC } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Modal } from "../UI";

interface UserModalProps {
  isVisible: boolean;
  onConfirmClick: (name: string) => void;
  onClose: () => void;
}

const UserModal: FC<UserModalProps> = ({
  onConfirmClick,
  isVisible,
  onClose,
}) => {
  const [user, setUser] = useState("");

  const handleConfirmClick = () => {
    const trimmedUser = user.trim();
    if (trimmedUser) {
      onConfirmClick(trimmedUser);
      onClose();
    }
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleConfirmClick();
    }
  };

  return (
    <>
      <Modal
        title="User Modal"
        isVisible={isVisible}
        isCloseButtonVisible={false}
        onClose={handleConfirmClick}
      >
        <Input
          type="text"
          placeholder="User name"
          onChange={handleUserNameChange}
          defaultValue={user}
          onKeyDown={handleEnterPress}
        />
        <Button
          onClick={(e) => {
            handleConfirmClick();
          }}
          variant="primary"
        >
          Confirm
        </Button>
      </Modal>
    </>
  );
};

export default UserModal;

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
