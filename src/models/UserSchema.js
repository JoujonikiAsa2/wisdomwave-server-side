const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    profilePicture: String,
    biography: String,
    facebook:String,
    twiter:String,
    linkedin: String,
    userType: String,
    phoneNumber: String,
    verified: Boolean,
    location: String,
    age: String,
    date: String
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;