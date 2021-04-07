import React, { useState, FC } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Modal } from "../UI";

interface Props {
  isUserModalShow: boolean;
  addUserName: (name: string) => void;
  onUserModalClose: () => void;
}

const UserModal: FC<Props> = ({
  addUserName,
  isUserModalShow,
  onUserModalClose,
}) => {
  const [user, setUser] = useState("");

  const closeHandler = () => {
    const trimmedUser = user.trim();
    if (trimmedUser) {
      addUserName(trimmedUser);
      onUserModalClose();
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      closeHandler();
    }
  };
  return (
    <>
      <Modal
        title="User Modal"
        isModalShow={isUserModalShow}
        showCloseButton={false}
        onModalClose={closeHandler}
      >
        <Input
          type="text"
          placeholder="User name"
          onChange={changeHandler}
          defaultValue={user}
          onKeyDown={enterHandler}
        />
        <Button
          onClick={(e) => {
            closeHandler();
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
