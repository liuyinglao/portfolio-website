import React, { useState } from "react";

const NumberAdjuster = () => {
  // Initialize the state to hold the number value, starting at 0
  const [number, setNumber] = useState(0);

  // Function to increment the number
  const increment = () => {
    setNumber(number + 1);
  };

  // Function to decrement the number
  const decrement = () => {
    setNumber(number - 1);
  };

  // Function to handle manual input in the text field
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    // If value is a number, update the state
    if (!isNaN(value)) {
      setNumber(value);
    } else {
      setNumber(0); // Reset to 0 if input is invalid
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={decrement}>-</button>
      <input
        type="text"
        value={number}
        onChange={handleInputChange}
        style={{ width: "50px", textAlign: "center", margin: "0 10px" }}
      />
      <button onClick={increment}>+</button>
    </div>
  );
};

export default NumberAdjuster;
