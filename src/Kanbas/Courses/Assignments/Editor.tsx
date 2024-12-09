import React from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { Link } from "react-router-dom";

export default function AssignmentEditor({isUpdate} : {isUpdate: boolean}) {
  const { cid, assignmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignment = useSelector((state: any) => 
    state.assignmentsReducer.assignments.find(
      (a: any) => a._id === assignmentId
    )
  );

  const [assignmentData, setAssignmentData] = React.useState(
    assignment || {
      title: "",
      description: "New Assignment Description",
      points: 100,
      dueDate: "2024-05-13T23:59",
      availableFromDate: "2024-05-06T00:00",
      availableUntilDate: "2024-05-20T23:59",
      course: cid, // Ensure course ID is set
    }
  );

  const handleSave = () => {
    // Validate required fields
    if (!assignmentData.title || !assignmentData.course) {
      alert("Title and course are required!");
      return;
    }
    
    if (!isUpdate) {
      // For updating existing assignment
      dispatch(updateAssignment({ ...assignmentData, _id: assignmentId }));
    } else {
      // For new assignment, make sure to pass all required fields
      dispatch(addAssignment({
        title: assignmentData.title,
        course: assignmentData.course,
        description: assignmentData.description,
        points: assignmentData.points,
        dueDate: assignmentData.dueDate,
        availableFromDate: assignmentData.availableFromDate,
        availableUntilDate: assignmentData.availableUntilDate
      }));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container-fluid mt-4">
      <h2>{assignmentId ? "Edit Assignment" : "New Assignment"}</h2>
      <div className="mb-3">
        <label htmlFor="wd-assignment-name" className="form-label">Assignment Name</label>
        <input
          className="form-control"
          id="wd-assignment-name"
          value={assignmentData.title}
          onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Assignment Description</label>
        <textarea
          className="form-control"
          id="wd-description"
          rows={5}
          value={assignmentData.description}
          onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input
            className="form-control"
            id="wd-points"
            type="number"
            value={assignmentData.points}
            onChange={(e) => setAssignmentData({ ...assignmentData, points: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="wd-due-date" className="form-label">Due Date</label>
          <input
            className="form-control"
            id="wd-due-date"
            type="datetime-local"
            value={assignmentData.dueDate}
            onChange={(e) => setAssignmentData({ ...assignmentData, dueDate: e.target.value })}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="wd-available-from" className="form-label">Available from</label>
          <input
            className="form-control"
            id="wd-available-from"
            type="datetime-local"
            value={assignmentData.availableFromDate}
            onChange={(e) => setAssignmentData({ 
              ...assignmentData, 
              availableFromDate: e.target.value 
            })}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="wd-available-until" className="form-label">Until</label>
          <input
            className="form-control"
            id="wd-available-until"
            type="datetime-local"
            value={assignmentData.availableUntilDate}
            onChange={(e) => setAssignmentData({ 
              ...assignmentData, 
              availableUntilDate: e.target.value 
            })}
          />
        </div>
      </div>

      <div className="mt-4">
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className="btn btn-light me-2"
        >
          Cancel
        </Link>
        <button onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}