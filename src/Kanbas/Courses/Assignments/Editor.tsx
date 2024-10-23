import React from 'react';
import * as db from "../../Database";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

export default function AssignmentEditor() {
    const { cid, assignmentId } = useParams();
    const assignment = db.assignments
        .find((assignment) => assignment.course === cid && assignment._id === assignmentId)
    return (
        <div className="container-fluid mt-4">
            <h2>{assignment && assignment.title}</h2>
            <input className="form-control mb-3" id="wd-name" value={assignment?._id} />

            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label">Assignment Description</label>
                <textarea className="form-control" id="wd-description" rows={5}>
                    The assignment is available online
                    Submit a link to the landing page of your Web application running on Netlify.
                    The landing page should include the following:
                    • Your full name and section
                    • Links to each of the lab assignments
                    • Link to the Kanbas application
                    • Links to all relevant source code repositories
                    The Kanbas application should include a link to navigate back to the landing page.
                </textarea>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input className="form-control" id="wd-points" type="number" value={100} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                    <select className="form-select" id="wd-group">
                        <option>ASSIGNMENTS</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                    <select className="form-select" id="wd-display-grade-as">
                        <option>Percentage</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                    <select className="form-select" id="wd-submission-type">
                        <option>Online</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Online Entry Options</label>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                    <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="wd-website-url" checked />
                    <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
                    <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
                    <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="wd-file-upload" />
                    <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="wd-assign-to" className="form-label">Assign</label>
                    <input className="form-control" id="wd-assign-to" value="Everyone" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="wd-due-date" className="form-label">Due</label>
                    <input className="form-control" id="wd-due-date" type="datetime-local" value="2024-05-13T23:59" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input className="form-control" id="wd-available-from" type="datetime-local" value="2024-05-06T00:00" />
                </div>
                <div className="col-md-3">
                    <label htmlFor="wd-available-until" className="form-label">Until</label>
                    <input className="form-control" id="wd-available-until" type="datetime-local" value="2024-05-20T23:59" />
                </div>
            </div>

            <div className="mt-4">
                <Link 
                    to={`/Kanbas/Courses/${cid}/Assignments`}
                    className="btn btn-light me-2"
                >
                    Cancel
                </Link>
                <Link 
                    to={`/Kanbas/Courses/${cid}/Assignments`}
                    className="btn btn-danger"
                >
                    Save
                </Link>
            </div>
        </div>
    );
}