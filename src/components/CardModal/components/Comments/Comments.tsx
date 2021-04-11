import styled from "styled-components";
import React, { useState, useMemo, FC } from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
  onCommentAdd: (cardId: string, text: string) => void;
  onCommentRemove: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
}

const Comments: FC<CommentsProps> = ({
  cardId,
  comments,
  onCommentAdd,
  onCommentRemove,
  onCommentChange,
}) => {
  const [newCommentText, setNewCommentText] = useState("");

  const fillteredCommentsArray = useMemo(
    () =>
      Object.values(comments).filter((comment) => comment.cardId === cardId),
    [comments, cardId]
  );

  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      handleCommentAdd();
    }
  };

  const handleCommentAdd = () => {
    onCommentAdd(cardId, newCommentText);
    setNewCommentText("");
  };

  return (
    <>
      <CommentsList>
        {fillteredCommentsArray.map((filteredComment) => (
          <Comment
            key={filteredComment.id}
            comment={filteredComment}
            onRemove={() => onCommentRemove(filteredComment.id)}
            onSave={(value) => onCommentChange(filteredComment.id, value)}
          />
        ))}
      </CommentsList>
      <AddCommentWrapper>
        <textarea
          rows={1}
          placeholder="New comment text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          onKeyDown={(e) => handleEnterPress(e)}
        />
        <button onClick={handleCommentAdd}>Add comment</button>
      </AddCommentWrapper>
    </>
  );
};

const CommentsList = styled.ul`
  padding: 1rem 1rem;
  list-style: none;
  background-color: var(--gray4);
  border-radius: 5px;
`;
const AddCommentWrapper = styled.div`
  padding: 1rem 1rem;
  border-radius: 5px;
  display: flex;
`;

export default Comments;
