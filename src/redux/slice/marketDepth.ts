import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isReversed: false,
};

const marketDepthSlice = createSlice({
    name: "marketDepth",
    initialState,
    reducers: {
        toggleReversed: (state) => {
            state.isReversed = !state.isReversed;
        },
    },
});

export const { toggleReversed } = marketDepthSlice.actions;
export default marketDepthSlice.reducer;
