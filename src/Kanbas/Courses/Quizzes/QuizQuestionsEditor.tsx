// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as client from "./client";
import { KanbasState } from "../../store";
import { addQuestion, updateQuestion, deleteQuestion } from "./reducer";
import { Question } from "./client";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const QuizQuestionsEditor = () => {
    const { quizId } = useParams();
    const dispatch = useDispatch();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const [questions, setQuestions] = useState([]);
    const [quizLive, setQuizLive] = useState(quiz);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [recentlySaved, setRecentlySaved] = useState(false);

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

    const handleNewQuestion = () => {
        const newQuestion: Question = {
            quizId: quizId,
            questionType: "multiple-choice",
            title: "",
            points: 0,
            question: "",
            choices: [],
            correctAnswer: "",
        };
        dispatch(addQuestion(newQuestion));

        setQuestions([...questions, newQuestion]);
        setEditingQuestion(newQuestion);
    };

    const handleEditQuestion = (question: any) => {
        setEditingQuestion(question);
    };

    const handleCancelEdit = () => {
        setEditingQuestion(null);
    };

    const handleUpdateQuestion = (updatedQuestion: any) => {
        dispatch(updateQuestion(updatedQuestion));
        const updatedQuestions = questions.map((q) =>
            q._id === updatedQuestion._id ? updatedQuestion : q
        );
        setQuestions(updatedQuestions);
        setEditingQuestion(null);
    };

    const handleCreateQuestion = (updatedQuestion: any) => {
        dispatch(updateQuestion(updatedQuestion));
        const updatedQuestions = questions.map((q) =>
            q._id === updatedQuestion._id ? updatedQuestion : q
        );
        setQuestions(updatedQuestions);
        setEditingQuestion(null);
        if (updatedQuestion._id) {
            client.updateQuestion(updatedQuestion);
        } else {
            client.createQuestion(updatedQuestion);
        }
    };

    const handleDeleteQuestion = (question: Question) => {
        dispatch(deleteQuestion(question._id));
        const updatedQuestions = questions.filter(
            (q) => q._id !== question._id
        );
        setQuestions(updatedQuestions);
        client.deleteQuestion(question);
    };

    const handleSaveAndPublish = () => {
        console.log(quizLive);
        const updatedQuiz = {
            ...quizLive,
            questions,
            published: true,
            _id: quizId,
        };
        client.updateQuiz(updatedQuiz);
        setRecentlySaved(true);
        setTimeout(() => {
            setRecentlySaved(false);
        }, 2000);
    };

    return (
        <div className="">
            <h2 className="mb-4 title">Quiz Questions Editor</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-primary my-2"
                        onClick={handleNewQuestion}
                    >
                        + New Question
                    </button>
                </li>
                <li className="list-group-item">
                    {questions.length === 0 && (
                        <div className="alert alert-info mt-3">
                            No questions yet. Add some using the button above.
                        </div>
                    )}
                    {questions.map((question) => (
                        <div key={question._id} className="card my-4">
                            <div className="card-body">
                                {editingQuestion &&
                                editingQuestion._id === question._id ? (
                                    <QuestionEditor
                                        question={editingQuestion}
                                        onSave={handleCreateQuestion}
                                        onCancel={handleCancelEdit}
                                    />
                                ) : (
                                    <QuestionPreview
                                        question={question}
                                        onEdit={handleEditQuestion}
                                        onDelete={handleDeleteQuestion}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </li>
                <li className="list-group-item">
                    <div className="my-2 float-end">
                        {recentlySaved && (
                            <span className="ms-3 text-success mr-2">
                                Quiz saved.
                            </span>
                        )}
                        <button
                            className="btn btn-primary me-2 "
                            onClick={handleSaveAndPublish}
                        >
                            Save & Publish
                        </button>
                        <button className="btn btn-outline-secondary">
                            Cancel
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

const QuestionEditor = ({ question, onSave, onCancel }) => {
    const [questionType, setQuestionType] = useState(question.questionType);
    const [title, setTitle] = useState(question.title);
    const [points, setPoints] = useState(question.points);
    const [questionText, setQuestionText] = useState(question.question);
    const [choices, setChoices] = useState(question.choices || []);
    const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);
    const [blanks, setBlanks] = useState(question.blanks || []);

    const handleSave = () => {
        const updatedQuestion = {
            ...question,
            questionType,
            title,
            points,
            question: questionText,
            choices,
            correctAnswer,
            blanks,
        };
        onSave(updatedQuestion);
    };

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="questionType" className="form-label">
                    Question Type
                </label>
                <select
                    id="questionType"
                    className="form-select"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="fill-in-blanks">Fill in Blanks</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="points" className="form-label">
                    Points
                </label>
                <input
                    type="number"
                    id="points"
                    className="form-control"
                    value={points}
                    onChange={(e) => setPoints(parseInt(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="question" className="form-label">
                    Question
                </label>
                <textarea
                    id="question"
                    className="form-control"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                ></textarea>
            </div>
            {questionType === "multiple-choice" && (
                <MultipleChoiceEditor
                    choices={choices}
                    correctAnswer={correctAnswer}
                    onChoicesChange={setChoices}
                    onCorrectAnswerChange={setCorrectAnswer}
                />
            )}
            {questionType === "true-false" && (
                <TrueFalseEditor
                    correctAnswer={correctAnswer}
                    onCorrectAnswerChange={setCorrectAnswer}
                />
            )}
            {questionType === "fill-in-blanks" && (
                <FillInBlanksEditor
                    blanks={blanks}
                    onBlanksChange={setBlanks}
                />
            )}
            <button className="btn mt-2 btn-primary me-2" onClick={handleSave}>
                Save Question
            </button>
            <button
                className="btn mt-2 btn-outline-secondary"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    );
};

const QuestionPreview = ({ question, onEdit, onDelete }) => {
    return (
        <div>
            <h4>{question.title}</h4>
            <p>Question Type: {question.questionType}</p>
            <p>Points: {question.points}</p>
            <p>Question: {question.question}</p>
            <button
                className="btn btn-primary me-2"
                onClick={() => onEdit(question)}
            >
                Edit
            </button>
            <button
                className="btn btn-danger"
                onClick={() => onDelete(question)}
            >
                Delete
            </button>
        </div>
    );
};

const MultipleChoiceEditor = ({
    choices,
    correctAnswer,
    onChoicesChange,
    onCorrectAnswerChange,
}) => {
    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        onChoicesChange(updatedChoices);
    };

    const handleAddChoice = () => {
        onChoicesChange([...choices, ""]);
    };

    const handleRemoveChoice = (index) => {
        const updatedChoices = choices.filter((_, i) => i !== index);
        onChoicesChange(updatedChoices);
    };

    return (
        <div className="flex flex-column">
            <label className="form-label">Choices</label>
            {choices.map((choice, index) => (
                <div key={index} className="mb-2">
                    <div className="input-group">
                        <div className="input-group-text">
                            <input
                                type="radio"
                                checked={correctAnswer === index}
                                onChange={() => onCorrectAnswerChange(index)}
                            />
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            value={choice}
                            onChange={(e) =>
                                handleChoiceChange(index, e.target.value)
                            }
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleRemoveChoice(index)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <button
                className="btn btn-outline-secondary"
                onClick={handleAddChoice}
            >
                Add Choice
            </button>
        </div>
    );
};

const TrueFalseEditor = ({ correctAnswer, onCorrectAnswerChange }) => {
    return (
        <div>
            <label className="form-label">Correct Answer</label>
            <div className="form-check">
                <input
                    type="radio"
                    id="true"
                    className="form-check-input"
                    checked={correctAnswer === true}
                    onChange={() => onCorrectAnswerChange(true)}
                />
                <label htmlFor="true" className="form-check-label">
                    True
                </label>
            </div>
            <div className="form-check">
                <input
                    type="radio"
                    id="false"
                    className="form-check-input"
                    checked={correctAnswer === false}
                    onChange={() => onCorrectAnswerChange(false)}
                />
                <label htmlFor="false" className="form-check-label">
                    False
                </label>
            </div>
        </div>
    );
};

const FillInBlanksEditor = ({ blanks, onBlanksChange }) => {
    const handleBlankChange = (index, value) => {
        const updatedBlanks = [...blanks];
        updatedBlanks[index] = value;
        onBlanksChange(updatedBlanks);
    };

    const handleAddBlank = () => {
        onBlanksChange([...blanks, ""]);
    };

    const handleRemoveBlank = (index) => {
        const updatedBlanks = blanks.filter((_, i) => i !== index);
        onBlanksChange(updatedBlanks);
    };

    return (
        <div>
            <label className="form-label">Blanks</label>
            {blanks.map((blank, index) => (
                <div key={index} className="mb-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={blank}
                            onChange={(e) =>
                                handleBlankChange(index, e.target.value)
                            }
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleRemoveBlank(index)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <button
                className="btn btn-outline-secondary"
                onClick={handleAddBlank}
            >
                Add Blank
            </button>
        </div>
    );
};

export default QuizQuestionsEditor;
