import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <Link to="/create-project">Create New Project</Link>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <Link to={`/projects/${project._id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
