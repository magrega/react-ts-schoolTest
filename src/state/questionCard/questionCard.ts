import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTestData } from "../../services/fakeapi";

export interface QuestionCardState {
    isLoading: boolean;
    isError: boolean;
    isTimeOut: boolean;
    questions: string[];
    answers: string[];
    questionNum: number;
    answersBatchNum: number;
    userAnswer: {};
    allUserAnswers: {};
    timer: number;
    currentAnswers: string[];
}
const desiredTime = 15 * 60;

const lSquestionNum = JSON.parse(localStorage.getItem('questionNum')!);
const lSanswersBatchNum = JSON.parse(localStorage.getItem('answersBatchNum')!);
const lSallUserAnswers = JSON.parse(localStorage.getItem('allUserAnswers')!);

const initialState: QuestionCardState = {
    isLoading: true,
    isTimeOut: false,
    isError: false,
    questions: [],
    answers: [],
    questionNum: lSquestionNum || 0,
    answersBatchNum: lSanswersBatchNum || 0,
    userAnswer: {},
    allUserAnswers: lSallUserAnswers || {},
    timer: JSON.parse(localStorage.getItem('timer')!) || desiredTime,
    currentAnswers: []
}

const questionCardSlice = createSlice({
    name: 'questionCard',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setIsTimeout: (state, action: PayloadAction<boolean>) => {
            state.isTimeOut = action.payload;
        },
        setQuestions: (state, action: PayloadAction<string[]>) => {
            state.questions = action.payload;
        },
        setAnswers: (state, action: PayloadAction<string[]>) => {
            state.answers = action.payload;
        },
        setUserAnswer: (state, action: PayloadAction<{}>) => {
            state.userAnswer = action.payload;
        },
        setAllUserAnswers: (state, action: PayloadAction<{}>) => {
            state.allUserAnswers = { ...state.allUserAnswers, ...action.payload };
        },
        countdown: state => {
            state.timer = state.timer - 1;
        },
        setNextQuestion: (state) => {
            state.questionNum++;
            state.answersBatchNum = state.answersBatchNum + 4;
            state.allUserAnswers = { ...state.allUserAnswers, ...state.userAnswer };
            state.currentAnswers = state.answers.slice(state.answersBatchNum, state.answersBatchNum + 4);
        },
        resetCard: () => {
            return { ...initialState, questionNum: 0, answersBatchNum: 0, allUserAnswers: {}, timer: desiredTime }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<string[][]>) => {
                state.questions = action.payload[0];
                state.answers = action.payload[1];
                state.currentAnswers = state.answers.slice(state.answersBatchNum, state.answersBatchNum + 4);
                state.isLoading = false;
            })
            .addCase(
                fetchData.rejected, (state) => {
                    state.isError = true;
                })
    }
});

export const fetchData = createAsyncThunk(
    "questionCard/fetchData",
    async () => getTestData()
)

export const { setIsLoading, setIsTimeout, setQuestions, setAnswers, setUserAnswer, setAllUserAnswers, countdown, setNextQuestion, resetCard } = questionCardSlice.actions;
export default questionCardSlice.reducer;