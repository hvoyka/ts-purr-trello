import styled from "styled-components";
import React, { useState, useMemo, FC } from "react";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";
import { TextArea } from "../../../ui";

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
    const trimmedNewCommentText = newCommentText.trim();
    if (trimmedNewCommentText) {
      onCommentAdd(cardId, newCommentText);
      setNewCommentText("");
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
        <TextArea
          spellCheck={false}
          maxRows={2}
          placeholder="New comment text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button onClick={handleCommentAddClick}>Add</button>
      </AddCommentWrapper>
    </>
  );
};

const CommentsList = styled.ul`
  padding: 1rem 1rem;
  list-style: none;
  background-color: var(--gray4);
  border-radius: 5px;
  margin-bottom: 0;
`;
const AddCommentWrapper = styled.div`
  padding: 1rem 1rem;
  border-radius: 5px;
  display: flex;
`;

export default Comments;
