import { BsGripVertical } from "react-icons/bs";
import { AssignmentControlButtons } from "./AssignmentControlButton";
import { FaFileAlt } from "react-icons/fa";
import { Link} from "react-router-dom";


/* eslint-disable jsx-a11y/anchor-is-valid */
interface AssignmentProps {
    title: string;
    modules: string;
    availableDate: string;
    dueDate: string;
    points: string;
    _id: string;
}

export default function Assignment({ title, modules, availableDate, dueDate, points, _id }: AssignmentProps) {
    return (
      <li className="wd-assignment-item">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-5 text-secondary" />
          <FaFileAlt className="me-2 text-success" />
          <Link to={`/Kanbas/Courses/1234/Assignments/Editor`} className="assignment-title">
            {title}
          </Link>
          <AssignmentControlButtons />
        </div>
        <div className="assignment-info ms-4 mt-2">
          {modules} | Not available until {availableDate} | Due {dueDate} | {points} pts
        </div>
        
      </li>
    );
  }