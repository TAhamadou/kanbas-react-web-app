/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { AssignmentsHeader } from "./AssignmentHeader";
import Assignment from "./Assignment";
import { useIsFaculty } from "../../Account/RoleCheck";
import { useEffect } from "react";
import * as client from "./client";

export default function AssignmentTable() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => 
    state.assignmentsReducer.assignments.filter(
      (assignment: any) => assignment.course === cid
    )
  );
  const isFaculty = useIsFaculty();

  const fetchAssignments = async () => {
    try {
      const assignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await client.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  return (
    <div>
      <div className="row mb-3 align-items-center">
        <div className="col">
          <AssignmentsHeader />
        </div>
        
        {isFaculty && (
          <div className="col-auto">
            <Link 
              to={`/Kanbas/Courses/${cid}/Assignments/new`}
              className="btn btn-danger"
            >
              + Assignment
            </Link>
          </div>
        )}
      </div>

      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <ul className="wd-assignment-list list-group rounded-0">
            {assignments.map((assignment: any) => (
              <Assignment 
                key={assignment._id}
                {...assignment}
                onDelete={() => handleDelete(assignment._id)}
              />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}