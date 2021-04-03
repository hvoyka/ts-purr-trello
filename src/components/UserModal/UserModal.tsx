import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "../UI";

interface UserModalProps {
  isUserModalShow: boolean;
  addUserName: (name: string) => void;
  onUserModalClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({
  addUserName,
  isUserModalShow,
  onUserModalClose,
}) => {
  const [user, setUser] = useState("");

  const closeHandler = () => {
    if (user) onUserModalClose();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addUserName(user);
      closeHandler();
    }
  };
  const modalProps = {};
  return (
    <>
      <Modal
        title="User Modal"
        isModalShow={isUserModalShow}
        showCloseButton
        modalProps={modalProps}
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
            addUserName(user);
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
