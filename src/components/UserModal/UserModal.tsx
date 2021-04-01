import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ModalWrapper } from "../UI";

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

  const changeHandler = (e: any) => {
    setUser(e.target.value);
  };
  const enterHandler = (e: any) => {
    if (e.key === "Enter") {
      addUserName(user);
      closeHandler();
    }
  };
  const modalProps = {};
  return (
    <>
      <ModalWrapper
        title="User Modal"
        isModalShow={isUserModalShow}
        showCloseButton={true}
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
      </ModalWrapper>
    </>
  );
};

export default UserModal;
