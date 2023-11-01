const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    username: String,
    password: String,
    employeeName: String,
    type: String
}, {
    versionKey: false
})

module.exports = model("Users", userSchema);