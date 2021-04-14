import styled from "styled-components";
import React, { useState, useMemo, FC, KeyboardEvent } from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
  onCommentAdd: (cardId: string, text: string) => void;
  onCommentRemoveClick: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
}

const Comments: FC<CommentsProps> = ({
  cardId,
  comments,
  onCommentAdd,
  onCommentRemoveClick,
  onCommentChange,
}) => {
  const [newCommentText, setNewCommentText] = useState("");

  const filteredCommentsArray = useMemo(
    () =>
      Object.values(comments).filter((comment) => comment.cardId === cardId),
    [comments, cardId]
  );
  const handleCommentAddClick = () => {
    onCommentAdd(cardId, newCommentText);
    setNewCommentText("");
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleCommentAddClick();
    }
  };

  return (
    <>
      <CommentsList>
        {filteredCommentsArray.map((filteredComment) => (
          <Comment
            key={filteredComment.id}
            comment={filteredComment}
            onRemoveClick={() => onCommentRemoveClick(filteredComment.id)}
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
        <button onClick={handleCommentAddClick}>Add comment</button>
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
