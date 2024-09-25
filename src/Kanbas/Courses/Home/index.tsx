import Modules from "../Modules";
import CourseStatus from "./status";
import Assignments from "../Assignments";
export default function Home() {
  return (
    <table id="wd-home">
      <tr>
        <td valign="top">
          <Modules />
        </td>
        <td valign="top">
          <CourseStatus />
        </td>
        <td valign="top">
          <Assignments />
        </td>
      </tr>
    </table>
  );
}
