import { useState, useEffect } from "react";

function App() {
  const [projects, setProjects] = useState<{ id: number; title: string; description: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
