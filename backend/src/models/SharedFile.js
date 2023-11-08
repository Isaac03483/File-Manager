const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const sharedFileSchema = new Schema({
    usernameDestiny: String,
    usernameOrigin: String,
    name: String,
    content: String,
    date: Date
});

module.exports = model('SharedFiles', sharedFileSchema);