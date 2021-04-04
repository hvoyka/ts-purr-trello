import styled from "styled-components";
import React from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
}

const Comments: React.FC<CommentsProps> = ({ cardId, comments }) => {
  const fillteredCommentsArray = Object.values(comments).filter(
    (comment) => comment.cardId === cardId
  );
  return (
    <>
      <StyledCommentsBox>
        {fillteredCommentsArray.map((filteredComment) => (
          <Comment
            text={filteredComment.text}
            author={filteredComment.author}
          />
        ))}
      </StyledCommentsBox>
      <textarea placeholder="Add comment" />
    </>
  );
};

const StyledCommentsBox = styled.ul`
  padding: 1rem 1rem;
  list-style: none;
`;

export default Comments;
