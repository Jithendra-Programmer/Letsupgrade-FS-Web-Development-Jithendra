const express = require('express');
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/movies')
    .then(() => console.log('connected to mongoDB'))
    .catch((err) => console.log(err));

const movieSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        releaseDate: { type: Date, required: true },
        genre: { type: String, required: true },
        boxOffice: { type: Number, required: true },
        rating: { type: Number, required: true },
        director: { type: String, required: true },
        poster: { type: String, required: true },
        productionStudio: { type: String, required: true },
    },
    { timestamps: true }
);

const moviesModel = new mongoose.model('movies', movieSchema);

const actorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        profile: { type: String, required: true },
    },
    { timestamps: true }
);

const actorsModel = new mongoose.model('actors', actorSchema);

const movieActorSchema = new mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'movies' },
    actor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'actors' },
});

const movieActorModel = new mongoose.model('moives_actors', movieActorSchema);

const app = express();

app.use(express.json());

app.post('/movies', (req, res) => {
    let movieData = req.body;

    let moviesObject = new moviesModel(movieData);

    moviesObject
        .save()
        .then(() => res.send({ massage: 'Movie Created' }))
        .catch(() => {
            res.send({ massage: 'Something went wrong' });
        });
});

app.post('/movieActors', (req, res) => {
    let movieActorData = req.body;

    let movieActorsObject = new movieActorModel(movieActorData);

    movieActorsObject
        .save()
        .then(() => {
            res.send({ massage: 'Collection between actor and movie' });
        })
        .catch((err) => {
            console.log(err);
            res.send({ massage: 'something went wrong' });
        });
});

app.get('/moviesActors', (req, res) => {
    movieActorModel
        .find()
        .populate('movie_id')
        .populate('actor_id')
        .then((movies) => {
            res.send(movies);
        })
        .catch((err) => {
            console.log(err);
            res.send({ massage: 'Something went wrong' });
        });
});

app.get('/movies', (req, res) => {
    moviesModel
        .find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.send({ massage: 'Something went wrong' });
        });
});

app.get('/movies/:id', (req, res) => {
    let _id = req.params.id;
    moviesModel
        .findOne({ _id })
        .then((movie) => {
            res.send(JSON.stringify(movie));
        })
        .catch((err) => {
            console.log(err);
            res.send(
                JSON.stringify({
                    massage: 'Something went wrong',
                })
            );
        });
});

app.delete('/movie/:id', (req, res) => {
    let _id = req.params.id;
    moviesModel
        .deleteOne({ _id })
        .then(() => {
            res.send(
                JSON.stringify({
                    massage: 'Movie deleted',
                })
            );
        })
        .catch((err) => {
            console.log(err);
            res.send(
                JSON.stringify({
                    massage: 'Something went wrong',
                })
            );
        });
});

app.put('/movie/:id', (req, res) => {
    let _id = req.params.id;
    let updatedMovieData = req.body;

    moviesModel
        .updateOne({ _id }, updatedMovieData)
        .then(() => {
            res.send({ massage: 'Movie updated' });
        })
        .catch((err) => {
            console.log(err);
            res.send({ massage: 'Something went wrong' });
        });
});

app.post('/actor', (req, res) => {
    let actorData = req.body;

    let actorsObject = new actorsModel(actorData);

    actorsObject
        .save()
        .then(() => {
            res.send(
                JSON.stringify({
                    massage: 'Actor Created',
                })
            );
        })
        .catch((err) => {
            console.log(err);
            res.send(
                JSON.stringify({
                    massage: 'Something went wrong',
                })
            );
        });
});

app.listen(8000, () => console.log('Server is running at port number 8000'));
