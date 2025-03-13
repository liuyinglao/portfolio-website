import { useState } from "react";
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
    const ENDPOINT = "https://gentle-ravine-92622-4d0352cb2a24.herokuapp.com/entries/"

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(ENDPOINT);
            const result = await response.json();
            console.log(result);
            setData(result.message || "No data found");
        } catch (error) {
            setData("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <button onClick={fetchData} disabled={loading}>
                {loading ? "Loading..." : "Fetch Data"}
            </button>
            <input type="text" value={data} readOnly className="w-80" />
        </div>
    );
}

export default Playground;
