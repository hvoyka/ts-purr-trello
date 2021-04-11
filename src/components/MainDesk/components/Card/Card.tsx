import styled from "styled-components";
import { ColumnCard, CardPropertyKeys } from "../../../../App";
import React, { FC, useRef } from "react";

export interface CardProps {
  card: ColumnCard;
  commentsCount: number;
  onRemove: () => void;
  onClick: () => void;
  onTextAreaChange: (propertyName: keyof ColumnCard, value: string) => void;
}

const Card: FC<CardProps> = ({
  card,
  commentsCount,
  onTextAreaChange,
  onRemove,
  onClick,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaEl = textareaRef.current;

  const handleTitleEdit = () => {
    if (textareaRef && textareaEl) {
      textareaEl.disabled = false;
      textareaEl.focus();
    }
  };

  return (
    <Root>
      <CardTop>
        <TextAreaWrapper>
          <CardTextArea
            maxLength={100}
            spellCheck={false}
            rows={1}
            placeholder="Card title"
            value={card.title}
            disabled
            ref={textareaRef}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              onTextAreaChange(CardPropertyKeys.TITLE, event.target.value);
            }}
          />
          <TextAreaHiddenButton
            onClick={() => {
              onClick();
            }}
          />
          <CommentsCount>{commentsCount ? commentsCount : null}</CommentsCount>
        </TextAreaWrapper>

        <EnterCardButton title="Edit title" onClick={handleTitleEdit}>
          &#9998;
        </EnterCardButton>

        <RemoveCardButton title="Remove card" onClick={onRemove}>
          X
        </RemoveCardButton>
      </CardTop>
    </Root>
  );
};

const Root = styled.div`
  flex: 1 1 auto;
  margin-bottom: 0;
  margin: 0 4px 10px;
  padding-bottom: 10px;
  z-index: 1;
  padding: 4px 8px;
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
  border-radius: 3px;
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
  &:hover {
    transform: scale(1.05);
  }
`;
const TextAreaWrapper = styled.div`
  display: inline-block;
  position: relative;
`;
const TextAreaHiddenButton = styled.button`
  border: 0;
  background: transparent;
  width: 100%;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CommentsCount = styled.div`
  font-size: 12px;
`;
export default Card;
