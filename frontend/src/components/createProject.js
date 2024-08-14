import React, { useState } from 'react';
import axios from 'axios';

function CreateProject() {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/projects', { title })
      .then(response => {
        console.log('Project created:', response.data);
        setTitle('');
      })
      .catch(error => console.error('Error creating project:', error));
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          required
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
