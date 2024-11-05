const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Quiz', ExamSchema);
