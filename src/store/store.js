import { configureStore } from '@reduxjs/toolkit';
import { authSlice, calendarSlice, uiSlice } from './';


export const store = configureStore({
    middleware: getDefaultMiddelware =>
        getDefaultMiddelware ({
            serializableCheck: false
        }),
    reducer: {
        auth:       authSlice.reducer,
        ui:         uiSlice.reducer,
        calendar:   calendarSlice.reducer
    },
})