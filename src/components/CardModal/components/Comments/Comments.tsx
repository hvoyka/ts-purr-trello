import styled from "styled-components";
import React, { useRef, FC } from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";

export interface Props {
  cardId: string;
  comments: CardComments;
  onAddComent: (cardId: string, text: string) => void;
  onRemoveComment: (id: string) => void;
  onChangeComment: (id: string, text: string) => void;
}

const Comments: FC<Props> = ({
  cardId,
  comments,
  onAddComent,
  onRemoveComment,
  onChangeComment,
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
            onChangeComment={onChangeComment}
          />
        ))}
      </StyledCommentsBox>
      <AddCommentBox>
        <textarea
          ref={textAreaRef}
          rows={1}
          placeholder="New comment text"
          onKeyDown={(e) => enterHandler(e)}
        />
        <button onClick={addCommentHandler}>Add comment</button>
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
