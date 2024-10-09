import { BsGripVertical, BsPlus, BsThreeDotsVertical } from "react-icons/bs";

export function AssignmentsHeader() {
    return (
      <div className="wd-title p-3 ps-2 bg-light">
        <BsGripVertical className="me-2 fs-5" />
        ASSIGNMENTS
        <span className="float-end">
          <span className="me-2 text-muted small">40% of Total</span>
          <BsPlus className="text-muted me-2" />
          <BsThreeDotsVertical className="text-muted" />
        </span>
      </div>
    );
  }