import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";

export interface KanbasState {
  quizzesReducer: {
      quizzes: any[];
      quiz: any;
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
  },
});

export default store;