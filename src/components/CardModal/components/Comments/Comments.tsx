import styled from "styled-components";
import React from "react";
import { CardComments } from "../../../../App";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
}

const Comments: React.FC<CommentsProps> = ({ cardId, comments }) => {
  const fillteredCommentsArray = Object.values(comments).filter(
    (comment) => comment.cardId === cardId
  );
  return (
    <StyledCommentsBox>
      {fillteredCommentsArray.map((filteredComment) => (
        <p>{filteredComment.text}</p>
      ))}
    </StyledCommentsBox>
  );
};

const StyledCommentsBox = styled.div`
  padding: 1rem 1rem;
`;

export default Comments;
