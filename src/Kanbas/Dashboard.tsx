/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enroll, unenroll, setEnrollments } from "./Enrollments/reducer";
import { useIsFaculty } from "./Account/RoleCheck";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Enrollments/client";
import * as userClient from "./Account/client";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void
}) {
  const isFaculty = useIsFaculty();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  // Function to fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const myCourses = await userClient.findMyCourses();
      setEnrolledCourses(myCourses);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  // Function to fetch enrollments and update Redux state
  const fetchAndUpdateEnrollments = async () => {
    try {
      const userCourses = await userClient.findMyCourses();
      dispatch(setEnrollments(userCourses.map((course: any) => ({
        user: currentUser._id,
        course: course._id,
        _id: course._id
      }))));
      await fetchEnrolledCourses(); // Update enrolled courses after enrollment changes
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  // Fetch all courses and enrollments when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const coursesData = await courseClient.fetchAllCourses();
        setAllCourses(coursesData);
        await fetchAndUpdateEnrollments();
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

  const handleEnrollClick = async (courseId: string) => {
    try {
      await enrollmentClient.enroll(currentUser._id, courseId);
      await fetchAndUpdateEnrollments();
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenrollClick = async (courseId: string) => {
    try {
      await enrollmentClient.unenroll(currentUser._id, courseId);
      await fetchAndUpdateEnrollments();
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  const handleCourseClick = (courseId: string) => {
    if (!isEnrolled(courseId)) {
      return;
    }
    navigate(`/Kanbas/Courses/${courseId}/Home`);
  };

  const handleAddNewCourse = async () => {
    await addNewCourse();
    await handleEnrollClick(course._id);
  };

  const displayedCourses = showAllCourses
    ? allCourses
    : enrolledCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddNewCourse}
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
      )}
      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
        {enrolling ? "My Courses" : "All Courses"} </button>


      <h2 id="wd-dashboard-published">
        {enrolling ? "All Courses" : "Enrolled Courses"} ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card"
                onClick={() => handleCourseClick(course._id)}
                style={{ cursor: isEnrolled(course._id) ? 'pointer' : 'default' }}
              >
                <img src="/images/reactjs.jpg" className="card-img-top" alt="" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {enrolling && (
                      <button onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                      }}
                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                    {course.name}</h5>
                  <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>{course.description}</p>
                  {enrolling && isFaculty && (
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
