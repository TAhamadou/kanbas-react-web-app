import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuiz } from "./reducer";
import { KanbasState } from "../../store";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import * as client from "./client";

const API_BASE = process.env.REACT_APP_API_BASE;

const QuizEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { courseId, quizId } = params;
    const COURSES_API = `${API_BASE}/api/quizzes`;
    const [recentlySaved, setRecentlySaved] = useState(false);
    const [quiz, setQuiz] = useState<any>({ _id: "" });
    const findQuizById = async (quizId?: string) => {
        const response = await axios.get(`${COURSES_API}/${quizId}`);
        setQuiz(response.data);
    };

    const dispatch = useDispatch();

    const [quizType, setQuizType] = useState(quiz.quizType || "Graded Quiz");
    const [assignmentGroup, setAssignmentGroup] = useState(
        quiz.assignmentGroup || "Quizzes"
    );
    const [shuffleAnswers, setShuffleAnswers] = useState(
        quiz.shuffleAnswers !== undefined ? quiz.shuffleAnswers : true
    );
    const [timeLimit, setTimeLimit] = useState(quiz.timeLimit || 20);
    const [multipleAttempts, setMultipleAttempts] = useState(
        quiz.multipleAttempts !== undefined ? quiz.multipleAttempts : false
    );
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(
        quiz.showCorrectAnswers || "After Quiz"
    );
    const [accessCode, setAccessCode] = useState(quiz.accessCode || "");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(
        quiz.oneQuestionAtATime !== undefined ? quiz.oneQuestionAtATime : true
    );
    const [webcamRequired, setWebcamRequired] = useState(
        quiz.webcamRequired !== undefined ? quiz.webcamRequired : false
    );
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] =
        useState(
            quiz.lockQuestionsAfterAnswering !== undefined
                ? quiz.lockQuestionsAfterAnswering
                : false
        );
    const [dueDate, setDueDate] = useState(quiz.dueDate || "");
    const [availableDate, setAvailableDate] = useState(
        quiz.availableDate || ""
    );
    const [untilDate, setUntilDate] = useState(quiz.untilDate || "");

    const updateDefaultValues = () => {
        setQuizType(quiz.quizType || "Graded Quiz");
        setAssignmentGroup(quiz.assignmentGroup || "Quizzes");
        setShuffleAnswers(
            quiz.shuffleAnswers !== undefined ? quiz.shuffleAnswers : true
        );
        setTimeLimit(quiz.timeLimit || 20);
        setMultipleAttempts(
            quiz.multipleAttempts !== undefined ? quiz.multipleAttempts : false
        );
        setShowCorrectAnswers(quiz.showCorrectAnswers || "After Quiz");
        setAccessCode(quiz.accessCode || "");
        setOneQuestionAtATime(
            quiz.oneQuestionAtATime !== undefined
                ? quiz.oneQuestionAtATime
                : true
        );
        setWebcamRequired(
            quiz.webcamRequired !== undefined ? quiz.webcamRequired : false
        );
        setLockQuestionsAfterAnswering(
            quiz.lockQuestionsAfterAnswering !== undefined
                ? quiz.lockQuestionsAfterAnswering
                : false
        );
        setDueDate(quiz.dueDate || "");
        setAvailableDate(quiz.availableDate || "");
        setUntilDate(quiz.untilDate || "");
    };

    useEffect(() => {
        findQuizById(quizId);
    }, [quizId]);

    useEffect(() => {
        updateDefaultValues();
    }, [quiz]);

    const handleSave = () => {
        const updatedQuiz = {
            ...quiz,
            quizType,
            assignmentGroup,
            shuffleAnswers,
            timeLimit,
            multipleAttempts,
            showCorrectAnswers,
            accessCode,
            oneQuestionAtATime,
            webcamRequired,
            lockQuestionsAfterAnswering,
            dueDate,
            availableDate,
            untilDate,
        };
        client.updateQuiz(updatedQuiz).then((status) => {
            dispatch(updateQuiz(updatedQuiz));
            setQuiz(updatedQuiz);
            setRecentlySaved(true);
            setTimeout(() => {
                setRecentlySaved(false);
            }, 2000);
        });
    };

    const handlePublishQuiz = () => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        client.updateQuiz(updatedQuiz).then((status) => {
            setQuiz(updatedQuiz);
            dispatch(updateQuiz(updatedQuiz));
        });
    };

    return (
        <div className="">
            <h2 className="mb-4 title">{quiz.name}</h2>
            <div className="mb-4 title ">
                <div className="">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() =>
                            navigate(
                                `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit/questions`
                            )
                        }
                    >
                        Edit questions
                    </button>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() =>
                            navigate(
                                `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/preview`
                            )
                        }
                    >
                        Preview
                    </button>
                    <button
                        className={
                            quiz.published
                                ? "btn-success btn me-2"
                                : "btn-outline-secondary btn me-2"
                        }
                        onClick={() => handlePublishQuiz()}
                    >
                        {quiz.published
                            ? "Currently published"
                            : "Currently unpublished"}
                    </button>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Quiz Type:</label>
                <select
                    className="form-select"
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Points:</label>
                <span className="form-control-plaintext">{quiz.points}</span>
            </div>
            <div className="mb-3">
                <label className="form-label">Assignment Group:</label>
                <select
                    className="form-select"
                    value={assignmentGroup}
                    onChange={(e) => setAssignmentGroup(e.target.value)}
                >
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Shuffle Answers:</label>
                <select
                    className="form-select"
                    value={shuffleAnswers ? "Yes" : "No"}
                    onChange={(e) =>
                        setShuffleAnswers(e.target.value === "Yes")
                    }
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Time Limit (in minutes):</label>
                <input
                    type="number"
                    className="form-control"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Multiple Attempts:</label>
                <select
                    className="form-select"
                    value={multipleAttempts ? "Yes" : "No"}
                    onChange={(e) =>
                        setMultipleAttempts(e.target.value === "Yes")
                    }
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Show Correct Answers:</label>
                <select
                    className="form-select"
                    value={showCorrectAnswers}
                    onChange={(e) => setShowCorrectAnswers(e.target.value)}
                >
                    <option value="After Quiz">After Quiz</option>
                    <option value="After Each Attempt">
                        After Each Attempt
                    </option>
                    <option value="Never">Never</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Access Code:</label>
                <input
                    type="text"
                    className="form-control"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">One Question at a Time:</label>
                <select
                    className="form-select"
                    value={oneQuestionAtATime ? "Yes" : "No"}
                    onChange={(e) =>
                        setOneQuestionAtATime(e.target.value === "Yes")
                    }
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Webcam Required:</label>
                <select
                    className="form-select"
                    value={webcamRequired ? "Yes" : "No"}
                    onChange={(e) =>
                        setWebcamRequired(e.target.value === "Yes")
                    }
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Lock Questions After Answering:
                </label>
                <select
                    className="form-select"
                    value={lockQuestionsAfterAnswering ? "Yes" : "No"}
                    onChange={(e) =>
                        setLockQuestionsAfterAnswering(e.target.value === "Yes")
                    }
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Due Date:</label>
                <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Available Date:</label>
                <input
                    type="date"
                    className="form-control"
                    value={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Until Date:</label>
                <input
                    type="date"
                    className="form-control"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
            {recentlySaved && (
                <span className="ms-3 text-success">Quiz saved.</span>
            )}
        </div>
    );
};

export default QuizEdit;
