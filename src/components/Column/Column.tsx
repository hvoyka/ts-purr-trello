import { StyledColumn, StyledTitle } from "./Column.elements";

interface Props {
  name: string;
  items: { id: number; title: string; ownerId: number }[];
}

const Column = (props: Props) => {
  return (
    <StyledColumn>
      <StyledTitle>{props.name}</StyledTitle>
    </StyledColumn>
  );
};

export default Column;
