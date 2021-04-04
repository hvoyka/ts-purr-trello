import styled from "styled-components";
import React from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
  onAddComent: (cardId: string, text: string) => void;
}

const Comments: React.FC<CommentsProps> = ({
  cardId,
  comments,
  onAddComent,
}) => {
  const fillteredCommentsArray = Object.values(comments).filter(
    (comment) => comment.cardId === cardId
  );

  const enterHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      onAddComent(cardId, (event.target as HTMLTextAreaElement).value);
    }
  };
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
      <textarea placeholder="Add comment" onKeyDown={(e) => enterHandler(e)} />
    </>
  );
};

const StyledCommentsBox = styled.ul`
  padding: 1rem 1rem;
  list-style: none;
`;

export default Comments;
