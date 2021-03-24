import {
  StyledColumn,
  TextArea,
  ListHeader,
  StyledButton,
} from "./Column.elements";

interface Props {
  name: string;
  items: { id: number; title: string; ownerId: number }[];
}

const Column = (props: Props) => {
  const items = props.items.map((item) => <li key={item.id}>{item.title}</li>);

  return (
    <StyledColumn>
      <ListHeader>
        <TextArea
          maxLength={100}
          spellCheck={false}
          rows={1}
          value={props.name}
        >
          {props.name}
        </TextArea>
        <StyledButton>+</StyledButton>
      </ListHeader>
      <ul>{items}</ul>
    </StyledColumn>
  );
};

export default Column;
