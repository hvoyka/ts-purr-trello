import styled from "styled-components";
import { useState, FC } from "react";
import { CardComment } from "../../../../App";
import { TextArea } from "../../../ui";

export interface CommentProps {
  comment: CardComment;
  onRemoveClick: () => void;
  onSave: (text: string) => void;
}

const Comment: FC<CommentProps> = ({ comment, onRemoveClick, onSave }) => {
  const [isTextIsEdit, setIsTextIsEdit] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);

  const handleSaveClick = () => {
    const trimmedCommentText = commentText.trim();
    if (trimmedCommentText) {
      onSave(commentText);
    } else {
      setCommentText(comment.text);
    }

    setIsTextIsEdit(false);
  };
  const handleCancelClick = () => {
    setCommentText(comment.text);
    setIsTextIsEdit(false);
  };

  return (
    <ListItem>
      <div>{comment.author}</div>
      {isTextIsEdit ? (
        <SaveBox>
          <TextArea
            spellCheck={false}
            maxRows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </SaveBox>
      ) : (
        <>
          <CommentWrapper>{comment.text}</CommentWrapper>
          <ButtonsWrapper>
            <EditButton onClick={() => setIsTextIsEdit(true)}>
              изменить
            </EditButton>
            <Separator>-</Separator>
            <EditButton onClick={onRemoveClick}>удалить</EditButton>
          </ButtonsWrapper>
        </>
      )}
    </ListItem>
  );
};

const ListItem = styled.li`
  margin-bottom: 10px;
`;
const CommentWrapper = styled.pre`
  display: flex;
  justify-content: space-between;
  overflow-wrap: anywhere;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid var(--gray2);
  background-color: var(--blue3);
  margin-bottom: 5px;
`;
const SaveBox = styled.div`
  border-radius: 5px;
  display: flex;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
const Separator = styled.span`
  display: inline-block;
  padding: 0 5px;
`;

export default Comment;
