const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required']
    },
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    dateOfBirth: {
        type: Date,
    }
});

const User =  mongoose.model('user', UserSchema);

module.exports = User;
