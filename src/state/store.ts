import { configureStore, isAnyOf } from "@reduxjs/toolkit";
import { listenerMiddleware, startAppListening } from "./listenerMiddleware";
import questionCardReducer, { countdown, setAllUserAnswers, setNextQuestion } from "./questionCard/questionCard";

startAppListening({
    matcher: isAnyOf(countdown, setNextQuestion, setAllUserAnswers),
    effect: ({ type }, { getState }) => {
        if (type === 'questionCard/countdown') localStorage.setItem('timer', JSON.stringify(getState().questionCard.timer));
        if (type === 'questionCard/setQuestionNum') localStorage.setItem('questionNum', JSON.stringify(getState().questionCard.questionNum));
        if (type === 'questionCard/setAnswersBatchNum') localStorage.setItem('answersBatchNum', JSON.stringify(getState().questionCard.answersBatchNum));
        if (type === 'questionCard/setAllUserAnswers') localStorage.setItem('allUserAnswers', JSON.stringify(getState().questionCard.allUserAnswers));
    }
});

export const store = configureStore({
    reducer: {
        questionCard: questionCardReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;