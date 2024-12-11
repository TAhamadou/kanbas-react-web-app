import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Web Development",
    description: "Learn the basics of web development",
    course: "CS5610"
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      
      {/* Assignment Section */}
      <h4>Assignment</h4>
      <input 
        className="form-control w-75 mb-2" 
        id="wd-assignment-title"
        value={assignment.title} 
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>

      <div className="mb-2">
        <input
          type="number"
          className="form-control w-75"
          value={assignment.score}
          onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })}
        />
        <a
          className="btn btn-success mt-2"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
          Update Score
        </a>
      </div>

      <div className="mb-4">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={assignment.completed}
            onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
          />
          <label className="form-check-label">Completed</label>
        </div>
        <a
          className="btn btn-warning mt-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
          Update Completion Status
        </a>
      </div>

      {/* Module Section */}
      <h4>Module</h4>
      <div className="mb-2">
        <input
          className="form-control w-75"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <a
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/name/${module.name}`}>
          Update Module Name
        </a>
      </div>

      <div className="mb-2">
        <textarea
          className="form-control w-75"
          value={module.description}
          onChange={(e) => setModule({ ...module, description: e.target.value })}
        />
        <a
          className="btn btn-info mt-2"
          href={`${MODULE_API_URL}/description/${module.description}`}>
          Update Module Description
        </a>
      </div>

      <div className="mt-4">
        <a
          className="btn btn-primary me-2"
          href={MODULE_API_URL}>
          Get Module
        </a>
        <a
          className="btn btn-secondary"
          href={`${MODULE_API_URL}/name`}>
          Get Module Name
        </a>
      </div>

      <hr />
    </div>
  );
}