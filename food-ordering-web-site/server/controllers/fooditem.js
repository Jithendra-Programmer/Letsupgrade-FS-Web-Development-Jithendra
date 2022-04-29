// importing packages
const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

// importing middlewares
const verifyToken = require('../middlewares/verifyToken');
const isRestaurant = require('../middlewares/isRestaurant');
const isRestaurantFoodItem =
    require('../middlewares/isRestaurantFood').isRestaurantFoodItem;

// impoering mongoDB models
const foodModel = require('../models/foodModel');

// initializing router object
const router = express.Router();

// route to create food item
router.post('/createItem', verifyToken, isRestaurant, (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, feilds, files) => {
        if (err === null) {
            let newFilename =
                files.image.newFilename +
                '.' +
                files.image.originalFilename.split('.')[1];

            fs.rename(
                files.image.filepath,
                `./images/food/${newFilename}`,
                (err) => {
                    if (err !== null) {
                        console.log(err);
                        res.status(400).send({
                            message: 'Unable to Create food item',
                            success: false,
                        });
                    }
                },
            );

            let foodData = feilds;

            foodData.pic = newFilename;

            const foodItems = new foodModel(foodData);
            foodItems
                .save()
                .then((response) =>
                    res.status(200).send({
                        foodItem: response,
                        message: 'Food Item Created',
                        success: true,
                    }),
                )
                .catch((err) => {
                    console.log(err);
                    res.status(400).send({
                        message: 'Unable to Create Food Item',
                        success: false,
                    });
                });
        } else {
            console.log(err);
            res.status(500).send({
                message: 'Unable to Create Food Item',
                success: false,
            });
        }
    });
});

// route to get the image of the food item
router.get('/image/:filename', (req, res) => {
    res.download(`./images/food/${req.params.filename}`);
});

// route to update the food item
router.put(
    '/updateItem/:id',
    verifyToken,
    isRestaurant,
    isRestaurantFoodItem,
    (req, res) => {
        let updatedData = req.body;
        let _id = req.params.id;

        foodModel
            .updateOne({ _id }, updatedData)
            .then(() =>
                res.status(200).send({
                    message: 'data is updated',
                    success: true,
                }),
            )
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: 'Unable to update food items',
                    success: false,
                });
            });
    },
);

// route to delete the food item
router.delete(
    '/deleteItem/:id',
    verifyToken,
    isRestaurant,
    isRestaurant,
    (req, res) => {
        let _id = req.params.id;
        foodModel
            .deleteOne({ _id })
            .then(() =>
                res
                    .status(200)
                    .send({ message: 'Food Item deleted!!', success: true }),
            )
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: 'Unable to delete',
                    success: false,
                });
            });
    },
);

// route to get all the food items
router.get('/getItems', async (req, res) => {
    const foodItems = await foodModel.find().populate('restaurant');

    res.send(foodItems);
});

// route to get signal food item
router.get('/getItems/:id', verifyToken, async (req, res) => {
    let _id = req.params.id;
    const foodItems = await foodModel.findOne({ _id }).populate('restaurant');
    res.status(200).send(foodItems);
});

// exporting router object
module.exports = router;
