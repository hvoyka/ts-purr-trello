import styled from "styled-components";
import React, { useRef } from "react";
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const fillteredCommentsArray = Object.values(comments).filter(
    (comment) => comment.cardId === cardId
  );

  const enterHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      onAddComent(cardId, (event.target as HTMLTextAreaElement).value);
    }
  };

  const addCommentHandler = () => {
    if (textAreaRef.current !== null) {
      onAddComent(cardId, textAreaRef.current.value);
      textAreaRef.current.value = "";
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
      <textarea
        ref={textAreaRef}
        placeholder="Add comment"
        onKeyDown={(e) => enterHandler(e)}
      />
      <button onClick={addCommentHandler}>Save</button>
    </>
  );
};

const StyledCommentsBox = styled.ul`
  padding: 1rem 1rem;
  list-style: none;
`;

export default Comments;
