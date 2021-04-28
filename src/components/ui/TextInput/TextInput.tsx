import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

type Props = FieldRenderProps<string, any>;

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <>
    <Input type="text" {...input} {...rest} />
    {meta.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
  </>
);

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
const ErrorText = styled.p`
  color: red;
`;

export default TextInput;
