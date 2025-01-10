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
      {
      name: "Interview Questions",
      description: "Interesting Interview Questions I came across",
      link: "./interview_questions",
    },
  ];
  const listItems = projects.map((item, index) => (
    <div key={item.name}>
      <Link to={item.link}>
        <h1>{item.name}</h1>
      </Link>
      <p>{item.description}</p>
    </div>
  ));
  return <ul>{listItems}</ul>;
}

export default ProjectList;
