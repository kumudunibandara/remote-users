import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { layoutSlice } from "hostApp/UserTheme"; // ✅ Import from host

const Store = configureStore({
    reducer: combineReducers({
        layout: layoutSlice.reducer, // ✅ Add host reducer
    }),
});

export { Store };
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
