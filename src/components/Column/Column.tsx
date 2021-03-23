import { StyledColumn, StyledTitle } from "./Column.elements";

interface Props {
  name: string;
  items: { id: number; title: string; ownerId: number }[];
}

const Column = (props: Props) => {
  const items = props.items.map((item) => <li key={item.id}>{item.title}</li>);

  return (
    <StyledColumn>
      <StyledTitle>{props.name}</StyledTitle>
      <ul>{items}</ul>
    </StyledColumn>
  );
};

export default Column;
