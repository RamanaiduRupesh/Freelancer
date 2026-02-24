import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/newProject.css';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [skills, setSkills] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientId = localStorage.getItem('userId');
    const clientName = localStorage.getItem('username');
    const clientEmail = localStorage.getItem('email');

    if (!title || !description || !budget || !skills) {
      alert('Please fill all fields before submitting');
      return;
    }

    try {
      await axios.post('http://localhost:6001/project/create', {
        title,
        description,
        budget,
        skills,
        clientId,
        clientName,
        clientEmail,
      });

      alert('✅ New project added successfully!');
      setTitle('');
      setDescription('');
      setBudget('');
      setSkills('');
      navigate('/client');
    } catch (err) {
      console.error('Project creation failed:', err);
      alert('❌ Operation failed! Check console for details.');
    }
  };

  return (
    <div className="new-project-page">
      <h3>Post New Project</h3>

      <form className="new-project-form" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            className="form-control mb-3"
            id="title"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Project Title</label>
        </div>

        <div className="form-floating">
          <textarea
            className="form-control mb-3"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            className="form-control mb-3"
            id="budget"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <label htmlFor="budget">Budget (in ₹)</label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control mb-3"
            id="skills"
            placeholder="Required Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <label htmlFor="skills">Required Skills (separate with commas)</label>
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProject;
