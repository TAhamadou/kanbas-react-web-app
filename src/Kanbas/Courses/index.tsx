import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
import Assignments from "./Assignments";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Detail";
import QuizEdit from "./Quizzes/Edit";
import QuizPreview from "./Quizzes/Preview";
import QuizQuestionsEditor from "./Quizzes/QuizQuestionsEditor";



export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);

  const { pathname } = useLocation();
  return (
    <div>
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/new" element={<AssignmentEditor isUpdate={false} />} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor isUpdate={true} />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route
              path="Quizzes/:quizId"
              element={<QuizDetails />}
            />
            <Route
              path="Quizzes/:quizId/preview"
              element={<QuizPreview />}
            />
            <Route
              path="Quizzes/:quizId/edit"
              element={<QuizEdit />}
            />
            <Route
              path="Quizzes/:quizId/edit/questions"
              element={<QuizQuestionsEditor />}
            />
          </Routes>
        </div></div>
    </div>
  );
}
