import styled from "styled-components";
import React, { useMemo, FC } from "react";
import { Form, Field } from "react-final-form";
import { notEmpty } from "../../../../utils/validate";
import {
  onCommentAdd,
  onCommentRemove,
  onCommentChange,
  CardComments,
} from "../../../../redux/ducks/comments/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Comment } from "./../Comment";
import { TextArea } from "../../../ui";
import { FormApi } from "final-form";

export interface CommentsProps {
  cardId: string;
  comments: CardComments;
}

interface Values {
  newCommentText?: string;
}

const Comments: FC<CommentsProps> = ({ cardId, comments }) => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);

  const filteredCommentsArray = useMemo(
    () =>
      Object.values(comments).filter((comment) => comment.cardId === cardId),
    [comments, cardId]
  );

  const onSubmit = async ({ newCommentText }: Values, form: FormApi) => {
    if (newCommentText) {
      dispatch(onCommentAdd(cardId, newCommentText, userName));
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
            onRemoveClick={() => dispatch(onCommentRemove(filteredComment.id))}
            onSave={(value) =>
              dispatch(onCommentChange(filteredComment.id, value))
            }
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
                spellCheck={false}
                maxRows={2}
                placeholder="New comment text"
                validate={notEmpty}
                render={({ input: { onChange, value }, meta, ...props }) => {
                  return (
                    <TextArea onChange={onChange} value={value} {...props} />
                  );
                }}
              />

              <button type="submit" disabled={submitting || pristine}>
                Add
              </button>
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
