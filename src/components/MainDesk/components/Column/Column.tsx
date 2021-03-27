import styled from "styled-components";
import { Col, Button } from "react-bootstrap";

interface Props {
  name: string;
  id: string;
}

const Column = (props: Props) => {
  return (
    <StyledColumn>
      <ListHeader>
        <TextArea
          maxLength={100}
          spellCheck={false}
          value={props.name}
          onChange={(e: any) => {}}
        ></TextArea>
        {/*  <div contentEditable={true}></div> */}
        <StyledButton>+</StyledButton>
      </ListHeader>
      <ul>LIst</ul>
    </StyledColumn>
  );
};

export default Column;

const StyledColumn = styled(Col)`
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #f3f3f3;
  box-shadow: 2px 2px 5px rgba($color: #000000, $alpha: 0.3);
  background-color: #ebecf0;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  padding-right: 5px;
  padding-left: 5px;
`;
const StyledButton = styled(Button)`
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
  padding: 5px;
  font-size: 15px;
  line-height: 15px;
  top: 50%;
  transform: translateY(-50%);
`;
const TextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  resize: none;
  max-height: 256px;
  width: 100%;
  outline: none;
  border: none;
  -webkit-appearance: none;
  border-radius: 3px;
  display: block;
  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;
const ListHeader = styled.div`
  flex: 0 0 auto;
  padding: 10px 8px;
  padding-right: 8px;
  position: relative;
  min-height: 20px;
  padding-right: 36px;
`;
