import { FC, useEffect, useState } from "react";
import "./InterviewQuestions.style.css";

interface Employee {
    id: number;
    name: string;
    salary: number;
}

interface Department {
    id: number;
    name: string;
    employees: Employee[];
}

interface DepartmentSalary {
    name: string;
    salary: number;
}

// Mock data to replace the unreliable API
const mockDepartments: Department[] = [
    {
        id: 1,
        name: "Engineering",
        employees: [
            { id: 1, name: "John Doe", salary: 120000 },
            { id: 2, name: "Jane Smith", salary: 125000 },
            { id: 3, name: "Bob Johnson", salary: 115000 }
        ]
    },
    {
        id: 2,
        name: "Marketing",
        employees: [
            { id: 4, name: "Alice Brown", salary: 95000 },
            { id: 5, name: "Charlie Davis", salary: 90000 }
        ]
    },
    {
        id: 3,
        name: "Sales",
        employees: [
            { id: 6, name: "Eve Wilson", salary: 85000 },
            { id: 7, name: "Frank Miller", salary: 82000 },
            { id: 8, name: "Grace Lee", salary: 88000 }
        ]
    },
    {
        id: 4,
        name: "Product",
        employees: [
            { id: 9, name: "David Wang", salary: 110000 },
            { id: 10, name: "Sarah Chen", salary: 115000 }
        ]
    }
];

const PaloAltoNetworkInterviewQuestion: FC = () => {
    const [data, setData] = useState<Department[] | null>(null);
    const [departmentFilter, setDepartmentFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate API call with a small delay
        const loadMockData = async () => {
            try {
                setIsLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                setData(mockDepartments);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        void loadMockData();
    }, []);

    const filterDepartments = data?.filter(({name}) => 
        departmentFilter === "" ? true : name.toLowerCase().includes(departmentFilter.toLowerCase())
    );

    const deptToSalary: DepartmentSalary[] | undefined = filterDepartments?.map(({name, employees}) => ({
        name,
        salary: Math.round(employees.reduce((cur, emp) => cur + emp.salary, 0) / employees.length)
    }));

    return (
        <div className="palo-alto-container">
            {!isLoading ? (
                <div>
                    <label className="palo-alto-label">
                        Filter Department:
                        <input 
                            type="text" 
                            className="palo-alto-input"
                            placeholder="Enter department name"
                            value={departmentFilter}
                            onChange={(event) => {
                                setDepartmentFilter(event.target.value);
                            }}
                        />
                    </label>
                    {deptToSalary && deptToSalary.length > 0 ? (
                        <ul className="salary-list">
                            {deptToSalary.map(({name, salary}) => (
                                <li key={name} className="salary-item">
                                    <span>{name}</span>
                                    <span>${salary.toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-results">No departments found matching your filter.</p>
                    )}
                </div>
            ) : (
                <h2 className="loading-text">Loading...</h2>
            )}
        </div>
    );
};

export default PaloAltoNetworkInterviewQuestion; 