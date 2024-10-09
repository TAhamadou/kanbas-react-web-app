import Modules from "../Modules";
import CourseStatus from "./status";
import Assignments from "../Assignments";
export default function Home() {
  return (

    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>

      <div className="d-none d-md-block">
        <CourseStatus />
      </div>
      
      <div className="d-none d-md-block">
        <Assignments />
      </div>
    </div>



  );
}
