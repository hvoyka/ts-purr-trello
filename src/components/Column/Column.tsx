import {
  StyledColumn,
  TextArea,
  ListHeader,
  StyledButton,
} from "./Column.elements";

interface Props {
  name: string;
  column: string;
  items: { id: number; title: string; ownerId: number }[];
  setColumnTitle: (newTitle: string, columnName: string) => void;
}

const Column = (props: Props) => {
  const items = props.items.map((item) => <li key={item.id}>{item.title}</li>);

  return (
    <StyledColumn>
      <ListHeader>
        <TextArea
          maxLength={100}
          spellCheck={false}
          value={props.name}
          onChange={(e: any) => {
            props.setColumnTitle(e.target.value, props.column);
          }}
        ></TextArea>
        {/*  <div contentEditable={true}></div> */}
        <StyledButton>+</StyledButton>
      </ListHeader>
      <ul>{items}</ul>
    </StyledColumn>
  );
};

export default Column;
