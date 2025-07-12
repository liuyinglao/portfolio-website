import { FC, ReactNode } from 'react';
import "./FeatureTable.style.css";
import NumberAdjuster from "./features/counter.component";
import Accordion from "./features/accordion.component";
import Autocomplete from "./features/autocomplete.component";
import Carousel from './features/carousel.component';
import Fetchapi from './features/fetchapi.component';
import ConnectionTest from "./features/connectToDjango.component";

interface FeatureData {
    id: number;
    feature: string;
    showcase: ReactNode;
}

interface Column {
    header: string;
    accessor: keyof FeatureData;
}

const ReactDomFeatureList: FC = () => {
    const data: FeatureData[] = [
        {id: 1, feature: "Counter", showcase: <div className="feature-showcase"><NumberAdjuster/></div>},
        {id: 2, feature: "Autocomplete Input", showcase: <div className="feature-showcase"><Autocomplete/></div>},
        {id: 3, feature: "Accordion", showcase: <div className="feature-showcase"><Accordion/></div>},
        {id: 4, feature: "Carousel", showcase: <div className="feature-showcase"><Carousel/></div>},
        {id: 5, feature: "Fetch API Demo", showcase: <div className="feature-showcase"><Fetchapi/></div>},
        {id: 6, feature: "Django Connection Test", showcase: <div className="feature-showcase"><ConnectionTest/></div>},
    ];

    const columns: Column[] = [
        {header: "Feature", accessor: "feature"},
        {header: "Showcase", accessor: "showcase"},
    ];

    return (
        <div className="feature-table-container">
            <table className="feature-table">
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
        </div>
    );
}

export default ReactDomFeatureList; 