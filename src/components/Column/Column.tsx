import css from "./Column.module.scss";
import { Col } from "react-bootstrap";
const Column = () => {
  return (
    <Col className={css.column}>
      <h4 className={css.column__title}>TODO</h4>
    </Col>
  );
};

export default Column;
