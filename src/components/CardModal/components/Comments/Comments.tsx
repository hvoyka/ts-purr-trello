import styled from "styled-components";
import React, { useRef, FC } from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";

export interface Props {
  cardId: string;
  comments: CardComments;
  onCommentAdd: (cardId: string, text: string) => void;
  onCommentRemove: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
}

const Comments: FC<Props> = ({
  cardId,
  comments,
  onCommentAdd,
  onCommentRemove,
  onCommentChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const fillteredCommentsArray = Object.values(comments).filter(
    (comment) => comment.cardId === cardId
  );

  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      onCommentAdd(cardId, (event.target as HTMLTextAreaElement).value);
    }
  };

  const handleCommentAdd = () => {
    if (textAreaRef.current !== null) {
      onCommentAdd(cardId, textAreaRef.current.value);
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
            onCommentRemove={onCommentRemove}
            onCommentChange={onCommentChange}
          />
        ))}
      </StyledCommentsBox>
      <AddCommentBox>
        <textarea
          ref={textAreaRef}
          rows={1}
          placeholder="New comment text"
          onKeyDown={(e) => handleEnterPress(e)}
        />
        <button onClick={handleCommentAdd}>Add comment</button>
      </AddCommentBox>
    </>
  );
};

const StyledCommentsBox = styled.ul`
  padding: 1rem 1rem;
  list-style: none;
  background-color: var(--gray4);
  border-radius: 5px;
`;
const AddCommentBox = styled.div`
  padding: 1rem 1rem;
  border-radius: 5px;
  display: flex;
`;

export default Comments;
