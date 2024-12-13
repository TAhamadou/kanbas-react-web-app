// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as client from "./client";
import { KanbasState } from "../../store";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const QuizPreview = () => {
    const { quizId } = useParams();
    const dispatch = useDispatch();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const [questions, setQuestions] = useState([]);
    const [quizLive, setQuizLive] = useState<any>(quiz);

    const COURSES_API = `${API_BASE}/api/quizzes`;
    const findQuizById = async (quizId?: string) => {
        const response = await axios.get(`${COURSES_API}/${quizId}`);
        setQuizLive(response.data);
    };

    useEffect(() => {
        client.findQuestionsForQuiz(quizId).then((questions) => {
            setQuestions(questions);
            findQuizById(quizId);
        });
    }, [quizId]);

    return (
        <div className="">
            <h2 className="mb-4 title">Quiz Preview</h2>
            <h3>{quizLive.name || "Quiz Name"}</h3>
            <p>{quizLive.description || "Description"}</p>
            <hr />
            <ul className="list-group">
                {questions.length === 0 && (
                    <div className="alert alert-info">
                        No questions yet. Return to the Quiz Edit page to add
                        questions.
                    </div>
                )}

                {questions.map((question, index) => (
                    <li className="list-group-item card" key={question._id}>
                        <div key={question._id} className="mb-4 card-body">
                            <h4>{`Question ${index + 1}: ${
                                question.title
                            }`}</h4>
                            <p>{question.question}</p>
                            {question.questionType === "multiple-choice" && (
                                <div>
                                    {question.choices.map(
                                        (choice, choiceIndex) => (
                                            <div
                                                key={choiceIndex}
                                                className="form-check"
                                            >
                                                <input
                                                    type="radio"
                                                    id={`choice-${choiceIndex}`}
                                                    className="form-check-input"
                                                    name={`question-${index}`}
                                                    value={choiceIndex}
                                                />
                                                <label
                                                    htmlFor={`choice-${choiceIndex}`}
                                                    className="form-check-label"
                                                >
                                                    {choice}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                            {question.questionType === "true-false" && (
                                <div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id={`true-${index}`}
                                            className="form-check-input"
                                            name={`question-${index}`}
                                            value="true"
                                        />
                                        <label
                                            htmlFor={`true-${index}`}
                                            className="form-check-label"
                                        >
                                            True
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id={`false-${index}`}
                                            className="form-check-input"
                                            name={`question-${index}`}
                                            value="false"
                                        />
                                        <label
                                            htmlFor={`false-${index}`}
                                            className="form-check-label"
                                        >
                                            False
                                        </label>
                                    </div>
                                </div>
                            )}
                            {question.questionType === "fill-in-blanks" && (
                                <div>
                                    {question.blanks.map(
                                        (blank, blankIndex) => (
                                            <div
                                                key={blankIndex}
                                                className="mb-2"
                                            >
                                                <label
                                                    htmlFor={`blank-${blankIndex}`}
                                                    className="form-label"
                                                >
                                                    {`Blank ${blankIndex + 1}`}
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`blank-${blankIndex}`}
                                                    className="form-control"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizPreview;
