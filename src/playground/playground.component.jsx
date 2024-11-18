import React from "react";
import ReactDOM from "react-dom";

const ObjectToList = ({ data }) => {
  // Base case: if data is not an object or array, render it as a string
  if (typeof data !== "object" || data === null) {
    return <span>{String(data)}</span>;
  }

  // Render arrays as <ul> with <li> for each element
  if (Array.isArray(data)) {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <ObjectToList data={item} />
          </li>
        ))}
      </ul>
    );
  }

  // Render objects as <ul> with <li> for each key-value pair
  return (
    <ul>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> <ObjectToList data={value} />
        </li>
      ))}
    </ul>
  );
};

function Playground() {
  // Example usage
//   const exampleObject = {
//     name: "John",
//     age: 30,
//     hobbies: ["reading", "sports"],
//     address: {
//       city: "New York",
//       zip: "10001",
//     },
//   };
const [data, setData] = React.useState('')
const handleFetchData = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/independent?status=true"
    );
    const fetchedData = await response.json();
    setData(fetchedData);
    console.log(fetchedData);
  };
React.useEffect(() =>  {
    handleFetchData();
}, [])

  return (
    <div>
      <h1>Object to HTML List</h1>
      <ObjectToList data={data} />
    </div>
  );

  //   return <header>Start to test your ideas here</header>;
}

export default Playground;
