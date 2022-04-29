const { TextDecoder, TextEncoder } = require('util');

const http = require('http');
const url = require('url');
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/first-node-js-project')
    .then((res) => console.log('Connected to mongoDB'))
    .catch((err) => console.log(err));

const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    power: String,
});

const pokemonModel = new mongoose.model('pokemons', pokemonSchema);

http.createServer((req, res) => {
    const path = url.parse(req.url, true);

    if (path.pathname === '/pokemon' && req.method === 'POST') {
        let data = '';

        req.on('data', (chunk) => (data += chunk));

        req.on('end', () => {
            let pokemon = JSON.parse(data);

            let pokemonsObject = new pokemonModel(pokemon);

            pokemonsObject
                .save()
                .then(() => {
                    res.write(
                        JSON.stringify({
                            message: ' Created Pokemon successful!',
                        }),
                    );
                    res.end();
                })
                .catch((err) => {
                    console.log(err);
                    res.write(
                        JSON.stringify({ message: 'Something went wrong' }),
                    );
                    res.end();
                });
        });
    } else if (path.pathname === '/pokemon' && req.method === 'PUT') {
        let id = path.query.id;
        let data = '';

        req.on('data', (chunk) => (data += chunk));
        req.on('end', () => {
            let pokemon = JSON.parse(data);

            pokemonModel
                .updateOne({ _id: id }, pokemon)
                .then(() => {
                    res.write(
                        JSON.stringify({
                            message: 'Pokemon Updated successful!!!',
                        }),
                    );
                    res.end();
                })
                .catch((err) => {
                    console.log(err);
                    res.write(
                        JSON.stringify({
                            message: 'something went wrong',
                        }),
                    );
                });
        });
    } else if ((path.pathname === '/pokemon', req.method === 'GET')) {
        let id = path.query.id;

        if (id) {
            pokemonModel
                .findOne({ _id: id })
                .then((data) => {
                    res.write(JSON.stringify(data));
                    res.end();
                })
                .catch((err) => {
                    console.log(err);
                    res.write(
                        JSON.stringify({ message: "Can't find pokemon" }),
                    );
                    res.end();
                });
        } else {
            pokemonModel
                .find()
                .then((data) => {
                    res.write(JSON.stringify(data));
                    res.end();
                })
                .catch((err) => {
                    console.log(err);
                    res.write(
                        JSON.stringify({
                            message: "Can't find pokemon!!!",
                        }),
                    );
                });
        }
    } else if (path.pathname === '/pokemon' && req.method === 'DELETE') {
        let id = path.query.id;

        pokemonModel
            .deleteOne({ _id: id })
            .then(() => {
                res.write(
                    JSON.stringify({
                        message: 'Pokemon Deleted successful!!!',
                    }),
                );
                res.end();
            })
            .catch((err) => {
                console.log(err);
                res.write(JSON.stringify({ message: 'something went wrong' }));
                res.end();
            });
    }
}).listen(3333);
