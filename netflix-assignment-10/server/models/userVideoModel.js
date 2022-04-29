const mongoose = require('mongoose');

const userVideoSchema = new mongoose.Schema(
    {
        userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        videoid: { type: mongoose.Schema.Types.ObjectId, ref: 'videos' },
        currentTime: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ['playing', 'finished'],
            default: 'playing',
        },
    },
    { timestamps: true },
);

const userVideoModel = new mongoose.model('user-videos', userVideoSchema);

module.exports = userVideoModel;
