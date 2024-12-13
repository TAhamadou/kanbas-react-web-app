import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import * as client from "./client";
import { KanbasState } from "../../store";

const API_BASE = process.env.REACT_APP_API_BASE;

const QuizDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { courseId, quizId } = params;
    const COURSES_API = `${API_BASE}/api/quizzes`;
    const [quiz, setQuiz] = useState<any>({ _id: "" });
    const findQuizById = async (quizId?: string) => {
        const response = await axios.get(`${COURSES_API}/${quizId}`);
        setQuiz(response.data);
    };

    useEffect(() => {
        findQuizById(quizId);
    }, [quizId]);

    const handlePublishQuiz = () => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        client.updateQuiz(updatedQuiz).then((status) => {
            setQuiz(updatedQuiz);
        });
    };

    return (
        <div className="">
            <h2 className="mb-4 title">{quiz.name}</h2>
            <div className="mb-4">
                <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() =>
                        navigate(
                            `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit`
                        )
                    }
                >
                    Edit
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
                            ? "btn btn-success me-2"
                            : "btn btn-outline-secondary me-2"
                    }
                    onClick={() => handlePublishQuiz()}
                >
                    {quiz.published ? "Published" : "Unpublished"}
                </button>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p>
                        <strong>Quiz Type:</strong> {quiz.quizType}
                    </p>
                    <p>
                        <strong>Points:</strong> {quiz.points}
                    </p>
                    <p>
                        <strong>Assignment Group:</strong>{" "}
                        {quiz.assignmentGroup}
                    </p>
                    <p>
                        <strong>Shuffle Answers:</strong>{" "}
                        {quiz.shuffleAnswers ? "Yes" : "No"}
                    </p>
                    <p>
                        <strong>Time Limit:</strong> {quiz.timeLimit} minutes
                    </p>
                    <p>
                        <strong>Multiple Attempts:</strong>{" "}
                        {quiz.multipleAttempts ? "Yes" : "No"}
                    </p>
                </div>
                <div className="col-md-6">
                    <p>
                        <strong>Show Correct Answers:</strong>{" "}
                        {quiz.showCorrectAnswers}
                    </p>
                    <p>
                        <strong>Access Code:</strong>{" "}
                        {quiz.accessCode || "None"}
                    </p>
                    <p>
                        <strong>One Question at a Time:</strong>{" "}
                        {quiz.oneQuestionAtATime ? "Yes" : "No"}
                    </p>
                    <p>
                        <strong>Webcam Required:</strong>{" "}
                        {quiz.webcamRequired ? "Yes" : "No"}
                    </p>
                    <p>
                        <strong>Lock Questions After Answering:</strong>{" "}
                        {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <p>
                        <strong>Due Date:</strong>{" "}
                        {quiz.dueDate
                            ? new Date(quiz.dueDate).toLocaleDateString()
                            : "None"}
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        <strong>Available Date:</strong>{" "}
                        {quiz.availableDate
                            ? new Date(quiz.availableDate).toLocaleDateString()
                            : "None"}
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        <strong>Until Date:</strong>{" "}
                        {quiz.untilDate
                            ? new Date(quiz.untilDate).toLocaleDateString()
                            : "None"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuizDetails;
