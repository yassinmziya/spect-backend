const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

const Lesson = mongoose.model('lesson', LessonSchema);

module.exports = Lesson;