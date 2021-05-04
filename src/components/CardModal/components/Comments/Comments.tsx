import styled from "styled-components";
import React, { useMemo, FC } from "react";
import { Form, Field } from "react-final-form";
import { required } from "../../../../utils/validators";
import { CardComments } from "../../../../App";
import { Comment } from "./../Comment";
import { TextArea } from "../../../ui";
import { FormApi } from "final-form";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
  onCommentAdd: (cardId: string, text: string) => void;
  onCommentRemoveClick: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
}

interface AddCommentFormValues {
  newCommentText?: string;
}

const Comments: FC<CommentsProps> = ({
  cardId,
  comments,
  onCommentAdd,
  onCommentRemoveClick,
  onCommentChange,
}) => {
  const filteredCommentsArray = useMemo(
    () =>
      Object.values(comments).filter((comment) => comment.cardId === cardId),
    [comments, cardId]
  );

  const onSubmit = (
    { newCommentText }: AddCommentFormValues,
    form: FormApi
  ) => {
    if (newCommentText) {
      onCommentAdd(cardId, newCommentText);
      form.reset();
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
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <AddCommentForm onSubmit={handleSubmit}>
              <Field<string>
                name="newCommentText"
                validate={required}
                render={({ input: { onChange, value }, meta }) => {
                  return (
                    <TextArea
                      spellCheck={false}
                      maxRows={2}
                      onChange={onChange}
                      value={value}
                      placeholder="New comment text"
                    />
                  );
                }}
              />

              <button disabled={submitting || pristine}>Add</button>
            </AddCommentForm>
          )}
        />
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

const AddCommentForm = styled.form`
  display: flex;
  width: 100%;
`;

export default Comments;
