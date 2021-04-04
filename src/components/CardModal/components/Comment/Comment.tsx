import styled from "styled-components";
import React from "react";
import { CardComment } from "../../../../App";

export interface CommentProps {
  comment: CardComment;
  onRemoveComment: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onRemoveComment }) => {
  return (
    <>
      <div>{comment.author}</div>
      <StyledComment>{comment.text}</StyledComment>
      <div>
        <button>Изменить</button> -{" "}
        <button onClick={() => onRemoveComment(comment.id)}>Удалить</button>
      </div>
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
