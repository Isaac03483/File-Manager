const mongoose = require('mongoose');

const host = 'localhost';
const port = 27017;
const database= 'cloudArch';

async function start() {
    try {
        const db = await mongoose.connect(`mongodb://${host}:${port}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log(`Connected to database: ${database}`)
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    start
}