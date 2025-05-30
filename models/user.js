const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // passport-local-mongoose will automatically add username and password fields
});

// This adds authenticate() and other passport-local-mongoose methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);