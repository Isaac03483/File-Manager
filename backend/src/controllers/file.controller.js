const File = require('../models/File');

const findUserFiles = async (req, res) => {
    const username = req.params.username;
    const path = req.query.path;

    const files = await File.find({ username: username, path: path });

    res.json(files);
};

module.exports = {
    findUserFiles
}