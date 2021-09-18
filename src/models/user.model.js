const mongoose = require('mongoose');
const { compareSync,hashSync, genSaltSync } = require('bcryptjs');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.toJson = function() {
    let user = this.toObject();
    delete user.password;
    
    return user;
};

UserSchema.methods.comparePasswords = function(password) {
    return compareSync(password, this.password);
};

UserSchema.pre('save', async function(next) {
    const user = this;

    // Si no se esta modificando el usuario next
    if (!user.isModify('password')) {
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;

    next();
});

module.exports = model('user', UserSchema);
