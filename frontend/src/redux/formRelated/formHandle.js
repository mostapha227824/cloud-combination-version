import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    acceptFormSuccess,
    declineFormSuccess
} from './formSlice';

export const getAllForms = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
            console.log("If Block:", result.data.message);
        } else {
            dispatch(getSuccess(result.data));
            console.log("Else Block", result.data);
        }
    } catch (error) {
        console.error("CATCH getAllForms error:", error);
        dispatch(getError(error));
    }
}

export const acceptForm = (formId) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/formAccept/${formId}`);
        dispatch(acceptFormSuccess(result.data));
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const declineForm = (formId) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/formDecline/${formId}`);
        dispatch(declineFormSuccess(result.data));
    } catch (error) {
        dispatch(getError(error.message));
    }
};