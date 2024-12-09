import { BsGripVertical } from "react-icons/bs";
import { FaFileAlt, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useIsFaculty } from "../../Account/RoleCheck";

interface AssignmentProps {
  title: string;
  course: string;
  _id: string;
  onDelete: () => void;
}

export default function Assignment({ title, course, _id, onDelete }: AssignmentProps) {
  const isFaculty = useIsFaculty();
  return (
    <li className="wd-assignment-item">
      <div className="d-flex align-items-center">
        <BsGripVertical className="me-2 fs-5 text-secondary" />
        <FaFileAlt className="me-2 text-success" />


        {isFaculty ? (
          <>
            <Link
              to={`/Kanbas/Courses/${course}/Assignments/${_id}`}
              className="assignment-title flex-grow-1">
              {title}
            </Link>
            <div className="ms-auto">
              <Link
                to={`/Kanbas/Courses/${course}/Assignments/${_id}`}
                className="btn btn-sm btn-warning me-2"
              >
                <FaEdit /> Edit
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="btn btn-sm btn-danger"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </>) : (<div className="assignment-title flex-grow-1">{title}</div>)}
      </div>
    </li>
  );
}