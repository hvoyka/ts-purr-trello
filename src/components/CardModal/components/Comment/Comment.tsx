import styled from "styled-components";
import React from "react";

export interface CommentProps {
  text: string;
  author: string;
}

const Comment: React.FC<CommentProps> = ({ text, author }) => {
  return (
    <>
      <div>{author}</div>
      <StyledComment>{text}</StyledComment>
      <div>
        <button>Изменить</button> - <button>Удалить</button>
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
