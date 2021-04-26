import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import { notEmpty } from "../../utils/validate";

import { Button } from "react-bootstrap";
import { Modal, TextInput } from "../ui";

interface UserModalProps {
  isVisible: boolean;
  onConfirmClick: (name: string) => void;
}

interface Values {
  userName?: string;
}

const UserModal: FC<UserModalProps> = ({ onConfirmClick, isVisible }) => {
  const onSubmit = async ({ userName }: Values) => {
    if (userName) onConfirmClick(userName);
  };

  return (
    <>
      <Modal title="Enter your name" isVisible={isVisible}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field<string>
                  name="userName"
                  placeholder="User name"
                  validate={notEmpty}
                  render={(props) => {
                    return <TextInput {...props} />;
                  }}
                />
              </div>

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
