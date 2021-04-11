import styled from "styled-components";
import React, { useState, FC } from "react";
import { CardComment } from "../../../../App";

export interface CommentProps {
  comment: CardComment;
  onRemove: (id: string) => void;
  onChange: (id: string, text: string) => void;
}

const Comment: FC<CommentProps> = ({ comment, onRemove, onChange }) => {
  const [isTextIsEdit, setIsTextIsEdit] = useState(false);

  return (
    <>
      <div>{comment.author}</div>
      {isTextIsEdit ? (
        <SaveBox>
          <textarea
            rows={1}
            value={comment.text}
            onChange={(e) => onChange(comment.id, e.target.value)}
          />
          <button onClick={() => setIsTextIsEdit(false)}>Save</button>
        </SaveBox>
      ) : (
        <>
          <CommentWrapper>{comment.text}</CommentWrapper>
          <button onClick={() => setIsTextIsEdit(true)}>Изменить</button> -{" "}
          <button onClick={() => onRemove(comment.id)}>Удалить</button>
        </>
      )}
    </>
  );
};

const CommentWrapper = styled.div`
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
