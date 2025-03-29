import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Olympic Data type
interface IOlympicData {
    athlete: string;
    age: number;
    country: string;
    year: number;
    date: string;
    sport: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
}

// Define TabItem type with a generated id
interface TabItem extends IOlympicData {
    id: string;
}

// Define initial state type
type TabState = TabItem[];

const initialState: TabState = [];

const addToTabSlice = createSlice({
    name: 'addToTab',
    initialState,
    reducers: {
        addToTab: (state, action: PayloadAction<IOlympicData>) => {
            const id = `${action.payload.athlete}-${action.payload.year}`; // Create unique ID
            const exists = state.some(item => item.id === id);
            if (!exists) {
                state.push({ ...action.payload, id });
            }
        },
        removeFromTab: (state, action: PayloadAction<string>) => {
            return state.filter(item => item.id !== action.payload);
        },
        clearTab: () => {
            return [];
        }
    }
});

// Export actions and reducer
export const { addToTab, removeFromTab, clearTab } = addToTabSlice.actions;
export default addToTabSlice.reducer;
