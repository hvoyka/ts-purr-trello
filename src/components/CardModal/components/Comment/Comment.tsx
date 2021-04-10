import styled from "styled-components";
import React, { useState, FC } from "react";
import { CardComment } from "../../../../App";

export interface Props {
  comment: CardComment;
  onCommentRemove: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
}

const Comment: FC<Props> = ({ comment, onCommentRemove, onCommentChange }) => {
  const [isTextIsEdit, setIsTextIsEdit] = useState(false);

  const handleTextEdit = () => {
    setIsTextIsEdit(!isTextIsEdit);
  };
  return (
    <li>
      <div>{comment.author}</div>
      {isTextIsEdit ? (
        <SaveBox>
          <textarea
            rows={1}
            value={comment.text}
            onChange={(e) => onCommentChange(comment.id, e.target.value)}
          />
          <button onClick={handleTextEdit}>Save</button>
        </SaveBox>
      ) : (
        <div>
          <StyledComment>{comment.text}</StyledComment>
          <button onClick={handleTextEdit}>Изменить</button> -{" "}
          <button onClick={() => onCommentRemove(comment.id)}>Удалить</button>
        </div>
      )}
    </li>
  );
};

const StyledComment = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid var(--gray2);
  background-color: var(--blue3);
  margin-bottom: 10px;
`;
const SaveBox = styled.div`
  border-radius: 5px;
  display: flex;
`;

export default Comment;
