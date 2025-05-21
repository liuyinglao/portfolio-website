import { useState, FC } from "react";

const Playground: FC = () => {
    const ENDPOINT = "https://gentle-ravine-92622-4d0352cb2a24.herokuapp.com/entries/";

    const [data, setData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(ENDPOINT);
            const result: { message?: string } = await response.json();
            console.log(result);
            setData(result.message || "No data found");
        } catch (error: unknown) {
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
};

export default Playground; 