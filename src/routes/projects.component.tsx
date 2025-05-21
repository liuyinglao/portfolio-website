import { FC } from "react";
import { Link } from "react-router-dom";
import './projects.style.css';

interface Project {
  name: string;
  description: string;
  link: string;
  tags: string[];
}

const ProjectList: FC = () => {
  const projects: Project[] = [
    {
      name: "React Examples",
      description: "A collection of common UI patterns and components implemented in React, showcasing best practices and reusable solutions.",
      link: "./reactdom",
      tags: ["React", "UI Components", "TypeScript"],
    },
    {
      name: "React Playground",
      description: "An interactive environment for experimenting with React features and testing new component ideas in real-time.",
      link: "./playground",
      tags: ["React", "Development", "Testing"],
    },
    {
      name: "Shopping Page",
      description: "A full-featured e-commerce platform demonstrating authentication, database integration, modern styling, and state management with Redux.",
      link: "https://google.com",
      tags: ["React", "Redux", "Authentication", "Database"],
    },
    {
      name: "Knowledge Assistant",
      description: "An AI-powered assistant leveraging LLMs, custom model tuning, and web crawling capabilities for intelligent information retrieval.",
      link: "https://google.com",
      tags: ["LLM", "AI", "Web Crawler"],
    },
    {
      name: "PlayTorch",
      description: "A mobile development framework combining React Native with PyTorch, enabling ML-powered applications through JSI bridge.",
      link: "https://playtorch.dev/",
      tags: ["React Native", "PyTorch", "Mobile", "ML"],
    },
    {
      name: "Interview Questions",
      description: "A curated collection of interesting technical interview questions with detailed solutions and explanations.",
      link: "./interview_questions",
      tags: ["Algorithms", "System Design", "Problem Solving"],
    },
  ];

  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>My Projects</h1>
        <p>Explore my portfolio of software engineering projects and experiments</p>
      </header>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link to={project.link} key={project.name} className="project-link">
            <div className="project-card">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList; 