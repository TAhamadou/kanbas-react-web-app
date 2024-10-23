/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap float-end">
      <button id="wd-add-module-btn" className="btn btn-med btn-danger me-1">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>
      <div className="dropdown d-inline me-1">
        <button id="wd-publish-all-btn" className="btn btn-med btn-secondary dropdown-toggle"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          <li>
            <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
              Unpublish all modules and items
            </a>
          </li>
          <li>
            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>
      <button id="wd-collapse-all" className="btn btn-secondary btn-med me-1">
        Collapse All
      </button>
      <button id="wd-view-progress" className="btn btn-secondary btn-med me-1">
        View Progress
      </button>
    </div>
  );
}
