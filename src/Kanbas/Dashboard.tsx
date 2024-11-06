/* eslint-disable jsx-a11y/alt-text */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enroll, unenroll } from "./Enrollments/reducer";

export default function Dashboard({ 
  courses, 
  course, 
  setCourse, 
  addNewCourse, 
  deleteCourse, 
  updateCourse 
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && 
        enrollment.course === courseId
    );
  };

  const handleEnrollClick = (courseId: string) => {
    dispatch(enroll({ userId: currentUser._id, courseId }));
  };

  const handleUnenrollClick = (courseId: string) => {
    dispatch(unenroll({ userId: currentUser._id, courseId }));
  };

  const handleCourseClick = (courseId: string) => {
    if (!isEnrolled(courseId)) {
      return;
    }
    navigate(`/Kanbas/Courses/${courseId}/Home`);
  };

  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter((course) => isEnrolled(course._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {currentUser?.role === "FACULTY" ? (
        <>
          <h5>
            New Course
            <button 
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button 
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      ) : (
        <button
          className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled" : "Show All Courses"}
        </button>
      )}
      <hr />
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Enrolled Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card" 
                   onClick={() => handleCourseClick(course._id)}
                   style={{ cursor: isEnrolled(course._id) ? 'pointer' : 'default' }}
              >
                <img src="/images/reactjs.jpg" className="card-img-top" alt="" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                  <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>{course.description}</p>
                  {currentUser?.role === "FACULTY" ? (
                    <>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2"
                        id="wd-edit-course-click"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        isEnrolled(course._id)
                          ? handleUnenrollClick(course._id)
                          : handleEnrollClick(course._id);
                      }}
                      className={`btn ${
                        isEnrolled(course._id) ? "btn-danger" : "btn-success"
                      }`}
                    >
                      {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}