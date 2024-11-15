import { Link } from "react-router-dom";
function ProjectList() {
  const projects = [
    {
      name: "React Examples",
      description: "how common UI are achieved with react",
      link: "./reactdom",
    },
    {
      name: "React Playground",
      description: "how common UI are achieved with react",
      link: "./playground",
    },
    {
      name: "shopping page",
      description: "authentication, database, styling, react, redux, etc.",
      link: "https://google.com",
    },
    {
      name: "knowledge assistant",
      description: "llm, model tunning, web crawler, etc.",
      link: "https://google.com",
    },
    {
      name: "PlayTorch",
      description: "mobile, react-native, pytorch, jsi",
      link: "https://playtorch.dev/",
    },
  ];
  const listItems = projects.map((item) => (
    <div>
      <Link to={item.link}>
        <h1>{item.name}</h1>
      </Link>
      <p>{item.description}</p>
    </div>
  ));
  return <ul>{listItems}</ul>;
}

export default ProjectList;
