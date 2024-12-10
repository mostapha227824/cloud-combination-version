import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { formReducer } from './formRelated/formSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        form: formReducer,
        sclass: sclassReducer
    },
});

export default store;
