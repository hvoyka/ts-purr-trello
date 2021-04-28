import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import { required } from "../../utils/validators";

import { Button } from "react-bootstrap";
import { Modal, TextInput } from "../ui";

interface UserModalProps {
  isVisible: boolean;
  onConfirmClick: (name: string) => void;
}

interface AddUserNameFromValues {
  userName?: string;
}

const UserModal: FC<UserModalProps> = ({ onConfirmClick, isVisible }) => {
  const onSubmit = ({ userName }: AddUserNameFromValues) => {
    if (userName) onConfirmClick(userName);
  };

  return (
    <>
      <Modal title="Enter your name" isVisible={isVisible}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field<string>
                name="userName"
                validate={required}
                render={(props) => {
                  return <TextInput placeholder="User name" {...props} />;
                }}
              />

              <div className="buttons">
                <Button type="submit" disabled={submitting || pristine}>
                  Submit
                </Button>
              </div>
            </form>
          )}
        />
      </Modal>
    </>
  );
};

export default UserModal;
