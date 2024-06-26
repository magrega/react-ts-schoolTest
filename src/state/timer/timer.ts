import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface timerState {
    timeLeft: number;
    isTimeOut: boolean;

}
const desiredTime = 15 * 60;

const initialState: timerState = {
    timeLeft: JSON.parse(localStorage.getItem('timer')!) || desiredTime,
    isTimeOut: false,
}

const timerSlice = createSlice({
    name: 'questionCard',
    initialState,
    reducers: {
        countdown: (state) => {
            state.timeLeft = state.timeLeft - 1;
        },
        setIsTimeout: (state, action: PayloadAction<boolean>) => {
            state.isTimeOut = action.payload;
        }
    },
});

export const { countdown } = timerSlice.actions;
export default timerSlice.reducer;