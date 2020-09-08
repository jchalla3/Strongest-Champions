const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bioSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const heroSchema = new Schema({
    name: String,
    universe: String,
    bios: [bioSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Hero', heroSchema);