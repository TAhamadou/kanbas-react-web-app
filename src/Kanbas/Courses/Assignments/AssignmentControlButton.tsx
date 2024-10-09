import { BsCheckCircle, BsThreeDotsVertical } from "react-icons/bs";

export function AssignmentControlButtons() {
    return (
      <span className="float-end">
        <BsCheckCircle className="text-success me-2" />
        <BsThreeDotsVertical />
      </span>
    );
  }