import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

interface UserModalProps {
  isUserModalShow: boolean;
  addUserName: (name: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  addUserName,
  isUserModalShow,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

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
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header>
          <Modal.Title>Type username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="User name"
            onChange={changeHandler}
            value={user}
            onKeyDown={enterHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              addUserName(user);
              handleClose();
            }}
            variant="primary"
          >
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModal;
