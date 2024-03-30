import {
  Button,
  HStack,
  VStack,
  Checkbox,
  Grid,
  GridItem,
  CheckboxGroup,
} from "@chakra-ui/react";

function MovieHall() {
  const columns = 10;
  const rows = 7;

  let row_items = [];
  for (let i = 0; i < columns; i++)
    row_items.push(<Checkbox key={i} padding="0.35rem"></Checkbox>);

  let items = [];
  for (let i = 0; i < columns; i++)
  items.push(<div key={i}>{row_items}</div>);

  return (
    <>
      <div className="seats-container">
        <div>{items}</div>
      </div>
    </>
  );
}

export default MovieHall;
