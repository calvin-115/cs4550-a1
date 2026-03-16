import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import modulesReducer from "./courses/[courseId]/modules/reducer";
import accountReducer from "./account/reducer";
import assignmentsReducer from "./courses/[courseId]/assignments/reducer";
import enrollmentsReducer from "./enrollments/reducer";

const store = configureStore({
    reducer: {
        coursesReducer,
        modulesReducer,
        accountReducer,
        assignmentsReducer,
        enrollmentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;