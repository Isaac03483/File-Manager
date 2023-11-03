const Directory = require('../models/Directory');

const findUserDirectories = async (req, res) => {
    const username = req.params.username;
    const path = req.query.path;

    const directories = await Directory.find( { username: username, path: path });

    res.json(directories);
};

const createDirectory = async (req,res) => {
    const username = req.body.username;
    const name = req.body.name;
    const path = req.body.path;

    const find = await Directory.findOne({ username: username, path: path, name: name });

    if(find) {
        res.status(400).send('directory already exists');
        return;
    }

    const directory = new Directory({ username, path, name });

    const saved = await directory.save();

    res.json(saved);
}

module.exports = {
    findUserDirectories,
    createDirectory
}