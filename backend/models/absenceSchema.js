const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true,
        enum: ['Medical', 'Mental Health Issues', 'Academic Conflict', 'Family Emergencies']
    },
    form: {
        type: String,
        required: true
    },
    images: [{
        type: String,  
        required: false
    }],

    status: {
        type: String,
        default: 'pending', 
        required: true
    },

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    }

});

module.exports = mongoose.model("form", formSchema);
