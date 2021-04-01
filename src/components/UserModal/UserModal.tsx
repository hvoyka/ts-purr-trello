import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ModalWrapper } from "../UI";

interface UserModalProps {
  isUserModalShow: boolean;
  addUserName: (name: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  addUserName,
  isUserModalShow,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    if (user) setShow(false);
  };

  useEffect(() => {
    setShow(isUserModalShow);
  }, [isUserModalShow]);

  const [user, setUser] = useState("");

  const changeHandler = (e: any) => {
    setUser(e.target.value);
  };
  const enterHandler = (e: any) => {
    if (e.key === "Enter") {
      addUserName(user);
      handleClose();
    }
  };
  const modalProps = {};
  return (
    <>
      <ModalWrapper
        title="Modal"
        isModalShow={show}
        showCloseButton={true}
        modalProps={modalProps}
        onModalClose={handleClose}
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
            handleClose();
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
