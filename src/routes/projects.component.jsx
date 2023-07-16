import { Link } from "react-router-dom";
function ProjectList() {
  const projects = [
    {
      name: "shopping page",
      description: "authentication, database, styling, react, redux, etc.",
    },
    {
      name: "knowledge assistant",
      description: "llm, model tunning, web crawler, etc.",
    },
  ];
  const listItems = projects.map((item) => (
    <div>
      <Link><h1>{item.name}</h1></Link>
      <p>{item.description}</p>
    </div>
  ));
  return <ul>{listItems}</ul>;
}

export default ProjectList;
