import { FC, KeyboardEvent, ChangeEvent } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

interface TextAreaProps {
  maxRows?: number;
  minRows?: number;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  spellCheck?: boolean;
  autoFocus?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = (props) => {
  return <StyledTextArea {...props} />;
};

const StyledTextArea = styled(TextareaAutosize)`
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 35px;
  padding: 3px 8px;
  resize: none;
  max-height: 256px;
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  display: block;
  color: var(--blue2);
  border: 1px solid var(--blue2);
  margin-bottom: 10px;
  &:focus {
    background-color: var(--white);
    background-color: var(--blue3);
  }
`;
export default TextArea;
