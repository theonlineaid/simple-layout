import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define tab name type
interface TabName {
    id: string;
    name: string;
}

// Define state type
type TabNameState = TabName[];

// Initial state
const initialState: TabNameState = [];

const addTabNameSlice = createSlice({
    name: 'addTabName',
    initialState,
    reducers: {
        addTabName: (state, action: PayloadAction<string>) => {
            const newTab = {
                id: crypto.randomUUID(), // Generate unique ID
                name: action.payload
            };
            state.push(newTab);
        },
        removeTabName: (state, action: PayloadAction<string>) => {
            return state.filter(tab => tab.id !== action.payload);
        },
        clearAllTabNames: () => {
            return [];
        }
    }
});

// Export actions and reducer
export const { addTabName, removeTabName, clearAllTabNames } = addTabNameSlice.actions;
export default addTabNameSlice.reducer;
