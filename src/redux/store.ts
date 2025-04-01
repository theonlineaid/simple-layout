import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // Local storage for persistence
import { persistReducer, persistStore } from 'redux-persist';
import addToTabReducer from './slice/addToTab';
import addTabNameReducer from './slice/addTabName';
import activeTabReducer from './slice/activeTab';
import marketDepthReducer from './slice/marketDepth'


// Define persist configurations for both slices
const persistConfig = {
    key: 'root',
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    addTabName: addTabNameReducer,
    addToTab: addToTabReducer,
    activeTab: activeTabReducer,
    marketDepth: marketDepthReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for Redux Persist
        }),
});

// Define types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create persistor
export const persistor = persistStore(store);

export default store;
