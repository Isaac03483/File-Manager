const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const fileSchema = new Schema({
    username: String,
    path: String,
    name: String,
    type: String,
    content: String
}, {
    versionKey: false
})

module.exports = model('Files', fileSchema);