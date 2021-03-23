import { StyledColumn, StyledTitle } from "./Column.elements";

interface Props {
  name: string;
}

const Column = (props: Props) => {
  return (
    <StyledColumn>
      <StyledTitle>{props.name}</StyledTitle>
    </StyledColumn>
  );
};

export default Column;
