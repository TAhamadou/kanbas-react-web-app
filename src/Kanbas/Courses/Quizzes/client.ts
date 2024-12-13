import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export interface Question {
    _id: string;
    quizId: string;
    questionType: string;
    title: string;
    points: number;
    question: string;
    choices: string[];
    correctAnswer: number | boolean;
    blanks: string[];
}

interface Quiz {
    _id: string;
    name: string;
    description: string;
    course: string;
    availableDate: string;
    availableUntilDate: string;
    dueDate: string;
    points: number;
    published: boolean;
    questions: any[];
}

export const deleteQuiz = async (quizId: any) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

export const findQuestionsForQuiz = async (
    quizId: any
): Promise<Question[]> => {
    const response = await axios.get(
        `${API_BASE}/api/quizzes/${quizId}/questions`
    );
    return response.data;
};

export const createQuestion = async (question: Question): Promise<Question> => {
    const response = await axios.post(
        `${API_BASE}/api/quizzes/${question.quizId}/questions`,
        question
    );
    return response.data;
};

export const updateQuestion = async (question: Question): Promise<Question> => {
    const response = await axios.put(
        `${API_BASE}/api/quizzes/${question.quizId}/questions/${question._id}`,
        question
    );
    return response.data;
};

export const deleteQuestion = async (question: Question): Promise<boolean> => {
    const response = await axios.delete(
        `${API_BASE}/api/quizzes/${question.quizId}/questions/${question._id}`
    );
    return response.status === 200;
};
