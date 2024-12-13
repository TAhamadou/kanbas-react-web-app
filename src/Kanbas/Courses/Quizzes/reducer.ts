// @ts-nocheck

import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
    quizzes: [],
    quiz: {
        _id: "",
        name: "",
        description: "",
        course: "",
        availableDate: "",
        availableUntilDate: "",
        dueDate: "",
        points: 0,
        published: false,
        questions: [],
    },
    questions: [],
};

const modulesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes.push(action.payload);
        },
        updateQuiz: (state, action) => {
            const index = state.quizzes.findIndex(
                (quiz) => quiz._id === action.payload._id
            );
            if (index !== -1) {
                state.quizzes[index] = action.payload;
            }
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz._id !== action.payload
            );
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions.push(action.payload);
        },
        updateQuestion: (state, action) => {
            const index = state.questions.findIndex(
                (question) => question._id === action.payload._id
            );
            if (index !== -1) {
                state.questions[index] = action.payload;
            }
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (question) => question._id !== action.payload
            );
        },
    },
});

export const {
    setQuizzes,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    setQuiz,
    setQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
} = modulesSlice.actions;
export default modulesSlice.reducer;
