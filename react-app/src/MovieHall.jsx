import React, { useState } from "react";
import { Checkbox } from "@chakra-ui/react";

class Seat {
  constructor(type = "default", isOccupied = false) {
    this.type = type;
    this.isOccupied = isOccupied;
  }
}

function MovieHall() {
  const columns = 10;
  const rows = 7;

  // Define seats as a state variable
  const [seats, setSeats] = useState([]);

  // Initialize seats array
  for (let i = 0; i < rows * columns; i++) {
    seats.push(new Seat());
  }

  const [total_price, setTotalPrice] = useState(0);
  const [checkedSeats, setCheckedSeats] = useState([]);

  function getPrice(type) {
    if (type == "default") {
      return 500;
    } else if (type == "vip") {
      return 1000;
    }
    return 0;
  }

  function calcPrice(seat_ids) {
    let price = 0;
    for (let i = 0; i < seat_ids.length; i++) {
      price += getPrice(seats[seat_ids[i]].type);
    }
    return price;
  }

  const handleCheckboxChange = (event, id) => {
    let updatedSeats = [...seats];
    updatedSeats[id].isOccupied = event.target.checked;
    setSeats(updatedSeats); // Update seats state

    let updatedCheckedSeats = [...checkedSeats];
    if (event.target.checked) {
      updatedCheckedSeats.push(id);
    } else {
      updatedCheckedSeats = updatedCheckedSeats.filter(
        (seatId) => seatId !== id
      );
    }
    setCheckedSeats(updatedCheckedSeats);

    setTotalPrice(calcPrice(updatedCheckedSeats));
  };

  let items = [];
  for (let i = 0; i < rows; i++) {
    let row_items = [];
    for (let j = 0; j < columns; j++) {
      const checkboxId = i * columns + j;
      row_items.push(
        <Checkbox
          key={checkboxId}
          padding="0.35rem"
          onChange={(event) => handleCheckboxChange(event, checkboxId)}
        ></Checkbox>
      );
    }
    items.push(<div key={i}>{row_items}</div>);
  }

  return (
    <>
      <div>
        <h1>название фильма</h1>
        <p>какая то инфа о фильме например описание</p>
        <h2>время фильма</h2>
      </div>
      <div className="seats-container">{items}</div>
      <p>Total price: {total_price}р.</p>
    </>
  );
}

export default MovieHall;
