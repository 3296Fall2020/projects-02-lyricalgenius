const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    phonenumber: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    favoritesongs: {
        type: Array,
        default: []
    },
    token: {
        type: String,
        default: ''
    }
});

UserSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model("User", UserSchema);