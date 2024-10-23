import Assignment from "./Assignment";
import { AssignmentsHeader } from "./AssignmentHeader";
import * as db from "../../Database";
import { useParams } from "react-router";


export default function AssigmentTable() {
    const { cid } = useParams();
    const assignmentData = db.assignments
        .filter((assignment) => assignment.course === cid)
    return (
        <div>
            <div className="row mb-3 align-items-center">
                <div className="col">
                    <AssignmentsHeader />
                </div>
                <div className="col-auto">
                    <button className="btn btn-light me-2">+ Group</button>
                    <button className="btn btn-danger">+ Assignment</button>
                </div>
            </div>
            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <ul className="wd-assignment-list list-group rounded-0">
                        {assignmentData
                            .map((assignment) => (
                                <Assignment key={assignment._id} {...assignment} />
                            ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}