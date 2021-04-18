import styled from "styled-components";
import { ColumnCard } from "../../../../App";
import React, { FC, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

export interface CardProps {
  card: ColumnCard;
  commentsCount: number;
  onRemoveClick: () => void;
  onClick: () => void;
  onTextAreaChange: (propertyName: keyof ColumnCard, value: string) => void;
}

const Card: FC<CardProps> = ({
  card,
  commentsCount,
  onTextAreaChange,
  onRemoveClick,
  onClick,
}) => {
  const [isCardTitleEdit, setIsCardTitleEdit] = useState(false);

  const handleTitleEditClick = () => {
    setIsCardTitleEdit(!isCardTitleEdit);
  };

  const handleTitleAreaBlur = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const trimmedCardTitle = event.target.value.trim();

    if (trimmedCardTitle) {
      onTextAreaChange("title", trimmedCardTitle);
    }
    setIsCardTitleEdit(false);
  };

  return (
    <Root>
      <CardTop>
        <TextAreaWrapper>
          {isCardTitleEdit ? (
            <CardTextArea
              autoFocus
              maxLength={100}
              spellCheck={false}
              rows={1}
              placeholder="Card title"
              defaultValue={card.title}
              onBlur={handleTitleAreaBlur}
            />
          ) : (
            <CardTitleButton onClick={onClick}>{card.title}</CardTitleButton>
          )}
        </TextAreaWrapper>

        <EnterCardButton title="Edit title" onClick={handleTitleEditClick}>
          <AiOutlineEdit />
        </EnterCardButton>

        <RemoveCardButton title="Remove card" onClick={onRemoveClick}>
          X
        </RemoveCardButton>

        {!!commentsCount && (
          <CommentsCountWrapper>
            <CommentsCount>{commentsCount}</CommentsCount>
            <FaRegCommentDots />
          </CommentsCountWrapper>
        )}
      </CardTop>
    </Root>
  );
};

const Root = styled.li`
  position: relative;
  flex: 1 1 auto;
  margin-bottom: 0;
  margin: 0 4px 10px;
  padding: 10px 5px 10px 5px;
  z-index: 1;
  padding: 4px 8px 15px 8px;
  border-radius: 5px;
  border: 1px solid var(--gray3);
`;

const CardTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;

  resize: none;
  max-height: 256px;
  width: 100%;
  outline: none;
  border: none;
  -webkit-appearance: none;
  display: block;
  color: var(--blue2);
  &:focus {
    background-color: var(--white);
    box-shadow: inset 0 0 0 2px var(--blue2);
  }
`;
const RemoveCardButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  border: 1px solid transparent;
  &:hover {
    border: 1px solid var(--blue2);
  }
`;
const EnterCardButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  border: 1px solid transparent;
  font-size: 20px;
  &:hover {
    transform: scale(1.05);
  }
`;
const TextAreaWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;
const CardTitleButton = styled.button`
  border: 0;
  background: transparent;
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: left;
  font-weight: 600;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CommentsCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 7px;
`;
const CommentsCount = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
`;
export default Card;
