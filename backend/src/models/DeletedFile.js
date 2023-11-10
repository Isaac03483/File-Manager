const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const deletedFileSchema = new Schema({
    username: String,
    name: String,
    content: String
}, {
    versionKey: false
});

module.exports = model('DeletedFiles', deletedFileSchema);