import Assignment from "./Assignment";
import { AssignmentsHeader } from "./AssignmentHeader";

const assignmentsData = [
    {
        title: "A1 - ENV + HTML",
        modules: "Multiple Modules",
        availableDate: "May 6 at 12:00am",
        dueDate: "May 13 at 11:59pm",
        points: "100",
        _id: "A1"
    },
    {
        title: "A2 - CSS + BOOTSTRAP",
        modules: "Multiple Modules",
        availableDate: "May 13 at 12:00am",
        dueDate: "May 20 at 11:59pm",
        points: "100",
        _id: "A2"
    },
    {
        title: "A3 - JAVASCRIPT + REACT",
        modules: "Multiple Modules",
        availableDate: "May 20 at 12:00am",
        dueDate: "May 27 at 11:59pm",
        points: "100",
        _id: "A3"
    }
];

export default function AssigmentTable() {
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
                        {assignmentsData.map((assignment) => (
                            <Assignment key={assignment._id} {...assignment} />
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}