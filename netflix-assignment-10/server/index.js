const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');

const userModel = require('./models/userModel');
const videoModel = require('./models/videoModel');
const userVideoModel = require('./models/userVideoModel');
const verifyToken = require('./verifyToken');

mongoose
    .connect('mongodb://localhost:27017/netflix')
    .then(() => console.log('mongodb connected!!!'))
    .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.post('/createUser', async (req, res) => {
    let userData = req.body;

    console.log(userData);

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(userData.password, salt);

    userData.password = hashedpassword;

    const users = await new userModel(userData);

    users
        .save()
        .then(() => {
            res.status(201).send({ massage: 'User created!!!', success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                massage: 'Unable to create user',
                success: false,
            });
        });
});

app.post('/loginUser', async (req, res) => {
    let userCred = req.body;

    const user = await userModel.findOne({ username: userCred.username });

    if (user == null) {
        res.status(403).send({
            massage: 'Unable to find user',
            success: false,
        });
    } else {
        const passwordStatus = await bcrypt.compare(
            userCred.password,
            user.password,
        );

        if (passwordStatus) {
            const token = await jwt.sign(userCred, 'random369');

            res.send({
                user,
                token,
                massage: 'Welcome User!',
                success: true,
            });
        } else if (!passwordStatus) {
            res.status(401).send({
                massage: 'incorrect password',
                success: false,
            });
        }
    }
});

app.get('/videos', verifyToken, async (req, res) => {
    const videos = await videoModel.find();
    res.send(videos);
});

app.get('/videos/:videoid/:userid', verifyToken, async (req, res) => {
    let videoid = req.params.videoid;
    let userid = req.params.userid;

    let status = await userVideoModel.findOne({ userid, videoid });

    if (status === null) {
        const userVideo = new userVideoModel({ userid, videoid });
        userVideo
            .save()
            .then(async () => {
                const video = await videoModel.findOne({ _id: videoid });
                res.send(video);
            })
            .catch((err) => {
                console.log(err);
                res.send({ massage: 'Unable to fetch video!' });
            });
    } else {
        const video = await videoModel.findOne({ _id: videoid });

        let videoData = { ...video }._doc;
        videoData.currentTime = status.currentTime;

        console.log(videoData);

        res.send(videoData);
    }
});

app.put('/trackTime/:userid/:videoid', (req, res) => {
    let userid = req.params.userid;
    let videoid = req.params.videoid;

    let data = req.body;

    userVideoModel
        .updateOne({ userid, videoid }, data)
        .then(() => res.send({ massage: 'Timing updates', success: true }))
        .catch((err) => {
            console.log(err);
            res.send({ massage: 'Something went worng!', success: false });
        });
});

app.get('/stream/:fileanme', async (req, res) => {
    const range = req.headers.range;

    if (!range) {
        res.status(400).send({ massage: 'Invalid Range header!' });
    }

    let filepath = `./videos/${req.params.fileanme}`;

    const videoSize = fs.statSync(filepath).size;
    console.log(range);

    const start = Number(range.replace(/\D/g, ''));

    const end = Number(Math.min(start + 10 ** 6, videoSize - 1));
    const contentLength = end - start;

    let headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(filepath, { start, end });

    videoStream.pipe(res);
});

app.post('/uploadVideo', async (req, res) => {
    let body = req.body;
    const videos = await new videoModel(body);
    videos
        .save()
        .then(() => res.send({ massage: 'Vide uploaded' }))
        .catch((err) => {
            console.log(err);
            res.send('Something went wrong');
        });
});

app.listen(8000, () => console.log('Server is running at port number 8000'));
