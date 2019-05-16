const mongoose = require('mongoose');
favoriteSchema = mongoose.Schema({
        songKey:{
            type: Number,
            required: true
        },
        songName: {
            type: String,
            required: true
       },
       createdOn: {
        type: Date,
        default: Date.now,
    }
   
});

module.exports = mongoose.model("Favorite", favoriteSchema);
