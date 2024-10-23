import React from 'react';
import { Link, useParams, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams(); // Get the course ID from URL
  const { pathname } = useLocation(); // Get current pathname

  // Array of navigation links
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, index) => (
        <li
          key={index}
          className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}
        >
          <Link 
          className={`list-group-item border border-0 text-danger`}
          to={link}>{link}</Link>
        </li>
      ))}
    </div>
  );
}

