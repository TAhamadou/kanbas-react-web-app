import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { AssignmentsHeader } from "./AssignmentHeader";
import Assignment from "./Assignment";

export default function AssignmentTable() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => 
    state.assignmentsReducer.assignments.filter(
      (assignment: any) => assignment.course === cid
    )
  );

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div>
      <div className="row mb-3 align-items-center">
        <div className="col">
          <AssignmentsHeader />
        </div>
        <div className="col-auto">
          <Link 
            to={`/Kanbas/Courses/${cid}/Assignments/new`}
            className="btn btn-danger"
          >
            + Assignment
          </Link>
        </div>
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