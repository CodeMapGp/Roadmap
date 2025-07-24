
// enrolledTracksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface completedTaskState {
  [userId: string]: string[]; // userId → list of enrolled completed task
}

const initialState: completedTaskState = {};

const completedTasksSlice = createSlice({
  name: "completedTasks",
  initialState,
  reducers: {
  addcompletedTasks: (
    state,
    action: PayloadAction<{ userId: string; taskId: string }>
    ) => {
    const { userId, taskId } = action.payload;
    if (!state[userId]) {
        state[userId] = [];
    }
    if (!state[userId].includes(taskId)) {
        state[userId].push(taskId);
    }
  },
},

});

export const { addcompletedTasks } = completedTasksSlice.actions;
export default completedTasksSlice.reducer;
