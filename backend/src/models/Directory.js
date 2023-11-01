const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const directorySchema = new Schema({
    username: String,
    path: String,
    name: String
}, {
    versionKey: false
})

module.exports = model('Directories', directorySchema);

