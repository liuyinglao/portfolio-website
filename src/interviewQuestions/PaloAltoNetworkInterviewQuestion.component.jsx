import React from "react";

export default function PaloAltoNetworkInterviewQuestion() {

    const [data, setData] = React.useState(null);
    const [departmentFilter, setDepartmentFilter] = React.useState('');

    React.useEffect(() => {
        const handleFetchData = async () => {
            const response = await fetch(
                "https://mocki.io/v1/2bed2e6f-6fd7-464d-8d13-b3bf74cea4d7", {
                    method: 'GET'
                }
            );
            const fetchedData = await response.json()
            setData(fetchedData);
        };
        handleFetchData();
    }, []);

    const filterDepartments = data?.filter(({name}) => departmentFilter === "" ? true : name.startsWith(departmentFilter));

    const deptToSalary = filterDepartments?.map(({name, employees}) => {
            return {
                name, salary: employees.reduce((cur, emp) => cur + emp.salary, 0) / employees.length
            };
        }
    );
    return (
        <div>
            {data != null ?
                (
                    <div>
                        <label>
                            filter department:
                            <input type="text" id="name" name="name" minLength="4" maxLength="8" size="10"
                                   onChange={event => {
                                       setDepartmentFilter(event.target.value);
                                       // console.log(departmentFilter)
                                   }}/>
                        </label>
                        <ul>{deptToSalary.map(({name, salary}) => {
                            return <li key={name}>
                                {' | ' + name + ' | ' + salary}
                            </li>
                        })}</ul>
                    </div>
                ) :
                (<h2>loading...</h2>)
            }
        </div>
    );
}