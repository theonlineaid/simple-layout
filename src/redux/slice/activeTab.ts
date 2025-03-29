import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveTabState {
    id: string | null;
}

const initialState: ActiveTabState = {
    id: null, // No tab is active initially
};

const activeTabSlice = createSlice({
    name: "activeTab",
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.id = action.payload; // Set the active tab ID
        },
        clearActiveTab: (state) => {
            state.id = null; // Clear the active tab
        },
    },
});

export const { setActiveTab, clearActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;
