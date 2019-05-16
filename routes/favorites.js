const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite.js');

router.get("/", (req, res) => {
    Favorite.find().then(favorites => {
        res.json(favorites);
    }, err => {
        console.log(err);
    });
});


router.get("/getAllFavorites", (req, res) => {
    Favorite.find().then(favorites => {
        let response = [];
        favorites.forEach(element => {
            response.push(element);
        });
        res.json(response);
    }, err => {
        console.log(err);
    });
});

router.post("", (req, res) => {
    let favorite = new Favorite(req.body);
    favorite.save().then(newFavorite => {
        console.log("Favorite saved successfully");
        res.json(newFavorite);
    }, err => {
        res.send(err);
    });
});


router.delete("/:id", (req, res) => {
    let songKey = (req.params.id);
    Favorite.findOneAndDelete({ songKey: songKey }, (err, favoriteObj) => {
        //handle any potential errors:
        if (err) return res.status(500).send(err);
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Favorite successfully deleted",
            objDeleted: favoriteObj
        };
        return res.status(200).send(response);
    });

});


module.exports = router;
