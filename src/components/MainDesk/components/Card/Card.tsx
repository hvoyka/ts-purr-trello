import styled from "styled-components";
import { FC, useState, KeyboardEvent, ChangeEvent } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { TextArea } from "../../../ui";
import { ColumnCard } from "./../../../../redux/ducks/cards";

export interface CardProps {
  card: ColumnCard;
  commentsCount: number;
  onRemoveClick: () => void;
  onClick: () => void;
  onCardTitleChange: (title: string) => void;
}

const Card: FC<CardProps> = ({
  card,
  onCardTitleChange,
  commentsCount,
  onRemoveClick,
  onClick,
}) => {
  const [isCardTitleEdit, setIsCardTitleEdit] = useState(false);

  const handleTitleEditClick = () => {
    setIsCardTitleEdit(true);
  };
  const handleTitleSaveClick = () => {
    setIsCardTitleEdit(false);
  };

  const handleTitleAreaBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const trimmedCardTitle = event.target.value.trim();

    if (trimmedCardTitle) {
      onCardTitleChange(trimmedCardTitle);
    }
    setIsCardTitleEdit(false);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <Root>
      <CardTop>
        <TextAreaWrapper>
          {isCardTitleEdit ? (
            <TextArea
              autoFocus
              spellCheck={false}
              maxRows={4}
              placeholder="Card title"
              defaultValue={card.title}
              onBlur={handleTitleAreaBlur}
              onKeyDown={handleEnterPress}
            />
          ) : (
            <CardTitleButton onClick={onClick}>{card.title}</CardTitleButton>
          )}
        </TextAreaWrapper>

        <ButtonWrapper>
          {isCardTitleEdit ? (
            <CardButton title="Save title" onClick={handleTitleSaveClick}>
              <AiOutlineSave />
            </CardButton>
          ) : (
            <CardButton title="Edit title" onClick={handleTitleEditClick}>
              <AiOutlineEdit />
            </CardButton>
          )}

          <CardButton title="Remove card" onClick={onRemoveClick}>
            <AiOutlineCloseCircle />
          </CardButton>
        </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s;
  background: rgba(var(--gray4-rgb), 0.8);
`;

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
  &:hover ${ButtonWrapper} {
    opacity: 1;
  }
`;

const CardButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--blue2);
  border: 1px solid transparent;
  padding: 3px;

  &:hover {
    border: 1px solid var(--blue2);
  }
`;
const TextAreaWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  overflow-wrap: break-word;
`;
const CardTitleButton = styled.button`
  border: 0;
  background: transparent;
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: left;
  font-weight: 600;
  margin-bottom: 10px;
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
