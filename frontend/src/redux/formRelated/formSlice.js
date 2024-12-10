import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formsList: [],
    loading: false,
    error: null,
    response: null,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.formsList = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        acceptFormSuccess: (state, action) => {
            state.loading = false;
            state.response = action.payload.message;
            state.formsList = state.formsList.map(form =>
                form._id === action.payload.data._id ? action.payload.data : form
            );
        },
        declineFormSuccess: (state, action) => {
            state.loading = false;
            state.response = action.payload.message;
            state.formsList = state.formsList.map(form =>
                form._id === action.payload.data._id ? action.payload.data : form
            );
        },
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    acceptFormSuccess,
    declineFormSuccess
} = formSlice.actions;

export const formReducer = formSlice.reducer;
