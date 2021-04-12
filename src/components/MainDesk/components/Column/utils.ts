import { CardComments } from "../../../../App";

export const getCommentsCount = (
  comments: CardComments,
  cardId: string
): number => {
  const filteredComments = Object.values(comments).filter(
    (comment) => comment.cardId === cardId
  );
  return filteredComments.length;
};
