import "./FeatureTable.style.css";
import NumberAdjuster from "./features/counter.component";
import Accordion from "./features/accordion.component";
import Autocomplete from "./features/autocomplete.component";
import Carousel from './features/carousel.component';
import Fetchapi from './features/fetchapi.component';

function ReactDomFeatureList() {
  const data = [
    { id: 1, feature: "counter", showcase: <NumberAdjuster /> },
    { id: 2, feature: "input", showcase: <Autocomplete /> },
    { id: 3, feature: "Accordion", showcase: <Accordion /> },
    { id: 4, feature: "Carousel", showcase: <Carousel /> },
    { id: 5, feature: "Fetchapi", showcase: <Fetchapi /> },
  ];
  const columns = [
    { header: "Feature", accessor: "feature" },
    { header: "Showcase", accessor: "showcase" },
  ];

  return (
    <table style={{ boarder: "solid 1px gray" }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReactDomFeatureList;
