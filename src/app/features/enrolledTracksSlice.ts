// enrolledTracksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EnrolledTracksState {
  [userId: string]: string[]; // userId → list of enrolled track IDs
}

const initialState: EnrolledTracksState = {};

const enrolledTracksSlice = createSlice({
  name: "enrolledTracks",
  initialState,
  reducers: {
  addEnrolledTrack: (
    state,
    action: PayloadAction<{ userId: string; trackId: string }>
    ) => {
    const { userId, trackId } = action.payload;
    if (!state[userId]) {
        state[userId] = [];
    }
    if (!state[userId].includes(trackId)) {
        state[userId].push(trackId);
    }
  },
},

});

export const { addEnrolledTrack } = enrolledTracksSlice.actions;
export default enrolledTracksSlice.reducer;
