import React from "react";

// const ObjectToList = ({ data }) => {
//   // Base case: if data is not an object or array, render it as a string
//   if (typeof data !== "object" || data === null) {
//     return <span>{String(data)}</span>;
//   }
//
//   // Render arrays as <ul> with <li> for each element
//   if (Array.isArray(data)) {
//     return (
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>
//             <ObjectToList data={item} />
//           </li>
//         ))}
//       </ul>
//     );
//   }
//
//   // Render objects as <ul> with <li> for each key-value pair
//   return (
//     <ul>
//       {Object.entries(data).map(([key, value]) => (
//         <li key={key}>
//           <strong>{key}:</strong> <ObjectToList data={value} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// React Coding Questions
// fetch salary data from the API and calculate average salary of each department.
// support department filter
// support loading spinner
// 前端三板斧： fetch -> process -> render

function Playground() {


// const [data, setData] = React.useState('')
// const handleFetchData = async () => {
//     const response = await fetch(
//       "http://localhost:5006/entries/", {
//           method: 'POST'
//         }
//     );
//     console.log(response)
//     const fetchedData = await response.text()
//     setData(fetchedData);
//     console.log(fetchedData);
//   };
//     React.useEffect(() =>  {
//         handleFetchData();
//     }, [handleFetchData])
//
//   return (
//     <div>
//       <h1>abcd</h1>
//         <p>{data}</p>
//     </div>
//   );

      return <header>Start to test your ideas here</header>;
}

export default Playground;
