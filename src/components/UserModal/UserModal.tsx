import React, { useState, FC } from "react";
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
        <input
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
