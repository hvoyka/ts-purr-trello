import styled from "styled-components";
import React from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
  onAddComent: (cardId: string, text: string) => void;
  onRemoveComment: (id: string) => void;
}

const Comments: React.FC<CommentsProps> = ({
  cardId,
  comments,
  onAddComent,
  onRemoveComment,
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
            key={filteredComment.id}
            comment={filteredComment}
            onRemoveComment={onRemoveComment}
          />
        ))}
      </StyledCommentsBox>
      <textarea placeholder="Add comment" onKeyDown={(e) => enterHandler(e)} />
      <button>Save</button>
    </>
  );
};

const StyledCommentsBox = styled.ul`
  padding: 1rem 1rem;
  list-style: none;
`;

export default Comments;
