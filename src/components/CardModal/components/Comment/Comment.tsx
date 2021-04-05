import styled from "styled-components";
import React, { useState, FC } from "react";
import { CardComment } from "../../../../App";

export interface CommentProps {
  comment: CardComment;
  onRemoveComment: (id: string) => void;
  onChangeComment: (id: string, text: string) => void;
}

const Comment: FC<CommentProps> = ({
  comment,
  onRemoveComment,
  onChangeComment,
}) => {
  const [isEdit, setisEdit] = useState(false);

  const changeTextHandler = () => {
    setisEdit(!isEdit);
  };
  return (
    <>
      <div>{comment.author}</div>
      {isEdit ? (
        <div>
          <textarea
            value={comment.text}
            onChange={(e) => onChangeComment(comment.id, e.target.value)}
          />
          <button onClick={changeTextHandler}>Save</button>
        </div>
      ) : (
        <div>
          <StyledComment>{comment.text}</StyledComment>
          <button onClick={changeTextHandler}>Изменить</button> -{" "}
          <button onClick={() => onRemoveComment(comment.id)}>Удалить</button>
        </div>
      )}
    </>
  );
};

const StyledComment = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid var(--gray2);
  background-color: var(--blue3);
  margin-bottom: 10px;
`;

export default Comment;
