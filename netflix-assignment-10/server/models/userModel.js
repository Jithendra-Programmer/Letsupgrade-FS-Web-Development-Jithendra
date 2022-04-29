const mongoose = require('mongoose');

const userShema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        mail: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
);

const userModel = new mongoose.model('users', userShema);

module.exports = userModel;
