const DeletedFile = require('../models/DeletedFile');

const findAll = async (req, res) => {
    const files = await DeletedFile.find();

    res.json(files);
};

module.exports = {
    findAll
}