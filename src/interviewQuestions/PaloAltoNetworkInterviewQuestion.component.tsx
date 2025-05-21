import { FC, useEffect, useState } from "react";

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

const PaloAltoNetworkInterviewQuestion: FC = () => {
    const [data, setData] = useState<Department[] | null>(null);
    const [departmentFilter, setDepartmentFilter] = useState<string>('');

    useEffect(() => {
        const handleFetchData = async () => {
            const response = await fetch(
                "https://mocki.io/v1/2bed2e6f-6fd7-464d-8d13-b3bf74cea4d7", {
                    method: 'GET'
                }
            );
            const fetchedData: Department[] = await response.json();
            setData(fetchedData);
        };
        handleFetchData();
    }, []);

    const filterDepartments = data?.filter(({name}) => 
        departmentFilter === "" ? true : name.startsWith(departmentFilter)
    );

    const deptToSalary: DepartmentSalary[] | undefined = filterDepartments?.map(({name, employees}) => ({
        name,
        salary: employees.reduce((cur, emp) => cur + emp.salary, 0) / employees.length
    }));

    return (
        <div>
            {data != null ? (
                <div>
                    <label>
                        filter department:
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            minLength={4} 
                            maxLength={8} 
                            size={10}
                            onChange={(event) => {
                                setDepartmentFilter(event.target.value);
                            }}
                        />
                    </label>
                    <ul>
                        {deptToSalary?.map(({name, salary}) => (
                            <li key={name}>
                                {' | ' + name + ' | ' + salary}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h2>loading...</h2>
            )}
        </div>
    );
};

export default PaloAltoNetworkInterviewQuestion; 