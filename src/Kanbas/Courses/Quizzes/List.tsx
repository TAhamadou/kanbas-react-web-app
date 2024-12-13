import React, { useEffect } from "react";
import "./index.css";

import { useSelector, useDispatch } from "react-redux";
import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    setQuiz,
    setQuizzes,
} from "./reducer";
import { KanbasState } from "../../store";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";

function QuizList() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        client.findQuizzesForCourse(courseId).then((quizzes) => {
            dispatch(setQuizzes(quizzes));
        });
    }, [courseId]);

    const quizList = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizzes
    );
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();

    const handleAddQuiz = () => {
        client.createQuiz(courseId, quiz).then((quiz) => {
            dispatch(addQuiz(quiz));
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
        });
    };

    const handleDeleteQuiz = (quizId: string) => {
        client.deleteQuiz(quizId).then((status) => {
            dispatch(deleteQuiz(quizId));
        });
    };

    const handlePublishQuiz = (quizId: string) => {
        const quiz = quizList.find((quiz) => quiz._id === quizId);
        client
            .updateQuiz({ ...quiz, published: !quiz.published })
            .then((status) => {
                dispatch(updateQuiz({ ...quiz, published: !quiz.published }));
            });
    };

    const getAvailabilityText = (quiz: any) => {
        const currentDate = new Date();
        const availableDate = new Date(quiz.availableDate);
        const availableUntilDate = new Date(quiz.availableUntilDate);

        if (currentDate > availableUntilDate) {
            return "Closed";
        } else if (
            currentDate >= availableDate &&
            currentDate <= availableUntilDate
        ) {
            return "Available";
        } else {
            return `Not available until ${availableDate.toLocaleDateString()}`;
        }
    };

    return (
        <>
            {quizList.length === 0 && (
                <div className="alert alert-info">
                    No quizzes found. Click the "Add Quiz" button to create a
                    new quiz.
                </div>
            )}

            <ul className="list-group">
                {quizList
                    .filter((quiz) => quiz.course === courseId)
                    .map((quiz, index) => (
                        <li key={index} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="my-2">
                                    <Link
                                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                                        className="mb-2 fs-5 text-decoration-none"
                                    >
                                        {quiz.name}
                                        <span className="ms-2">
                                            {quiz.published ? (
                                                <span className="text-success">
                                                    ✅
                                                </span>
                                            ) : (
                                                <span className="text-danger">
                                                    🚫
                                                </span>
                                            )}
                                        </span>
                                    </Link>
                                    <div className="text-muted">
                                        <span className="me-2">
                                            {getAvailabilityText(quiz)}
                                        </span>
                                        <span className="me-2">
                                            Due:{" "}
                                            {new Date(
                                                quiz.dueDate
                                            ).toLocaleDateString()}
                                        </span>
                                        <span className="me-2">
                                            Points: {quiz.points}
                                        </span>
                                        <span>
                                            Questions: {quiz.questions.length}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline-secondary me-2"
                                        onClick={() =>
                                            navigate(
                                                `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger me-2"
                                        onClick={() =>
                                            handleDeleteQuiz(quiz._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-secondary me-2"
                                        onClick={() =>
                                            handlePublishQuiz(quiz._id)
                                        }
                                    >
                                        {quiz.published
                                            ? "Unpublish"
                                            : "Publish"}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                <li className="list-group-item">
                    <button
                        className="btn btn-primary my-2 float-end"
                        onClick={handleAddQuiz}
                    >
                        + Add Quiz
                    </button>
                </li>
            </ul>
        </>
    );
}

export default QuizList;
